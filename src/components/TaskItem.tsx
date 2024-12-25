import { FC, useEffect, useRef, useState } from "react";
import Checkbox from "./UI/Checkbox";
import RemoveButton from "./UI/Icons/RemoveIcon";
import { TaskType, TypeSaveTaskProps } from "../type/TaskType";
import EditIcon from "./UI/Icons/EditIcon";
import CancelIcon from "./UI/Icons/CancelIcon";
import PriorityFlag from "./UI/Icons/PriorityFlagIcon";
import { priorities } from "../utils/constants/priorities";
import Modal from "./UI/Modal";
import PrioritiesList from "./PrioritiesList";
import DatePicker from "./DateTimePicker/DatePicker";

type Props = {
  task: TaskType;
  deleteTask(id: number): void;
  saveEditTask({task, message}:TypeSaveTaskProps): void;
};

const TaskItem: FC<Props> = ({ task, deleteTask, saveEditTask }) => {
  const [isEnableMode, setisEnableMode] = useState(false);
  const [newValue, setNewValue] = useState(task.title);

  const [priority, setPriority] = useState(task.priority);
  const [isPickPriority, setIsPickPriority] = useState(false);

  const [date, setDate] = useState(task.date);
  const [isPickDate, setIsPickDate] = useState(false);

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
    saveEditTask({task, message:"Task changes"});
    setisEnableMode(false);
  };

  const toggleCompleted = (task: TaskType): void => {
    const newTask = { ...task, isComplited: !task.isComplited };
    const message = task.isComplited ? "Task complited!" : "Task in progress";
    saveEditTask({task:newTask, message});
  };

  const onInputKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") saveEditTitle(task, newValue);
    if (e.key === "Escape") cancelEdit();
  };

  useEffect(() => {
    setIsPickPriority(false);
    if (priority !== task.priority) {
      task.priority = priority;
      saveEditTask({task, message:"Priority changes"});
    }
  }, [priority]);

  useEffect(() => {
    setIsPickDate(false);
    if (date !== task.date) {
      task.date = date;
      saveEditTask({task, message:"Date changes"});
    }
  }, [date]);

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

      <td className="ml-2 task-item__title">
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
                if (e.relatedTarget?.id === "cencelEditText") {
                  cancelEdit();
                } else {
                  saveEditTitle(task, newValue);
                }
              }}
            />
            <button className="ml-auto px-2 cursor-pointer" id="cencelEditText">
              <CancelIcon />
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <span className="w-full">
              {task.title}
            </span>
            <div className="ml-auto px-2 cursor-pointer" onClick={editTitle}>
              <EditIcon />
            </div>
          </div>
        )}
      </td>

      <td onDoubleClick={() => setIsPickPriority(true)} className="">
        <div className="cursor-pointer td_priority">
          <PriorityFlag color={`${priorities[priority]}`} />
        </div>
      </td>
        {isPickPriority && (
          <Modal visible={isPickPriority} setVisible={setIsPickPriority}>
            <PrioritiesList priority={priority} setPriority={setPriority} />
          </Modal>
        )}
      <td onDoubleClick={() => setIsPickDate(true)}>
        <span className="hover:text-violet-600 cursor-pointer">
          {new Date(date).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
          })}
        </span>
      </td>
        {isPickDate && (
          <Modal visible={isPickDate} setVisible={setIsPickDate}>
            <DatePicker date={new Date(date)} setDate={setDate} />
          </Modal>
        )}

      <td
        onClick={() => deleteTask(task.id)}
        className="hover:text-rose-700 transition delay-75 cursor-pointer"
      >
        <RemoveButton />
      </td>
    </tr>
  );
};

export default TaskItem;
