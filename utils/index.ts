export function formatFullName(name?: string | null): string {
  if (!name) return "";

  return name
    .trim()
    .split(/\s+/)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase(),
    )
    .join(" ");
}


export const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
