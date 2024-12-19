export function getWeek(startDate: Date, week: number):Date[] {
  const electWeek:Date[] = [];
  
  const startOfWeek = new Date(startDate)
  startOfWeek.setDate(startDate.getDate() - startDate.getDay() + week*7);

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startOfWeek);
    currentDay.setDate(startOfWeek.getDate() + i);
    electWeek.push(currentDay);
  }
  return electWeek;
}