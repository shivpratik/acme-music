import { ChevronRight } from "lucide-react";
import Featured from "./components/featured";
import NewReleases from "./components/new-release";
import Link from "next/link";
import JustUpdated from "./components/just-updated";

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

export default async function ListenNow() {
  const data = await getData();
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="mx-5 md:mx-10 border-b pt-4 md:pt-8 pb-2">
        <h1 className="text-3xl font-semibold">Listen Now</h1>
      </div>
      <Featured albums={data.featured_playlists} />
      <div>
        <div className="mx-5 md:mx-10 mb-2">
          <h2 className="text-lg font-semibold">
            <Link className="inline-flex items-center" href="#">
              New Releases
              <ChevronRight className="h-4 w-4" />
            </Link>
          </h2>
        </div>
        <NewReleases albums={data.new_albums} />
      </div>
      <div>
        <div className="mx-5 md:mx-10 mb-2">
          <h2 className="text-lg font-semibold">
            <Link className="inline-flex items-center" href="#">
              Just Updated
              <ChevronRight className="h-4 w-4" />
            </Link>
          </h2>
        </div>
        <JustUpdated />
      </div>
    </div>
  );
}
