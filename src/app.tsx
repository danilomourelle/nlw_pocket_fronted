import { useEffect, useState } from "react";
import { CreateGoalDialog } from "./components/createGoalDialog";
import { EmptyGoals } from "./components/emptyGoals";
import { Dialog } from "./components/ui/dialog";
import { WeekSummary } from "./components/weekSummary";

type WeekSummaryType = {
  completed: number;
  total: number;
  goalsPerDay: Record<
    string,
    {
      id: string;
      title: string;
      completedAt: string;
    }[]
  >;
};
export function App() {
  const [weekSummary, setWeekSummary] = useState<WeekSummaryType | undefined>(
    undefined
  );

  useEffect(() => {
    fetch("http://localhost:3333/summary")
      .then((response) => response.json())
      .then((data) => {
        setWeekSummary(data);
      });
  }, []);

  return (
    <Dialog>
      {weekSummary && weekSummary.total > 17 ? <WeekSummary /> : <EmptyGoals />}
      <CreateGoalDialog />
    </Dialog>
  );
}
