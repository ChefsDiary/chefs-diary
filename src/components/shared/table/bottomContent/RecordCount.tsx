import { memo } from "react";

interface RecordsCountProps {
  total: number;
  singularLabel?: string;
  pluralLabel?: string;
  fewLabel?: string;
  className?: string;
}

const RecordsCount = memo(
  ({
    total,
    singularLabel = "záznam",
    pluralLabel = "záznamů",
    fewLabel = "záznamy",
    className = "text-small text-default-400",
  }: RecordsCountProps) => {
    const getLabel = (): string => {
      if (total === 1) return singularLabel;
      if (total < 4) return fewLabel;
      return pluralLabel;
    };

    return (
      <span className={className}>
        Celkem {total} {getLabel()}
      </span>
    );
  }
);

RecordsCount.displayName = "RecordsCount";

export default RecordsCount;
