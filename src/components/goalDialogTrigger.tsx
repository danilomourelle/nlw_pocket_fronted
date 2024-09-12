import { Plus } from "lucide-react";
import { Button, type ButtonProps } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";

export function GoalDialogTrigger(props: { size?: ButtonProps["size"] }) {
  return (
    <DialogTrigger asChild>
      {/* asChild vai fundir as tags <DialogTrigger> e <Button> em um único elemento HTML */}
      <Button size={props.size}>
        <Plus className="size-4" />
        Cadastrar meta
      </Button>
    </DialogTrigger>
  );
}
