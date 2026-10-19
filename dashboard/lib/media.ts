/// firearms.photo_url is `storage://firearm-photos/<uid>/<firearm>/photo.ext`
/// (FirearmPhotoReference in the app); return the object path.
export function firearmPhotoPath(value: string | null): string | null {
  if (!value) return null;
  const m = /^storage:\/\/firearm-photos\/(.+)$/.exec(value);
  if (m) return m[1];
  const legacy = /\/storage\/v1\/object\/sign\/firearm-photos\/([^?]+)/.exec(value);
  return legacy ? decodeURIComponent(legacy[1]) : null;
}
