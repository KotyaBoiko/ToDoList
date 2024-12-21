import { FC } from "react"
import TaskItem from "../TaskItem"
import { TaskType } from "../../type/TaskType"
import SkeletonTaskList from "./SkeletonTaskList"

type Props = {
  tasks: TaskType[],
  isLoading: boolean,
  removeTask(id: number):void,
  saveEditTask(task:TaskType, message: string):void,
}

const TaskList:FC<Props> = ({tasks, isLoading, removeTask, saveEditTask}) => {
  return (
    <div className="container__task-list rounded-lg border p-5 bg-white relative">
    {!tasks.length && !isLoading ? (
      <p className="text-7xl ml-auto text-center mt-20">
        No task found
      </p>
    ) : (
      <table className="task-list">
        <thead>
          <tr className="bg-violet-100">
            <td className="w-2 rounded-tl-lg">Check</td>
            <td className="whitespace-normal break-words">Task</td>
            <td className="w-2">Priority</td>
            <td className="w-1/6">Due Date</td>
            <td className="w-2 rounded-tr-lg">Del</td>
          </tr>
        </thead>
        {isLoading
        ? 
          <SkeletonTaskList/>
        :
          <tbody>
            {tasks?.map((item) => (
              <TaskItem
                key={item.id}
                task={item}
                removeTask={removeTask}
                saveEditTask={saveEditTask}
              />
            ))}
          </tbody>
        }
      </table>
    )}
  </div>
  )
}

export default TaskList