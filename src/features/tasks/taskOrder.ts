import type { Task } from "../../interfaces/api.interface";

const ORDER_STEP = 1;

/**
 * Calculates the new order after the task has been moved locally.
 *
 * The task list is sorted in descending order:
 * larger order values appear first.
 */
export const calculateMovedTaskOrder = (
  tasks: Task[],
  movedTaskIndex: number,
): number => {
  const taskBefore = tasks[movedTaskIndex - 1];
  const taskAfter = tasks[movedTaskIndex + 1];

  const beforeOrder = taskBefore?.order;
  const afterOrder = taskAfter?.order;

  // The moved task is between two other tasks.
  if (beforeOrder !== undefined && afterOrder !== undefined) {
    return (beforeOrder + afterOrder) / 2;
  }

  // The task was moved to the top.
  if (afterOrder !== undefined) {
    return afterOrder + ORDER_STEP;
  }

  // The task was moved to the bottom.
  if (beforeOrder !== undefined) {
    return beforeOrder - ORDER_STEP;
  }

  // The project contains only one task.
  return 0;
};
