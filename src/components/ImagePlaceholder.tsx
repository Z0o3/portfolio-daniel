import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  label: string;
  sublabel?: string;
  className?: string;
};

export default function ImagePlaceholder({ label, sublabel, className }: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "grid-backdrop relative flex h-full min-h-[160px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-line bg-bg-secondary p-6 text-center",
        className,
      )}
    >
      <ImageOff className="h-6 w-6 text-muted" strokeWidth={1.5} aria-hidden="true" />
      <p className="label-mono text-[11px] uppercase tracking-widest text-blue-bright">
        Captura pendiente
      </p>
      <p className="font-display text-sm font-medium text-white-blue">{label}</p>
      {sublabel ? <p className="text-xs text-muted">{sublabel}</p> : null}
    </div>
  );
}
