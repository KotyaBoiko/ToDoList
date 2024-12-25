import { useEffect, useState } from "react";
import { TaskType, TypeSaveTaskProps } from "./type/TaskType";
import Menu from "./components/Menu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormAddTask from "./components/FormAddTask/FormAddTask";
import TaskList from "./components/TaskList/TaskList";
import Modal from "./components/UI/Modal";
import useFetching from "./hooks/useFetching";
import TaskService from "./services/TaskService";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [queryParams, setQueryParams] = useState("?sortBy=date&");
  const [category, setCategory] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [sortQuery, setSortQuery] = useState({ sortBy: "date", order: "asc" });

  const [getTasks, isLoading] = useFetching<string>(async (queryParams) => {
    const data = await TaskService.getTasks(queryParams);
    setTasks(data);
  }, true);

  const [addTask, isLoadingAdd] = useFetching<TaskType>(async (task) => {
    if (isLoadingAdd) return;
    setIsAdding(true);
    toast.promise(
      async () => {
        await TaskService.addTask(task);
        await getTasks(queryParams);
        setIsAdding(false);
      },
      {
        pending: "Loading...",
        success: "Task added",
        error: "Error",
      }
    );
  });

  const [deleteTask, isLoadingDel] = useFetching<number>(async (id) => {
    if (isLoadingDel) return;
    toast.promise(
      async () => {
        await TaskService.deleteTask(id);
        await setTasks((prev) => prev.filter((t) => t.id !== id));
      },
      {
        pending: "Loading...",
        success: "Task remove",
        error: "Error",
      }
    );
  });

  const [saveEditTask, isLoadingSave] = useFetching<TypeSaveTaskProps>(async ({ task, message }) => {
    if (isLoadingSave) return;
    toast.promise(
      async () => {
        await TaskService.saveEditTask(task);
        await setTasks(tasks.map((t) => (t.id == task.id ? task : t)));
      },
      {
        pending: "Loading...",
        success: message,
        error: "Error",
      }
    );
  });

  useEffect(() => {
    getTasks(queryParams);
  }, [queryParams]);

  useEffect(() => {
    let query = `?sortBy=${sortQuery.sortBy}&order=${sortQuery.order}&`;
    switch (category) {
      case 1:
        query += "isComplited=false&";
        break;
      case 2:
        query += "isComplited=true&";
        break;
      default:
        break;
    }
    setQueryParams(query);
  }, [category, sortQuery]);

  const changeSort = (sortBy: string): void => {
    if (isLoading) return;
    if (sortBy === sortQuery.sortBy) {
      if (sortQuery.order === "asc") {
        setSortQuery({ sortBy, order: "desc" });
      } else {
        setSortQuery({ sortBy, order: "asc" });
      }
    } else {
      setSortQuery({ sortBy, order: "asc" });
    }
  };

  return (
    <div className="overflow-hidden">
      <Modal
        visible={isAdding}
        setVisible={setIsAdding}
        children={<FormAddTask addTask={addTask} setIsAdding={setIsAdding} />}
      />
      <div className="bg-purple-400 rounded-lg -rotate-4.2 m-16">
        <div className="bg-purple-300 rounded-lg rotate-2.2">
          <div className="bg-purple-200 p-2 rounded-lg rotate-2">
            <div className="px-3 py-4 bg-gray-100 rounded-lg">
              <div className="">
                <Menu
                  setIsAdding={setIsAdding}
                  setCategory={setCategory}
                  activeCategory={category}
                />
              </div>
              <TaskList
                tasks={tasks}
                isLoading={isLoading}
                deleteTask={deleteTask}
                saveEditTask={saveEditTask}
                changeSort={changeSort}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
