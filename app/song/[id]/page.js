import { TrackList } from "@/components/track-list";
import { notFound } from "next/navigation";

async function getSong(id) {
  const url = `https://saavn.dev/api/songs/${id}`;
  const options = { method: "GET" };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Song({ params: { id } }) {
  const [song] = await getSong(id);
  const album = { songs: [song] };

  if (!song) {
    notFound();
  }
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="mx-5 md:mx-10 border-b pt-4 md:pt-8 pb-2">
        <h1 className="text-3xl font-semibold">{song.name}</h1>
      </div>
      <div className="mx-5 md:mx-10 mb-2 space-y-2">
        <TrackList playlist={album} />
      </div>
    </div>
  );
}
