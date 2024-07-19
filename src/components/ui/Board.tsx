import React from "react";
import { ICard } from "../../types";
import TaskCard from "../TaskCard";
import { Droppable, Draggable } from "react-beautiful-dnd";

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

// import React from "react";
// import SingleTodo from "./SingleTodo"
// import { Droppable } from "react-beautiful-dnd";

// interface props {
//   todos: Array<any>;
//   setTodos: React.Dispatch<React.SetStateAction<Array<any>>>;
//   setCompletedTodos: React.Dispatch<React.SetStateAction<Array<any>>>;
//   CompletedTodos: Array<any>;
// }

// const TodoList: React.FC<props> = ({
//   todos,
//   setTodos,
//   CompletedTodos,
//   setCompletedTodos,
// }) => {
//   return (
//     <div className="container">
//       <Droppable droppableId="TodosList">
//         {(provided, snapshot) => (
//           <div
//             className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//           >
//             <span className="todos__heading">Active Tasks</span>
//             {todos?.map((todo, index) => (
//               <SingleTodo
//                 index={index}
//                 todos={todos}
//                 todo={todo}
//                 key={todo.id}
//                 setTodos={setTodos}
//               />
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//       <Droppable droppableId="TodosRemove">
//         {(provided, snapshot) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             className={`todos  ${
//               snapshot.isDraggingOver ? "dragcomplete" : "remove"
//             }`}
//           >
//             <span className="todos__heading">Completed Tasks</span>
//             {CompletedTodos?.map((todo, index) => (
//               <SingleTodo
//                 index={index}
//                 todos={CompletedTodos}
//                 todo={todo}
//                 key={todo.id}
//                 setTodos={setCompletedTodos}
//               />
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// };

// export default TodoList;
