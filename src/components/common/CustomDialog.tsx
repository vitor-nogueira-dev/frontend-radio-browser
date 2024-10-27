import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import IRadio from '@/interfaces/IRadio';

import { useFavorites } from '@/context/FavoritesContext';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  isEditing?: boolean;
  editedRadio?: IRadio | null;
  onSave?: () => void;
  onDelete?: () => void;
  dataCy: string;
  textConfirm?: string;
}

function CustomDialog({ open, onClose, title, description, isEditing, onSave, onDelete, dataCy, textConfirm }: CustomDialogProps) {
  const { setEditedRadio, editedRadio } = useFavorites();

  console.log('editedRadio', editedRadio);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-w-[80%] rounded-lg" data-cy={dataCy}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {isEditing && editedRadio && (
          <div className="grid grid-rows-2 gap-4 py-4">
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="name" className="text-right">Nome</Label>
              <Input
                id="name"
                value={editedRadio.name?.replace('\t', '')}
                onChange={(e) => setEditedRadio({ ...editedRadio, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="tags" className="text-right">Tags</Label>
              <Input
                id="tags"
                value={editedRadio.tags}
                onChange={(e) => setEditedRadio({ ...editedRadio, tags: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="country" className="text-right">País</Label>
              <Input
                id="country"
                value={editedRadio.country}
                onChange={(e) => setEditedRadio({ ...editedRadio, country: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="language" className="text-right">Idioma</Label>
              <Input
                id="language"
                value={editedRadio.language}
                onChange={(e) => setEditedRadio({ ...editedRadio, language: e.target.value })}
                className="w-full"
              />
            </div>
          </div>
        )}
        <DialogFooter className='grid grid-cols-2 gap-2'>
          <Button variant="outline" onClick={onClose} data-cy={`${dataCy}-cancel`}>Cancelar</Button>
          {isEditing ? (
            <Button onClick={onSave} data-cy={`${dataCy}-save`}>Salvar</Button>
          ) : (
            <Button variant="destructive" onClick={onDelete} data-cy={`${dataCy}-delete`}>{textConfirm ? textConfirm : 'Deletar'}</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog;