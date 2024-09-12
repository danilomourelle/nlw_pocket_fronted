import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  RadioGroupOption,
  type RadioGroupUnitProps,
} from "../components/radioGroupUnit";
import { Button } from "../components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup } from "../components/ui/radio-group";
import { createGoal } from "../http/createGoal";

const createGoalForm = z.object({
  title: z.string().min(1, "Informe a meta que você deve adicionar"),
  desiredWeeklyFrequency: z.coerce
    .number({ message: "Escolha entre 1 e 7 dias" })
    .min(1)
    .max(7),
});

const desiredWeeklyFrequencyOptions: RadioGroupUnitProps[] = [
  { value: "1", emoji: "🥱", label: "Aí que preguiça" },
  { value: "2", emoji: "😐", label: "Dá pra melhorar" },
  { value: "3", emoji: "🙂", label: "Criando hábitos" },
  { value: "4", emoji: "😎", label: "Dia de rock BB" },
  { value: "5", emoji: "🤩", label: "Quebrando tudo" },
  { value: "6", emoji: "🤯", label: "It's on fire baby" },
  { value: "7", emoji: "🔥", label: "Chama o bombeiro" },
];

type CreateGoalFormData = z.infer<typeof createGoalForm>;

export function CreateGoalDialog() {
  const queryClient = useQueryClient();
  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalFormData>({
      resolver: zodResolver(createGoalForm),
    });

  async function handleCreateGoal(data: CreateGoalFormData) {
    await createGoal(data);

    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
    queryClient.invalidateQueries({ queryKey: ["summary"] });

    reset();
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 min-h-full">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione atividades que fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex flex-1 flex-col justify-between gap-6"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade</Label>
              <Input
                id="title"
                type="text"
                autoFocus
                placeholder="ex.: Cortar a grama"
                {...register("title")}
              />
              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="weekFrequency">Quantas vezes por semana</Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      {desiredWeeklyFrequencyOptions.map((option) => (
                        <RadioGroupOption key={option.value} {...option} />
                      ))}
                    </RadioGroup>
                  );
                }}
              />
              {formState.errors.desiredWeeklyFrequency && (
                <p className="text-red-400 text-sm">
                  {formState.errors.desiredWeeklyFrequency.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
