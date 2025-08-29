import { HTMLAttributes } from "react";

import { mergeStyles } from "@/lib/utils/styles";

type Props = HTMLAttributes<HTMLDivElement> & {};

export default function PageContent({
  className,
  children,
  ...restProps
}: Props) {
  return (
    <div
      className={mergeStyles("flex flex-wrap -mt-7 -mx-7 flex-1", className)}
      {...restProps}
    >
      {children}
    </div>
  );
}
