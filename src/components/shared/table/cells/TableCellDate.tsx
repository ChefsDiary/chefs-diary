import { formatDateTime } from "@/lib/utils/date";

type Props = {
  date: Date | null;
};

export default function TableCellDate({ date }: Props) {
  return <>{formatDateTime(date)}</>;
}
