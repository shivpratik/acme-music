import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Featured() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full group px-5 md:px-10"
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="sm:basis-1/2">
            <div className="p-0.5 space-y-4">
              <div className="space-y-1 text-lg">
                <h3 className="font-medium leading-none">React Rendezvous</h3>
                <p className="text-sm text-muted-foreground">Ethan Byte</p>
              </div>
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant="ghost"
        className="left-1 hidden md:group-hover:inline-flex"
      />
      <CarouselNext
        variant="ghost"
        className="right-1 hidden md:group-hover:inline-flex"
      />
    </Carousel>
  );
}
