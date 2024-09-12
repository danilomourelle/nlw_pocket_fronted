import { RadioGroupIndicator, RadioGroupItem } from "./ui/radio-group";

export interface RadioGroupUnitProps {
  value: string;
  emoji: string;
  label: string;
}
export function RadioGroupOption(props: RadioGroupUnitProps) {
  const { value, emoji, label } = props;
  return (
    <RadioGroupItem value={value}>
      <RadioGroupIndicator />
      <span className="text-zinc-300 text-sm font-medium leading-none">
        {value} - {label}
      </span>
      <span className="text-lg leading-none">{emoji}</span>
    </RadioGroupItem>
  );
}
