import { BackIcon } from "@/src/ui-kit";

type Props = {
  onClick: () => void;
};

export const BackButton = ({ onClick }: Props) => {
  return (
    <div
      className="flex items-center gap-2 hover:cursor-pointer"
      onClick={onClick}
    >
      <BackIcon />
      <div className="text-neutral-dark font-mono text-xs">BACK</div>
    </div>
  );
};
