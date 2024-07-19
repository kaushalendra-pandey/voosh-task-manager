import Layout from "./components/auth/Layout";
import "./App.css";
import { ICard, ICardType, IDraggable } from "./types";
import Board from "./components/ui/Board";
import { DragDropContext } from "react-beautiful-dnd";

const TodoCards: ICard[] = [
  {
    cardId: "1",
    title: "Task 1",
    description: "Description 1",
    createdAt: "2021-07-01",
    type: ICardType.TODO,
  },
  {
    cardId: "2",
    title: "Task 2",
    description: "Description 2",
    createdAt: "2021-07-02",
    type: ICardType.TODO,
  },
  {
    cardId: "3",
    title: "Task 3",
    description: "Description 3",
    createdAt: "2021-07-03",
    type: ICardType.TODO,
  },
  {
    cardId: "10",
    title: "Task 10",
    description: "Description 10",
    createdAt: "2021-07-03",
    type: ICardType.TODO,
  },
  {
    cardId: "11",
    title: "Task 11",
    description: "Description 11",
    createdAt: "2021-07-03",
    type: ICardType.TODO,
  },
  {
    cardId: "12",
    title: "Task 12",
    description: "Description 12",
    createdAt: "2021-07-03",
    type: ICardType.TODO,
  },
];

const InProgressCard: ICard[] = [
  {
    cardId: "4",
    title: "Task 4",
    description: "Description 4",
    createdAt: "2021-07-01",
    type: ICardType.IN_PROGRESS,
  },
  {
    cardId: "5",
    title: "Task 5",
    description: "Description 5",
    createdAt: "2021-07-02",
    type: ICardType.IN_PROGRESS,
  },
  {
    cardId: "6",
    title: "Task 6",
    description: "Description 6",
    createdAt: "2021-07-03",
    type: ICardType.IN_PROGRESS,
  },
];

const DoneCard: ICard[] = [
  {
    cardId: "7",
    title: "Task 7",
    description: "Description 7",
    createdAt: "2021-07-01",
    type: ICardType.DONE,
  },
  {
    cardId: "8",
    title: "Task 8",
    description: "Description 8",
    createdAt: "2021-07-02",
    type: ICardType.DONE,
  },
  {
    cardId: "9",
    title: "Task 9",
    description: "Description 9",
    createdAt: "2021-07-03",
    type: ICardType.DONE,
  },
];

// react-beautiful-dnd onDragEnd function: result has type any
/**
 * 
 * @param result {
    "draggableId": "7",
    "type": "DEFAULT",
    "source": {
        "index": 0,
        "droppableId": "Done Card"
    },
    "reason": "DROP",
    "mode": "FLUID",
    "destination": {
        "droppableId": "In Progress",
        "index": 0
    },
    "combine": null
}
 */
const onDragEnd = (result: any) => {
  const { source, destination } = result;
  if (!destination) return;
};

function App() {
  return (
    <Layout>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 w-full">
          <Board title="Todo" cards={TodoCards} />
          <Board title="In Progress" cards={InProgressCard} />
          <Board title="Done Card" cards={DoneCard} />
        </div>
      </DragDropContext>
    </Layout>
  );
}

export default App;
