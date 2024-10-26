import { Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-center md:justify-between h-16 px-5 md:px-10 bg-secondary text-sm mt-4 md:mt-8">
      <p className="text-center">
        Copyright © 2024 Acme Music. All rights reserved.
      </p>
      <p className="inline-flex items-center space-x-1">
        <span>Made with</span>
        <Heart className="text-red-500 h-3 w-3" fill="currentColor" />
        <span>
          by <Link href="#">Shivpratik</Link>
        </span>
      </p>
    </footer>
  );
}
