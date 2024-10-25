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
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  title,
  description,
  isEditing,
  onSave,
  onDelete,
}) => {
  const { setEditedRadio, editedRadio } = useFavorites();
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-w-[80%] rounded-lg">
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
                value={editedRadio.name?.trim()}
                onChange={(e) => setEditedRadio({ ...editedRadio, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="tags" className="text-right">Tags</Label>
              <Input
                id="tags"
                value={editedRadio.tags?.trim()}
                onChange={(e) => setEditedRadio({ ...editedRadio, tags: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="country" className="text-right">País</Label>
              <Input
                id="country"
                value={editedRadio.country?.trim()}
                onChange={(e) => setEditedRadio({ ...editedRadio, country: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="language" className="text-right">Idioma</Label>
              <Input
                id="language"
                value={editedRadio.language?.trim()}
                onChange={(e) => setEditedRadio({ ...editedRadio, language: e.target.value })}
                className="w-full"
              />
            </div>
          </div>
        )}
        <DialogFooter className='grid grid-cols-2 gap-2'>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          {isEditing ? (
            <Button onClick={onSave}>Salvar</Button>
          ) : (
            <Button variant="destructive" onClick={onDelete}>Deletar</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog;