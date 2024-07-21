import React from "react";
import { ICard } from "../../types";
import TaskCard from "../TaskCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Plus } from "lucide-react";

type Props = {
  title: string;
  cards: ICard[];
};

const Board = ({ title, cards }: Props) => {
  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="w-full flex flex-col border border-gray-200 border-2 rounded-md py-4 px-2 md:overflow-auto"
        >
          <div className="bg-gray-800 border rounded-md text-white p-2 mb-2">
            {title} - {cards.length}
            <Plus className="float-right cursor-pointer" />
          </div>
          <div
            style={{
              height: "calc(100vh - 190px)",
            }}
            className="md:overflow-auto text-white p-2 mb-2"
          >
            {cards.map((card: ICard, index: number) => (
              <Draggable
                key={card.cardId}
                draggableId={card.cardId}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard card={card} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Board;
