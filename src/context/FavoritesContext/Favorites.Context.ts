"use client";
import { createContext } from "react";
import Hls from "hls.js";

import IRadio from "@/interfaces/IRadio";

interface FavoritesContextProps {
  favorites: IRadio[];
  addToFavorites: (radio: IRadio) => void;
  removeFromFavorites: (stationuuid: string) => void;
  updateFavorite: (updatedRadio: IRadio) => void;
  playRadio: (stationuuid: string) => void;
  stopRadio: () => void;
  currentlyPlaying: string | null;
  isLoading: string | null;
  isDeleting: string | null;
  isEditing: string | null;
  editedRadio: IRadio | null;
  setIsEditing: (id: string | null) => void;
  setIsDeleting: (id: string | null) => void;
  handleDeleteAndStop: (id: string) => void;
  editRadio: (id: string) => void;
  updateRadio: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  hlsRef: React.RefObject<Hls | null>;
  confirmDelete: (id: string) => void;
  setEditedRadio: (radio: IRadio | null) => void;
  currentRadio: IRadio | null;
}

export const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);
