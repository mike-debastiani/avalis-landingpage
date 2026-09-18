import { Play } from "lucide-react";
import { PlaceholderBox } from "@/components/placeholder-box";

export function VideoPlaceholder({ label }: { label: string }) {
  return <PlaceholderBox icon={Play} label={label} className="aspect-video w-full" />;
}
