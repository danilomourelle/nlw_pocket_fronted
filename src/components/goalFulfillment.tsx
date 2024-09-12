import dayjs from "dayjs";
import { CheckCircle2 } from "lucide-react";

interface GoalFulfillmentProps {
  id: string;
  title: string;
  completedAt: string;
}

export function GoalFulfillment(props: GoalFulfillmentProps) {
  const { id, title, completedAt } = props;
  const time = dayjs(completedAt).format("HH[h]mm[m]");

  return (
    <li key={id} className="flex items-center gap-2">
      <CheckCircle2 className="size-4 text-pink-500" />
      <span className="text-sm text-zinc-400">
        Você completou "<span className="text-zinc-100">{title}</span>" às{" "}
        <span className="text-zinc-100">{time}</span>
      </span>
    </li>
  );
}
