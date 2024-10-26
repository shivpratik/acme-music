import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

async function getData() {
  const url =
    "https://www.jiosaavn.com/api.php?api_version=4&ctx=web6dot0&__call=content.getHomepageData";
  const options = { method: "GET", headers: { Cookie: "L=english" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Browse() {
  const { genres } = await getData();
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="mx-5 md:mx-10 border-b pt-4 md:pt-8 pb-2">
        <h1 className="text-3xl font-semibold">Browse</h1>
      </div>
      <div className="grid grid-cols-4 gap-4 px-5 md:px-10">
        {genres.map((genre, index) => (
          <Card className="overflow-hidden" key={index}>
            <CardContent className="relative flex aspect-square items-center justify-center p-0">
              <Image
                src={genre.image}
                height={384}
                width={384}
                alt={genre.title}
              />
              <h2 className="absolute left-4 bottom-4 text-xl font-semibold text-secondary">
                {genre.title}
              </h2>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
