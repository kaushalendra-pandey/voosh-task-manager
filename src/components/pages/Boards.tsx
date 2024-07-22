import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "../ui/Board";
import useManager from "../../hooks/useManager";
import { moveTask } from "../../services/ApiService";
import { useDispatch } from "react-redux";
import {
  initTask,
  localMoveTask,
  updateTask,
} from "../../redux/slice/taskSlice";
import { Input } from "../ui/Input";
import { debouce } from "../../lib/utils";
import { SortType } from "../../types/type";
import { useToast } from "../../hooks/useToast";

type Props = {};

const Boards = (props: Props) => {
  const { boards, user } = useManager();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortType>(SortType.CREATED_AT_DESC);
  const { toast } = useToast();
  const debounedFunc = debouce(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    500
  );

  const onDragEnd = async (result: any) => {
    try {
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
      toast({
        title: "Error",
        description: "An error occured while moving the task",
      });
    }
  };

  const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // add debounce
    debounedFunc(e);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-2">
        <div className="w-full md:w-[400px]">
          <Input
            onChange={(e) => onSearchQueryChange(e)}
            placeholder="Search for tasks"
            width="400px"
            className="mb-4"
          />
          {/* Add a sorting feature */}
        </div>
        <div>
          <select
            className="border-none text-blue-700 font-semibold focus:outline-none p-2 rounded-md"
            name="sort"
            id="sort"
            onChange={(e) => setSort(e.target.value as SortType)}
          >
            <option value={SortType.CREATED_AT_ASC}>Created At Asc</option>
            <option value={SortType.CREATED_AT_DESC}>Recent</option>
            <option value={SortType.DUE_DATE_ASC}>Due Date Asc</option>
            <option value={SortType.DUE_DATE_DESC}>Due Date Desc</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 w-full">
        {boards.map((board) => (
          <Board
            key={board.boardId}
            boardId={board.boardId}
            title={board.title}
            searchQuery={searchQuery}
            sort={sort}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Boards;
