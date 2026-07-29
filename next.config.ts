import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — there are other lock files higher up on this
  // machine, and Turbopack would otherwise guess the wrong directory.
  turbopack: {
    root: path.dirname(new URL(import.meta.url).pathname),
  },
  images: {
    // Editors can point image fields at any host; those render as a plain
    // <img> (see components/ui/Media.tsx), so only local files are optimized.
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/uploads/**" }],
  },
};

export default nextConfig;
