"use client";

import { TbLoader2 } from "react-icons/tb";

export const Loader = ({ size, color }) => {
  return (
    <TbLoader2
      className={`animate-spin text-[${color || "#fff"}]`}
      size={size || 17}
      color="#fff"
    />
  );
};
