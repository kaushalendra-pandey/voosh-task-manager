export interface ICard {
    taskId: string;
    title: string;
    description: string;
    createdAt: string;
    boardId: string,
    dueDate: string;
}

export enum ICardType {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}

/**
 * {
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

export interface IDraggable {
    draggableId: string;
    type: string;
    source: {
        index: number;
        droppableId: string;
    };
    reason: string;
    mode: string;
    destination: {
        droppableId: string;
        index: number;
    };
    combine: null;
}