import dayjs from "dayjs";
import { capitalizeFirstLetter } from "../helper/functions/capitalizeFirstLetter";
import { GoalFulfillment } from "./goalFulfillment";

interface GoalCompletionInfoProps {
  date: string;
  goals: {
    id: string;
    title: string;
    completedAt: string;
  }[];
}
export function DayInfo(props: GoalCompletionInfoProps) {
  const { date, goals } = props;

  const day = dayjs(date).format("DD");
  const month = capitalizeFirstLetter(dayjs(date).format("MMMM")); // details matters
  const formattedDate = `${day} de ${month}`;
  const weekDay = capitalizeFirstLetter(dayjs(date).format("dddd"));

  return (
    <div key={date} className="flex flex-col gap-4">
      <h3 className="font-medium">
        {weekDay}{" "}
        <span className="text-zinc-400 text-xs">({formattedDate})</span>
      </h3>

      <ul className="flex flex-col gap-3">
        {goals.map((goal) => (
          <GoalFulfillment key={goal.id} {...goal} />
        ))}
      </ul>
    </div>
  );
}
