export async function completeGoal(goalId: string) {
  const response = await fetch("http://localhost:3333/goals-completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ goalId }),
  });
  const data = await response.json();

  return data.goalsProgress;
}
