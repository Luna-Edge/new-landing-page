import React, { FC, ReactNode } from "react";

type Props = {
  className?: string;
  borderWidth?: number;
  borderColor?: string;
  children: string | ReactNode | ReactNode[];
};

const Container: FC<Props> = ({
  children,
  className,
  borderWidth = 1,
  borderColor = "black",
}) => {
  return (
    <div
      style={{
        background: `transparent padding-box, ${borderColor} border-box`,
        border: `${borderWidth}px solid transparent`,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Container;
