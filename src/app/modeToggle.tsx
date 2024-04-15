"use client";
import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // 초기 상태를 'system'으로 설정하고, 유효한 값이 있는지 확인
  const [currentTheme, setCurrentTheme] = React.useState<
    "light" | "dark" | "system"
  >("system");

  React.useEffect(() => {
    // 'theme'와 'resolvedTheme'가 유효한 값인지 확인하고 상태 업데이트
    const effectiveTheme = theme === "system" ? resolvedTheme : theme;
    if (
      effectiveTheme === "light" ||
      effectiveTheme === "dark" ||
      effectiveTheme === "system"
    ) {
      setCurrentTheme(effectiveTheme);
    }
  }, [theme, resolvedTheme]);

  const toggleTheme = () => {
    // 현재 테마에 따라 테마 변경
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {currentTheme === "dark" ? (
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      ) : (
        <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
