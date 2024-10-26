import { TrackList } from "@/components/track-list";
import { notFound } from "next/navigation";

async function getAlbum(id) {
  const url = `https://saavn.dev/api/playlists?id=${id}`;
  const options = { method: "GET", headers: { Cookie: "L=english" } };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Playlist({ params: { id } }) {
  const album = await getAlbum(id);

  if (!album) {
    notFound();
  }
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="mx-5 md:mx-10 border-b pt-4 md:pt-8 pb-2">
        <h1 className="text-3xl font-semibold">{album.name}</h1>
      </div>
      <div className="mx-5 md:mx-10 mb-2 space-y-2">
        <TrackList playlist={album} />
      </div>
    </div>
  );
}
