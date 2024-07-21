import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { INewTask, ITask } from "../types/type"
import { uuidv7 } from "uuidv7";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDefaultCard = ():INewTask => {
  return {
    title: "",
    description: "",
    // current date + 24 hours in ISOstring format
    dueDate: new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000
    ).toISOString(),
  }
}

export const generateId = ():string => {
  return uuidv7();
}

export const createNewTask = (task:INewTask, userId:string, boardId:string):ITask => {
  return {
    ...task,
    userId,
    boardId,
    taskId: generateId(),
    // create an ISO string date with current date + 3 days
    dueDate: new Date(
      new Date().getTime() + 3 * 24 * 60 * 60 * 1000
    ).toISOString(),
    createdAt: new Date().toISOString()
  }
}

export const debouce = (fn:Function, delay:number) => {
  let timeoutId:any;
  return function(...args:any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  }
}


export const formatDate = (date:string) => {
  // format date like 13 January 2024
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

