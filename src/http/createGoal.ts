interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal(payload: CreateGoalRequest) {
  const response = await fetch("http://localhost:3333/goal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...payload }),
  });

  const data = await response.json();

  return data;
}
