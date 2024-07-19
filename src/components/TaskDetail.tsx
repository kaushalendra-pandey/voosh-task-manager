import { DialogHeader } from "./ui/Dialog";
import { ICard } from "../types";
import { Drawer } from "vaul";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/Drawer";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  card: ICard;
  mode: "view" | "edit" | "create";
};

const TaskDetail = ({ card, mode }: Props) => {
  const [edit, setEdit] = useState(() => mode === "edit");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICard>({
    defaultValues: {
      title: card.title,
      description: card.description,
      createdAt: card.createdAt,
    },
  });

  const handleEditProfile = () => {
    if (!edit) {
      setEdit(!edit);
    }
  };

  const handleSave = (data: ICard) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <DrawerHeader className="text-left flex justify-between">
        <div>
          <DrawerTitle>Card Details</DrawerTitle>
          <DrawerDescription>Your card details</DrawerDescription>
        </div>
        <div className="flex justify-between gap-2">
          <Button
            type={edit ? "submit" : "button"}
            onClick={() => handleEditProfile()}
            variant={edit ? "default" : "secondary"}
          >
            {edit ? "Save" : "Edit"}
          </Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </DrawerHeader>
      <div className="px-4">
        <Label>Title</Label>
        <Input {...register("title")} disabled={!edit} className="mb-2" />
        <Label>Description</Label>
        <Input {...register("description")} disabled={!edit} className="mb-2" />
        <Label>Created At</Label>
        <Input value={card.createdAt} disabled className="mb-2" />
      </div>
      <DrawerFooter className="pt-2">
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </form>
  );
};

export default TaskDetail;
