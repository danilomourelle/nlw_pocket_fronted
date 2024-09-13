type PendingGoalsResponse = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionsCount: number;
}[];

export async function getGoalsProgress(): Promise<PendingGoalsResponse> {
  const response = await fetch("http://localhost:3333/goal/progress");
  const data = await response.json();

  return data;
}
