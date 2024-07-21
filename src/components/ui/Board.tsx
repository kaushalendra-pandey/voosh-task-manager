import React from "react";
import TaskCard from "../TaskCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { DrawerContent, Drawer as ShadcnDrawer } from "./Drawer";
import { ITask } from "../../types/type";
import { getDefaultCard } from "../../lib/utils";
import TaskCreate from "../TaskCreate";
import useManager from "../../hooks/useManager";

type Props = {
  title: string;
  boardId: string;
  searchQuery?: string;
};

const Board = ({ title, boardId, searchQuery }: Props) => {
  const [createTask, setCreateTask] = React.useState(false);
  const { getTasksByBoardId, user } = useManager();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      // ISOstring with date + 24 hours
      dueDate: new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).toISOString(),
    },
  });

  const tasks = getTasksByBoardId(boardId);

  const handleCreateTask = () => {
    setCreateTask(true);
  };

  // filter tasks by search query
  const filteredTasks = tasks.filter((task: ITask) => {
    if (!searchQuery) {
      return task;
    }
    return task.title.toLowerCase().includes(searchQuery?.toLowerCase());
  });

  return (
    <>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="w-full flex flex-col border border-gray-200 border-2 rounded-md md:overflow-auto"
          >
            <div className="bg-gray-100 border-b border-gray-200 text-black text-sm font-semibold border p-2 mb-2">
              {title} - {tasks.length}
              <Plus
                onClick={handleCreateTask}
                className="float-right cursor-pointer"
              />
            </div>
            <div
              style={{
                height: "calc(100vh - 190px)",
              }}
              className="md:overflow-auto text-white p-2 mb-2"
            >
              {filteredTasks.map((task: ITask, index: number) => (
                <Draggable
                  key={task.taskId}
                  draggableId={task.taskId}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard task={task} index={index} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>

            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {createTask && (
        <ShadcnDrawer
          direction="right"
          open={createTask}
          onOpenChange={() => {
            setCreateTask(false);
          }}
        >
          <DrawerContent className="top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
            {/* <Details open={open} setOpen={setOpen}> */}
            <TaskCreate
              setCreateTask={setCreateTask}
              userId={user.userId}
              boardId={boardId}
              task={getDefaultCard()}
            />
            {/* </Details> */}
          </DrawerContent>
        </ShadcnDrawer>
      )}
    </>
  );
};

export default Board;
