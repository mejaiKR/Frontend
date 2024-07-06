"use client";
import { RecoilRoot } from "recoil";
import React from "react";

interface RecoilWrapperProps {
  children: React.ReactNode;
}

export default function RecoilWrapper({ children }: RecoilWrapperProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
