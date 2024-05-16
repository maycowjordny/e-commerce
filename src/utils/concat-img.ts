import { env } from "process";

export function concatImgUrl(url: string | undefined) {
    if (!url) return;

    return env.HOST_API?.concat(url);
}