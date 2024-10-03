import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface RefreshButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function RefreshButton({ title, onClick, disabled }: RefreshButtonProps) {
  return (
    <Button className="text-white" onClick={onClick} disabled={disabled}>
      <ReloadIcon className="mr-2 h-4 w-4" />
      {title}
    </Button>
  );
}
