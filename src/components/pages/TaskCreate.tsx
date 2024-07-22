import { ICard } from "../../types";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/Drawer";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { useForm } from "react-hook-form";
import { INewTask, ITask } from "../../types/type";
import { setDate } from "date-fns";
import { Calendar } from "../ui/Calendar";
import { createNewTask } from "../../lib/utils";
import { createTask } from "../../services/ApiService";
import { useDispatch } from "react-redux";
import { addTask, initTask } from "../../redux/slice/taskSlice";
import { useToast } from "../../hooks/useToast";
import { Textarea } from "../ui/Textarea";
import { ErrorMessage } from "../ui/ErrorMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

type Props = {
  task: INewTask;
  boardId: string;
  userId: string;
  setCreateTask: (bool: any) => void;
  title: string;
};

const TaskCreate = ({ task, boardId, userId, setCreateTask, title }: Props) => {
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
  const [dueDate, setDueDate] = useState(new Date());

  const { toast } = useToast();

  const dispatch = useDispatch();

  const handleSave = async (data: INewTask) => {
    try {
      data.dueDate = dueDate.toISOString();
      const newTask = createNewTask(data, userId, boardId);
      await createTask(newTask);
      //@ts-ignore
      dispatch(initTask(userId));
      setCreateTask(false);
      toast({
        title: "New Task Created",
        description: "You can now see your task in the board",
      });
    } catch (error: any) {
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
          <DrawerDescription>Creating card for - {title}</DrawerDescription>
        </div>
        <div className="flex justify-between gap-2">
          <Button type="submit" variant="default">
            Create
          </Button>
        </div>
      </DrawerHeader>
      <div className="px-4">
        <Label>Title</Label>
        <Input
          {...register("title", {
            required: true,
            minLength: 3,
            maxLength: 30,
          })}
          className="mb-2"
        />
        {errors.title && (
          <ErrorMessage>
            {errors.title.type === "required" && "Title is required"}
            {errors.title.type === "minLength" &&
              "Title should be at least 3 characters"}
            {errors.title.type === "maxLength" &&
              "Title should be at most 20 characters"}
          </ErrorMessage>
        )}
        <Label>Description</Label>
        <Textarea
          {...register("description", {
            required: true,
            minLength: 3,
            maxLength: 400,
          })}
          className="mb-2"
        />
        {errors.description && (
          <ErrorMessage>
            {errors.description.type === "required" &&
              "Description is required"}
            {errors.description.type === "minLength" &&
              "Description should be at least 3 characters"}
            {errors.description.type === "maxLength" &&
              "Description should be at most 100 characters"}
          </ErrorMessage>
        )}
        <Label>Due Date</Label>

        <DatePicker
          selected={dueDate}
          // set mini date to today
          minDate={new Date()}
          //@ts-ignore
          onChange={(date) => setDueDate(date)}
        />

        <DrawerFooter className="mt-4">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </form>
  );
};

export default TaskCreate;
