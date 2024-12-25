export type TaskType = {
  title: string,
  isComplited: boolean,
  priority: number,
  date: Date,
  id:number,
}

export type TypeSaveTaskProps = {
  task: TaskType,
  message: string,
}