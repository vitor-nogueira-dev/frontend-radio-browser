"use client";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { toast } from 'sonner';
import Hls from "hls.js";

import { FavoritesContext } from "@/context/FavoritesContext/Favorites.Context";

import IRadio from "@/interfaces/IRadio";

import useLocalStorage from "@/hooks/useLocalStorage";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedRadio, setEditedRadio] = useState<IRadio | null>(null);
  const [currentRadio, setCurrentRadio] = useState<IRadio | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [favorites, setFavorites] = useLocalStorage<IRadio[]>("favoriteRadios", []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
    }
  }, []);

  const stopRadio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    setCurrentlyPlaying(null);
  }, []);

  const addToFavorites = useCallback((radio: IRadio) => {
    setFavorites((prev) => [...prev, radio]);
    toast.success("Rádio adicionada aos favoritos!");
  }, [setFavorites]);

  const removeFromFavorites = useCallback((stationuuid: string) => {
    setFavorites((prev) => prev.filter((radio) => radio.stationuuid !== stationuuid));
    if (currentlyPlaying === stationuuid) {
      stopRadio();
    }
    setCurrentlyPlaying((prev) => prev === stationuuid ? null : prev);

    toast.success("Rádio removida dos favoritos!");
  }, [setFavorites, currentlyPlaying, stopRadio]);

  const updateFavorite = useCallback((updatedRadio: IRadio) => {
    setFavorites((prev) =>
      prev.map((radio) => (radio.stationuuid === updatedRadio.stationuuid ? updatedRadio : radio))
    );
  }, [setFavorites]);


  const isHLSStream = useCallback((url: string) => {
    return url.includes('.m3u8');
  }, []);

  const handleDeleteAndStop = useCallback((id: string) => {
    setIsDeleting(id);
  }, []);

  const editRadio = useCallback((id: string) => {
    const radio = favorites.find(r => r.stationuuid === id);
    if (radio) {
      setEditedRadio({ ...radio });
      setIsEditing(id);
    }
  }, [favorites]);

  const updateRadio = useCallback(() => {
    if (isEditing && editedRadio) {
      updateFavorite(editedRadio);
      setIsEditing(null);
      setEditedRadio(null);
      toast.success('Rádio atualizada com sucesso!');
    }
  }, [isEditing, editedRadio, updateFavorite]);

  const confirmDelete = useCallback((id: string) => {
    if (currentlyPlaying === id) {
      stopRadio();
    }
    removeFromFavorites(id);
    setIsDeleting(null);
  }, [currentlyPlaying, stopRadio, removeFromFavorites]);

  const playHLSStream = useCallback(async (url: string) => {
    if (typeof window !== "undefined") {
      const { default: Hls } = await import('hls.js');
      if (Hls.isSupported()) {
        hlsRef.current = new Hls();
        hlsRef.current.loadSource(url);
        hlsRef.current.attachMedia(audioRef.current!);
        hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
          audioRef.current?.play().catch(error => {
            console.error("Error playing HLS stream:", error);
            toast.error('Ocorreu um erro ao reproduzir esta rádio. Por favor, tente outra.');
            stopRadio();
          });
        });
      } else if (audioRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
        audioRef.current.src = url;
        audioRef.current.play().catch(error => {
          console.error("Error playing native HLS stream:", error);
          toast.error('Ocorreu um erro ao reproduzir esta rádio. Por favor, tente outra.');
          stopRadio();
        });
      } else {
        toast.error('Seu navegador não suporta HLS para reprodução de rádio. Tente um navegador diferente.');
        console.error('This browser does not support HLS');
      }
    }
  }, [stopRadio]);


  const playRadio = useCallback(async (id: string) => {
    if (currentlyPlaying === id) {
      stopRadio();
    } else {
      try {
        setIsLoading(id);
        stopRadio();

        const radio = favorites.find(r => r.stationuuid === id);
        if (!radio) return;

        if (!audioRef.current) {
          audioRef.current = new Audio();
          audioRef.current.crossOrigin = "anonymous";
        }

        if (isHLSStream(radio.url_resolved)) {
          playHLSStream(radio.url_resolved);
        } else {
          audioRef.current.src = radio.url_resolved;
          await audioRef.current.play();
        }

        setCurrentlyPlaying(id);
        setCurrentRadio(radio);
        toast.success(`Tocando agora: ${radio.name}`);

        audioRef.current.onerror = (e) => {
          console.error("Audio error:", e);
          toast.error('Ocorreu um erro ao reproduzir esta rádio. Por favor, tente novamente por favor.');
          stopRadio();
        };
      } catch (error) {
        console.error("Error playing audio:", error);
        toast.error('Ocorreu um erro ao reproduzir esta rádio. Por favor, tente novamente por favor.');
        stopRadio();
      } finally {
        setIsLoading(null);
      }
    }
  }, [currentlyPlaying, favorites, playHLSStream, stopRadio, isHLSStream]);

  const context = useMemo(() => ({
    favorites,
    addToFavorites,
    removeFromFavorites,
    updateFavorite,
    playRadio,
    stopRadio,
    currentlyPlaying,
    isLoading,
    isDeleting,
    isEditing,
    editedRadio,
    handleDeleteAndStop,
    editRadio,
    updateRadio,
    audioRef,
    hlsRef,
    confirmDelete,
    setIsDeleting,
    setIsEditing,
    setEditedRadio,
    currentRadio
  }), [favorites, addToFavorites, removeFromFavorites, updateFavorite, playRadio, stopRadio, currentlyPlaying, currentRadio, isLoading, isDeleting, isEditing, editedRadio, handleDeleteAndStop, editRadio, updateRadio, audioRef, hlsRef, confirmDelete]);

  return (
    <FavoritesContext.Provider value={context}>
      {children}
    </FavoritesContext.Provider>
  );
}
