import { ICard } from "../types";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/Drawer";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { useForm } from "react-hook-form";
import { INewTask, ITask } from "../types/type";
import { setDate } from "date-fns";
import { Calendar } from "./ui/Calendar";
import { createNewTask } from "../lib/utils";
import { createTask } from "../services/ApiService";
import { useDispatch } from "react-redux";
import { addTask, initTask } from "../redux/slice/taskSlice";
import { useToast } from "../hooks/useToast";

type Props = {
  task: INewTask;
  boardId: string;
  userId: string;
  setCreateTask: (bool: any) => void;
};

const TaskCreate = ({ task, boardId, userId, setCreateTask }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICard>({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      dueDate: task?.dueDate,
      boardId,
    },
  });

  const {toast} = useToast();

  const dispatch = useDispatch();

  const handleSave = async (data: INewTask) => {
    try {
      console.log(data);
      const newTask = createNewTask(data, userId, boardId);
      await createTask(newTask);
      //@ts-ignore
      dispatch(initTask(userId));
      setCreateTask(false);
      toast({
        title: "New Task Created",
        description: "You can now see your task in the board",
      });
    } catch (error:any) {
      console.log(error);
      toast({
        title: "Unable to create task",
        description: error.data.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <DrawerHeader className="text-left flex justify-between">
        <div>
          <DrawerTitle>Card Details</DrawerTitle>
          <DrawerDescription>Your card details</DrawerDescription>
        </div>
        <div className="flex justify-between gap-2">
          <Button type="submit" variant="default">
            Create
          </Button>
        </div>
      </DrawerHeader>
      <div className="px-4">
        <Label>Title</Label>
        <Input {...register("title")} className="mb-2" />
        <Label>Description</Label>
        <Input {...register("description")} className="mb-2" />
      </div>
      <DrawerFooter className="pt-2">
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </form>
  );
};

export default TaskCreate;
