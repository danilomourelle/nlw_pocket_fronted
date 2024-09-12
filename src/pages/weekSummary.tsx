import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { CheckCircle2 } from "lucide-react";
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfTheWeek} - {lastDayOfTheWeek}
          </span>
        </div>

        <GoalDialogTrigger size="sm" />
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
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

      <div className="flex flex-col gap-6">
        <h2 className="text-xl flex-col gap-6">Sua semana</h2>
        {Object.entries(data.goalsPerDay).map(([day, goals]) => {
          const weekDay = dayjs(day).format("dddd");
          const formattedDate = dayjs(day).format("DD[ de ]MMMM");

          return (
            <div key={day} className="flex flex-col gap-4">
              <h3 className="font-medium capitalize">
                {weekDay}{" "}
                <span className="text-zinc-400 text-xs">({formattedDate})</span>
              </h3>

              <ul className="flex flex-col gap-3">
                {goals.map((goal) => {
                  const time = dayjs(goal.completedAt).format("HH[h]mm[m]");

                  return (
                    <li key={goal.id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às{" "}
                        <span className="text-zinc-100">{time}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
