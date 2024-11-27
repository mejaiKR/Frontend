import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

type Props = Readonly<{
  title: string;
}>;

export function LoadingButton({ title }: Props) {
  return (
    <Button disabled className="text-white">
      <ReloadIcon className="mr-2 h-4 w-6 animate-spin" />
      {title}
    </Button>
  );
}
