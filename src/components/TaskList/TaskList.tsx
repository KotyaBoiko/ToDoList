import { FC } from "react";
import TaskItem from "../TaskItem";
import { TaskType, TypeSaveTaskProps } from "../../type/TaskType";
import SkeletonTaskList from "./SkeletonTaskList";
import SortIcon from "../UI/Icons/SortIcon";

type Props = {
  tasks: TaskType[];
  isLoading: boolean;
  deleteTask(id: number): void;
  saveEditTask({task, message}:TypeSaveTaskProps): void;
  changeSort(sortBy: string): void;
};

const TaskList: FC<Props> = ({
  tasks,
  isLoading,
  deleteTask,
  saveEditTask,
  changeSort,
}) => {
  return (
    <div className="container__task-list rounded-lg border p-5 bg-white relative">
      {!tasks.length && !isLoading
      ? (
        <p className="text-7xl ml-auto text-center mt-20">No task found</p>
      ) : (
        <table className="task-list">
          <thead>
            <tr className="bg-violet-100">
              <td className="w-2 rounded-tl-lg">Check</td>
              <td>Task</td>
              <td className="w-2 cursor-pointer" onClick={() => changeSort("priority")}>
                <div className="flex items-center justify-center gap-1">
                  <span>Priority</span>
                  <SortIcon />
                </div>
              </td>
              <td className="w-1/6 cursor-pointer" onClick={() => changeSort("date")}>
                <div className="flex items-center justify-center gap-1">
                  <span>Due Date</span>
                  <SortIcon />
                </div>
              </td>
              <td className="w-2 rounded-tr-lg">Del</td>
            </tr>
          </thead>
          {isLoading ? (
            <SkeletonTaskList />
          ) : (
            <tbody>
              {tasks?.map((item) => (
                <TaskItem
                  key={item.id}
                  task={item}
                  deleteTask={deleteTask}
                  saveEditTask={saveEditTask}
                />
              ))}
            </tbody>
          )}
        </table>
      )}
    </div>
  );
};

export default TaskList;
