import path from "node:path";
import { getProjectAssetParams, readProjectAsset } from "@/lib/projects";

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectAssetParams();
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/projects/[slug]/media/[...path]">,
) {
  const { slug, path: assetPath } = await params;
  const asset = readProjectAsset(slug, assetPath);

  if (!asset) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(asset, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type":
        contentTypes[path.extname(assetPath.at(-1) ?? "").toLowerCase()] ??
        "application/octet-stream",
    },
  });
}
