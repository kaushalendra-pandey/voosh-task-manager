import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "./ui/Board";
import useManager from "../hooks/useManager";
import { moveTask } from "../services/ApiService";
import { useDispatch } from "react-redux";
import { initTask, localMoveTask, updateTask } from "../redux/slice/taskSlice";
import { Input } from "./ui/Input";
import { debouce } from "../lib/utils";

type Props = {};

const Boards = (props: Props) => {
  const { boards, user } = useManager();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState("");
  const debounedFunc = debouce((e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value), 500);

  const onDragEnd = async (result: any) => {
    try {
      console.log(result);
      console.log("Drag ended");
      if (!result.destination) {
        return;
      }

      dispatch(
        localMoveTask({
          taskId: result.draggableId,
          boardId: result.destination.droppableId,
        })
      );
      await moveTask({
        taskId: result.draggableId,
        boardId: result.destination.droppableId,
      });
      //@ts-ignore
      dispatch(initTask(user.userId));
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // add debounce
    debounedFunc(e);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full md:w-[400px]">
        <Input
          onChange={(e) => onSearchQueryChange(e)}
          placeholder="Search for tasks"
          width="400px"
          className="mb-4"
        />
        {/* Add a sorting feature */}
        
      </div>
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 w-full">
        {boards.map((board) => (
          <Board
            key={board.boardId}
            boardId={board.boardId}
            title={board.title}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Boards;
