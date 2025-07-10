import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  disabled,
  className,
  ...props
}) => {
  return (
    <Button
      disabled={isLoading || disabled}
      className={cn("item-center flex gap-2", className)}
      {...props}
    >
      {isLoading && <Loader2 className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
};

export default LoadingButton;
