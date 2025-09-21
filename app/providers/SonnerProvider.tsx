"use client"
import React from "react";
import { Toaster } from "sonner";
import { useAppSelector } from "../redux/reduxTypes";


const SonnerProvider = ({
    children,
}: { children: React.ReactNode }): React.ReactElement => {
    const { position } = useAppSelector((state) => state.sonnerSlice);
  return (
    <div>
        <Toaster richColors position={position} />
        {children}
    </div>
  );
};

export default SonnerProvider;

