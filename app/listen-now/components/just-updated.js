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

async function getAlbums(query) {
  const url = `https://www.jiosaavn.com/api.php?p=1&q=${query}&_format=json&api_version=4&ctx=web6dot0&n=20&__call=search.getAlbumResults`;
  const options = { method: "GET" };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data?.results;
  } catch (error) {
    console.error(error);
  }
}

export default async function JustUpdated() {
  const albums = await getAlbums("english");
  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: "auto",
      }}
      className="w-full group px-5 md:px-10"
    >
      <CarouselContent>
        {albums.map((album, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
          >
            <Link className="p-0.5 space-y-2" href={`/album/${album.id}`}>
              <Card className="overflow-hidden">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <Image
                    src={album.image.replace("150x150", "350x350")}
                    height={350}
                    width={350}
                    alt={album.title}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/spinning-dots.svg"
                  />
                </CardContent>
              </Card>
              <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none truncate">
                  {album.title}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {album.subtitle}
                </p>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant="ghost"
        className="left-1 top-1/3 mt-4 xl:mt-6 2xl:mt-10 hidden md:group-hover:inline-flex"
      />
      <CarouselNext
        variant="ghost"
        className="right-1 top-1/3 mt-4 xl:mt-6 2xl:mt-10 hidden md:group-hover:inline-flex"
      />
    </Carousel>
  );
}
