import { HTMLAttributes } from "react";
import { IconType } from "react-icons";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

import { mergeStyles } from "@/lib/utils/styles";
import { Tooltip } from "@heroui/react";

type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  hideDetails?: boolean;
  detailsLabel?: string;
  onDetails?: () => void;
  detailsIcon?: IconType;

  hideEdit?: boolean;
  editLabel?: string;
  onEdit?: () => void;

  hideDelete?: boolean;
  deleteLabel?: string;
  onDelete?: () => void;
};
// TODO: Uživatele bude možno i skrýt, nepujde o d něho nic vidět na webu
export default function TableCellActions({
  className,
  hideDetails,
  detailsLabel,
  onDetails,
  detailsIcon: DetailsIcon,
  hideEdit,
  editLabel,
  onEdit,
  hideDelete,
  deleteLabel,
  onDelete,
  ...restProps
}: Props) {
  return (
    <div
      className={mergeStyles("relative flex items-center gap-2", className)}
      {...restProps}
    >
      {!hideDetails && (
        <Tooltip content={detailsLabel ?? "Detail"}>
          <button
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={onDetails}
          >
            {DetailsIcon ? <DetailsIcon /> : <IoEyeOutline />}
          </button>
        </Tooltip>
      )}

      {!hideEdit && (
        <Tooltip content={editLabel ?? "Editovat"}>
          <button
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={onEdit}
          >
            <CiEdit />
          </button>
        </Tooltip>
      )}

      {!hideDelete && (
        <Tooltip color="danger" content={deleteLabel ?? "Smazat"}>
          <button
            className="text-lg text-danger cursor-pointer active:opacity-50"
            onClick={onDelete}
          >
            <MdDeleteOutline />
          </button>
        </Tooltip>
      )}
    </div>
  );
}
