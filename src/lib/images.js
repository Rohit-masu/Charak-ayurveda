const images = import.meta.glob('../assets/images/**/*', {
  eager: true,
  query: '?url',
  import: 'default'
});

export function getImageUrl(filename) {
  if (!filename) return null;

  for (const path in images) {
    if (path.endsWith(`/${filename}`) || path === filename) {
      return images[path];
    }
  }

  return null;
}
