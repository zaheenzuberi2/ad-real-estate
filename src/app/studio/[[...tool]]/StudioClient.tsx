"use client";

import dynamic from "next/dynamic";
import config from "../../../../sanity.config";

/**
 * Sanity Studio is a client-only SPA — it isn't designed to be
 * server-rendered. Attempting to SSR it (even from inside a Client
 * Component, which Next still renders once on the server for the initial
 * HTML) crashes in production with `Cannot read properties of null (reading
 * 'useMemoCache')`: Studio's bundle expects a React internal that the
 * server's React build doesn't expose the same way the browser's does.
 * `ssr: false` skips that server pass entirely, which is the documented fix
 * for `next-sanity/studio` under the App Router.
 */
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false }
);

export function StudioClient() {
  return <NextStudio config={config} />;
}
