"use client";
import React from "react";

import { RecoilRoot } from "recoil";

interface RecoilWrapperProps {
  children: React.ReactNode;
}

export default function RecoilWrapper({ children }: RecoilWrapperProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
