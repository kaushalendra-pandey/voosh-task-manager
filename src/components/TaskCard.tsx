import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/Card";
import { ICard, ICardType } from "../types";
import { Button } from "./ui/Button";
import TaskDetail from "./TaskDetail";
import { DrawerContent, Drawer as ShadcnDrawer } from "./ui/Drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/Dialog";
import { useState } from "react";
import { DialogHeader, DialogFooter } from "./ui/Dialog";
import DeleteConfirmation from "./DeleteConfirmation";
import { useNavigate } from "react-router-dom";
import { ITask } from "../types/type";
import { useDispatch } from "react-redux";
import { deleteTask } from "../services/ApiService";
import { localDeleteTask } from "../redux/slice/taskSlice";
import { formatDate } from "../lib/utils";
import {
  AlertTriangle,
  Calendar,
  CircleAlert,
  DeleteIcon,
  Edit,
  Info,
  Trash2,
  View,
} from "lucide-react";

type Props = {
  task: ITask;
  index: number;
};

const TaskCard = ({ task, index }: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("taskId");
    if (taskId && task.taskId === taskId) {
      return true;
    } else {
      return false;
    }
  });
  const [selectedTask, setSelectedTask] = useState<ITask | null>(() => {
    // check if cardId is present in the url
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("taskId");
    if (taskId && task.taskId === taskId) {
      return task;
    } else {
      return null;
    }
  });
  const [mode, setMode] = useState<"view" | "edit" | "create">(() => {
    // check if mode is present in the url
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get("mode");

    // check if mode is valid
    if (mode === "view" || mode === "edit" || mode === "create") {
      return mode;
    } else {
      return "view";
    }
  });
  const [deleteCard, setDeleteCard] = useState<boolean>(false);
  const navigate = useNavigate();

  const cardClass = "bg-gradient-to-r from-green-400 to-green-600";

  const handleView = (card: ITask) => {
    setMode("view");
    setOpen(true);
    setSelectedTask(task);
    // add cardId in the url
    navigate(`/dashboard?taskId=${task.taskId}&mode=view`);
  };
  const handleEdit = (card: ITask) => {
    setMode("edit");
    setOpen(true);
    setSelectedTask(task);
    // add cardId in the url
    navigate(`/dashboard?taskId=${task.taskId}&mode=edit`);
  };
  const handleDelete = async (taskId: string) => {
    try {
      dispatch(localDeleteTask(taskId));
      await deleteTask(taskId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <Card
          // add background color with some nice gradient based on cardType
          className={`${cardClass} mb-4`}
        >
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </CardHeader>
          <CardContent>Created At: {formatDate(task.createdAt)}</CardContent>
          <CardFooter
            className="gap-4 flex justify-end"
            // add some padding to the footer
          >
            <Button
              onClick={() => {
                handleView(task);
              }}
              variant="outline"
              size="icon"
            >
              <Info size={16} />
            </Button>
            <Button
              onClick={() => {
                handleEdit(task);
              }}
              variant="outline"
              size="icon"
            >
              <Edit size={16} />
            </Button>
            <Button
              onClick={() => {
                setDeleteCard(true);
              }}
              variant="outline"
              size={"icon"}
            >
              <Trash2 size={16} />
            </Button>
          </CardFooter>
        </Card>
      </div>
      {selectedTask && (
        <ShadcnDrawer
          direction="right"
          open={open}
          onOpenChange={() => {
            setOpen(false);
            setSelectedTask(null);
            setMode("view");
            // remove cardId from the url
            navigate(`/dashboard`);
          }}
        >
          <DrawerContent className="top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
            {/* <Details open={open} setOpen={setOpen}> */}
            <TaskDetail
              mode={mode}
              task={selectedTask}
              setSelectedTask={setSelectedTask}
            />
            {/* </Details> */}
          </DrawerContent>
        </ShadcnDrawer>
      )}
      {deleteCard && (
        <DeleteConfirmation
          open={deleteCard}
          onOpenChange={setDeleteCard}
          title="Delete Card"
          description="Are you sure you want to delete this card?"
          primaryAction="Delete"
          secondaryAction="Cancel"
          onPrimaryAction={() => {
            handleDelete(task.taskId);
            setDeleteCard(false);
          }}
          onSecondaryAction={() => {
            setDeleteCard(false);
          }}
        />
      )}
    </>
  );
};

export default TaskCard;
