import Layout from "./components/auth/Layout";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";

import Boards from "./components/pages/Boards";

// react-beautiful-dnd onDragEnd function: result has type any so use this type for reference
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
        <Boards />
      </DragDropContext>
    </Layout>
  );
}

export default App;
