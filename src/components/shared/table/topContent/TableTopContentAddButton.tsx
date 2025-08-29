import { memo, ReactNode } from "react";
import { FaPlus } from "react-icons/fa6";

import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";

import Button from "../../button/Button";
import HideContentNoPermission from "../../layout/hideContentNoPermission/HideContentNoPermission";

interface TableTopContentAddButtonProps {
  onPress: () => void;
  label: string;
  requiredPermissions?: PermissionTypeEnum[];
  icon?: ReactNode;
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  isDisabled?: boolean;
}

const TableTopContentAddButton = memo(
  ({
    onPress,
    label,
    requiredPermissions = [],
    icon = <FaPlus />,
    color = "primary",
    variant = "solid",
    size = "md",
    className,
    isDisabled = false,
  }: TableTopContentAddButtonProps) => {
    const button = (
      <Button
        color={color}
        variant={variant}
        size={size}
        startContent={icon}
        onPress={onPress}
        className={className}
        isDisabled={isDisabled}
      >
        {label}
      </Button>
    );

    if (requiredPermissions.length === 0) {
      return button;
    }

    return (
      <HideContentNoPermission allowedPermissions={requiredPermissions}>
        {button}
      </HideContentNoPermission>
    );
  }
);

TableTopContentAddButton.displayName = "TableTopContentAddButton";

export default TableTopContentAddButton;
