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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ITask } from "../../types/type";
import { editTask } from "../../services/ApiService";
import { useDispatch } from "react-redux";
import { updateTask } from "../../redux/slice/taskSlice";
import { useToast } from "../../hooks/useToast";
import { Textarea } from "../ui/Textarea";
import { formatDate } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../ui/ErrorMessage";
import DatePicker from "react-datepicker";

type Props = {
  task: ITask;
  mode: "view" | "edit" | "create";
  setSelectedTask: (bool: any) => void;
};

const TaskDetail = ({ task, mode, setSelectedTask }: Props) => {
  const [edit, setEdit] = useState(() => mode === "edit");
  const [dueDate, setDueDate] = useState(() => {
    return new Date(task.dueDate);
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      createdAt: task?.createdAt,
      dueDate: task?.dueDate,
      taskId: task?.taskId,
    },
  });
  const dispatch = useDispatch();

  const handleEditProfile = (event: React.MouseEvent) => {
    // doing this to prevent the form from submitting
    event.preventDefault();
    event.stopPropagation();
    if (!edit) {
      setEdit(!edit);
    }
    return;
  };

  const handleSave = async (data: ITask) => {
    try {
      data.dueDate = dueDate.toISOString();
      dispatch(updateTask(data));
      await editTask(task?.taskId, data);
      setSelectedTask(false);
      toast({
        title: "Task Updated",
        description: "You can now see your updated task in the board",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Unable to update task",
        description: "Please try again",
        variant: "destructive",
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
          {edit ? (
            <Button type="submit" variant="default">
              Save
            </Button>
          ) : (
            <Button
              type="button"
              onClick={(e) => handleEditProfile(e)}
              variant="secondary"
            >
              Edit
            </Button>
          )}
          <Button variant="destructive">Delete</Button>
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
          disabled={!edit}
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
          rows={5}
          {...register("description", {
            required: true,
            minLength: 3,
            maxLength: 400,
          })}
          disabled={!edit}
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
        <Label>Created At</Label>
        <Input value={formatDate(task?.createdAt)} disabled className="mb-2" />
        <Label>Due Date</Label>

        <DatePicker
          selected={dueDate}
          disabled={!edit}
          // set mini date to today
          minDate={new Date()}
          //@ts-ignore
          onChange={(date) => setDueDate(date)}
        />
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
