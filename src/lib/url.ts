export function withBase(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm|mov|m4v)$/i.test(src)
}
