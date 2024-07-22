import React from "react";
import TaskCard from "../pages/TaskCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { DrawerContent, Drawer as ShadcnDrawer } from "./Drawer";
import { ITask, SortType } from "../../types/type";
import { getDefaultCard, handleSort } from "../../lib/utils";
import TaskCreate from "../pages/TaskCreate";
import useManager from "../../hooks/useManager";

type Props = {
  title: string;
  boardId: string;
  searchQuery?: string;
  sort?: SortType;
};

const Board = ({
  title,
  boardId,
  searchQuery,
  sort = SortType.CREATED_AT_DESC,
}: Props) => {
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
  let filteredTasks = tasks;

  if (searchQuery) {
    let lowerCaseSearchQuery = searchQuery.toLowerCase();
    filteredTasks = filteredTasks.filter((task: ITask) => {
      return task.title.toLowerCase().includes(lowerCaseSearchQuery);
    });
  }

  if (sort) {
    filteredTasks = handleSort(filteredTasks, sort);
  }

  return (
    <>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="w-full flex flex-col border rounded-xs md:overflow-auto"
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
              {filteredTasks.length === 0 ? (
                <div className="text-center text-gray-500">No tasks found</div>
              ) : (
                filteredTasks.map((task: ITask, index: number) => (
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
                ))
              )}
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
              title={title}
            />
            {/* </Details> */}
          </DrawerContent>
        </ShadcnDrawer>
      )}
    </>
  );
};

export default Board;
