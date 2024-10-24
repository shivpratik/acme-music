import { Button } from "@/components/ui/button";
import {
  FastForward,
  Play,
  Repeat,
  Rewind,
  Shuffle,
  Volume,
  Volume2,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

export default function PlayerBar() {
  return (
    <header className="grid grid-cols-4 sticky top-0 h-16 shrink-0 gap-2 border-b p-1 z-10 bg-white">
      <div className="flex items-center justify-center order-2 md:order-1">
        <Button className="hidden md:inline-flex" variant="ghost" size="icon">
          <Shuffle className="h-4 w-4" />
        </Button>
        <Button className="hidden md:inline-flex" variant="ghost" size="icon">
          <Rewind className="h-4 w-4" fill="#000" />
        </Button>
        <Button variant="ghost" size="icon">
          <Play className="h-6 w-6" fill="#000" />
        </Button>
        <Button variant="ghost" size="icon">
          <FastForward className="h-4 w-4" fill="#000" />
        </Button>
        <Button className="hidden md:inline-flex" variant="ghost" size="icon">
          <Repeat className="h-4 w-4" />
        </Button>
      </div>
      <div className="md:col-start-2 col-span-3 md:col-span-2 flex items-center order-1 md:order-2">
        <div className="shrink">
          <Image
            className="aspect-square w-auto min-w-14 h-14"
            src="https://placehold.co/512/png"
            alt="Album Cover"
            width={512}
            height={512}
          />
        </div>
        <div className="bg-secondary flex flex-col grow h-full truncate">
          <div className="flex flex-col grow justify-center text-center text-sm px-2">
            <p className="font-semibold">Kinni Soni</p>
            <p className="text-muted-foreground truncate">
              Darshan Raval - Out of Control
            </p>
          </div>
          <Progress className="rounded-none h-1" value={33} />
        </div>
      </div>
      <div className="md:flex flex-row items-center justify-center hidden md:order-3">
        <Volume className="h-4 w-4" fill="#000" />
        <Slider className="w-20" defaultValue={[33]} max={100} step={1} />
        <Volume2 className="ml-2 h-4 w-4" fill="#000" />
      </div>
    </header>
  );
}
