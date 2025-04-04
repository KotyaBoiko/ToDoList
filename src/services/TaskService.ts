import { TaskType } from "../type/TaskType";

const TASK_URL = "https://6758801b60576a194d10c782.mockapi.io/tasks";

export default class TaskService {
  static getTasks = async (queryParams: string): Promise<TaskType[]> => {
    const response = await fetch(TASK_URL + queryParams);
    const data: TaskType[] = await response.json();
    return Array.isArray(data) ? data : [];
  };

  static addTask = async (task: TaskType): Promise<void> => {
    await fetch(TASK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };

  static deleteTask = async (id: number): Promise<void> => {
    await fetch(TASK_URL + "/" + id, {
      method: "DELETE",
    });
  };

  static saveEditTask = async (task: TaskType): Promise<void> => {
    await fetch(TASK_URL + "/" + task.id, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
