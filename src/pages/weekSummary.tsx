import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { DayInfo } from "../components/dayInfo";
import { GoalDialogTrigger } from "../components/goalDialogTrigger";
import { InOrbitIcon } from "../components/inOrbitIcon";
import { PendingGoals } from "../components/pendingGoals";
import { Progress, ProgressIndicator } from "../components/ui/progress-bar";
import { Separator } from "../components/ui/separator";
import { getSummaryRequest } from "../http/getSummaryRequest";

export function WeekSummary() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummaryRequest,
    staleTime: 1_000 * 60,
  });

  if (!data) return null;

  dayjs.locale(ptBR);
  const firstDayOfTheWeek = dayjs().startOf("week").format("D MMM");
  const lastDayOfTheWeek = dayjs().endOf("week").format("D MMM");

  const progressPercentage = Math.round((data.completed / data.total) * 100);

  return (
    <div className="py-10 px-5 max-w-[480px] mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfTheWeek} - {lastDayOfTheWeek}
          </span>
        </div>

        <GoalDialogTrigger size="sm" />
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-3">
        <Progress>
          <ProgressIndicator style={{ width: `${progressPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{" "}
            <span className="text-zinc-100">{data.completed}</span> de{" "}
            <span className="text-zinc-100">{data.total}</span> metas nessa
            semana
          </span>
          <span>{progressPercentage}%</span>
        </div>
      </div>

      <Separator />
      <PendingGoals />

      {/* Goals per day */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl flex-col gap-6">Sua semana</h2>
        {data.goalsPerDay && Object.entries(data.goalsPerDay).map(([date, goals]) => (
          <DayInfo key={date} date={date} goals={goals} />
        ))}
      </div>
    </div>
  );
}
