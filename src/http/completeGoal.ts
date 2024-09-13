interface CompleteGoalResponse {
  id: string;
  goalId: string;
  createdAd: Date;
}

export async function completeGoal(
  goalId: string
): Promise<CompleteGoalResponse> {
  const response = await fetch("http://localhost:3333/goal/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ goalId }),
  });

  const data = await response.json();

  return data;
}
