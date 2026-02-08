// components/ui/Loader.tsx
import { Loader2 } from "lucide-react";

export default function Loader({
  size = 24,
  text,
}: {
  size?: number;
  text?: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 text-gray-600">
      <Loader2
        className="animate-spin"
        style={{ width: size, height: size }}
      />
      {text && <span>{text}</span>}
    </div>
  );
}
