import { Chip, ChipProps } from "@heroui/react";

type Props = {
  value: boolean | null;
  trueColor: ChipProps["color"];
  trueLabel: string;
  falseColor: ChipProps["color"];
  falseLabel: string;
};

export default function TableCellBoolean({
  value,
  trueColor,
  trueLabel,
  falseColor,
  falseLabel,
}: Props) {
  if (value === undefined || value === null) return null;

  const label = value ? trueLabel : falseLabel;
  const color = value ? trueColor : falseColor;

  return <Chip color={color}>{label}</Chip>;
}
