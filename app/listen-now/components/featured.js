import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function Featured({ albums }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full group px-5 md:px-10"
    >
      <CarouselContent>
        {albums.map((album, index) => (
          <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
            <Link
              prefetch={true}
              className="p-0.5 space-y-4"
              href={`/${album.type}/${album.id}`}
            >
              <div className="space-y-1 text-lg">
                <h3 className="font-medium leading-none truncate">
                  {album.title}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {album.subtitle}
                </p>
              </div>
              <Card className="overflow-hidden">
                <CardContent className="flex aspect-video items-center justify-center p-0">
                  <Image
                    src={album.image}
                    alt={album.title}
                    height={384}
                    width={384}
                  />
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant="ghost"
        className="left-1 mt-6 hidden md:group-hover:inline-flex"
      />
      <CarouselNext
        variant="ghost"
        className="right-1 mt-6 hidden md:group-hover:inline-flex"
      />
    </Carousel>
  );
}
