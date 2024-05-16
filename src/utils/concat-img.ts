export function concatImgUrl(url: string | undefined) {
    if (!url) return;

    return process.env.NEXT_PUBLIC_HOST_API?.concat(url);
}