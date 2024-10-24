import { ChevronRight } from "lucide-react";
import Featured from "./components/featured";
import NewReleases from "./components/new-release";
import Link from "next/link";
import JustUpdated from "./components/just-updated";

export default function ListenNow() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="mx-5 md:mx-10 border-b pt-4 md:pt-8 pb-2">
        <h1 className="text-3xl font-semibold">Listen Now</h1>
      </div>
      <Featured />
      <div>
        <div className="mx-5 md:mx-10 mb-2">
          <h2 className="text-lg font-semibold">
            <Link className="inline-flex items-center" href="#">
              New Releases
              <ChevronRight className="h-4 w-4" />
            </Link>
          </h2>
        </div>
        <NewReleases />
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
      <footer className="flex flex-wrap items-center justify-center md:justify-between h-16 px-5 md:px-10 bg-secondary text-sm">
        <p className="text-center">
          Copyright © 2024 Acne Music. All rights reserved.
        </p>
        <p>Made with love</p>
      </footer>
    </div>
  );
}
