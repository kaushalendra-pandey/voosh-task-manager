import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/Dialog";
import { Button } from "./ui/Button";
import { DialogHeader, DialogFooter } from "./ui/Dialog";

type Props = {
  onOpenChange: (par: boolean) => void;
  open: boolean;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
};

const DeleteConfirmation = ({
  onOpenChange,
  open,
  title,
  description,
  primaryAction,
  secondaryAction,
  onPrimaryAction,
  onSecondaryAction,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSecondaryAction} variant="secondary">
            {secondaryAction}
          </Button>
          <Button onClick={onPrimaryAction} variant="destructive">
            {primaryAction}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmation;
