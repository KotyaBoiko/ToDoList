import { FC, useRef, useState } from "react";
import Checkbox from "./UI/Checkbox";
import RemoveButton from "./UI/RemoveButton";
import { TaskType } from "../type/data";
import EditIcon from "./UI/EditIcon";
import CancelIcon from "./UI/CancelIcon";
import PriorityFlag from "./UI/PriorityFlag";
import { priorities } from "../utils/constants/priorities";


type Props = {
  task: TaskType;
  removeTask(id: number): void;
  saveEditTask(task:TaskType, message:String):void,
};

const TaskItem: FC<Props> = ({
  task,
  removeTask,
  saveEditTask,
}) => {
  const [isEnableMode, setisEnableMode] = useState(false);
  const [newValue, setNewValue] = useState(task.title);
  const fieldToChengeTitle = useRef<HTMLInputElement>(null);

  const editTitle = (): void => {
    setisEnableMode(true);
  };

  const cancelEdit = (): void => {
    setNewValue(task.title);
    setisEnableMode(false);
  };

    const saveEditTitle = (task: TaskType, title: string): void => {
      if (newValue === task.title) return;

      if (title == "") {
        task.title = "Enter your task";
      } else {
        task.title = title;
      }
      saveEditTask(task, "Task changes");
      setisEnableMode(false);
    };

  const toggleCompleted = (task: TaskType): void => {
    task.isComplited = !task.isComplited;
    const message = task.isComplited ? 'Task complited!' : "Task in progress"
    saveEditTask(task, message);
  };

  const onInputKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") saveEditTitle(task, newValue);
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <tr className={task.isComplited ? "bg-violet-50" : ""}>
      <td className="flex-auto">
        <button
          className="ml-auto px-2 cursor-pointer"
          onClick={() => toggleCompleted(task)}
        >
          <Checkbox active={task.isComplited} />
        </button>
      </td>

      <td className="ml-2 whitespace-normal break-words">
        {isEnableMode ? (
          <div className="flex justify-center items-center">
            <input
              value={newValue}
              className="task-item__edit bg-transparent"
              ref={fieldToChengeTitle}
              autoFocus
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={onInputKeyPress}
              onBlur={(e) => {
                if (e.relatedTarget?.id === 'cencelEditText') {
                  cancelEdit()
                } else {
                  saveEditTitle(task, newValue)

                }
              }}
            />
            <button
              className="ml-auto px-2 cursor-pointer"
              id="cencelEditText"
            >
              <CancelIcon />
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <span className="w-full whitespace-normal break-words">
              {task.title}
            </span>
            <div className="ml-auto px-2 cursor-pointer" onClick={editTitle}>
              <EditIcon />
            </div>
          </div>
        )}
      </td>

      <td>
          <PriorityFlag color={`${priorities[task.priority]}`}/>
      </td>

      <td>
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })}
      </td>

      <td
        onClick={() => removeTask(task.id)}
        className="hover:text-rose-700 transition delay-75 cursor-pointer"
      >
        <RemoveButton />
      </td>
    </tr>
  );
};

export default TaskItem;
