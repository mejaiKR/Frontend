"use client";
import React from "react";

import { RecoilRoot } from "recoil";

interface RecoilWrapperProps {
  children: React.ReactNode;
}

export const RecoilWrapper = ({ children }: RecoilWrapperProps) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
