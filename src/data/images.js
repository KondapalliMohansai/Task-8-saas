// Everything exported from Figma (avatars, product shots, task previews, illustrations, nav icons)
function byName(files) {
  return Object.fromEntries(
    Object.entries(files).map(([path, url]) => [path.split('/').pop().replace(/\.\w+$/, ''), url])
  );
}

export const avatars = byName(import.meta.glob('../assets/avatars/*.jpg', { eager: true, import: 'default' }));
export const productImg = byName(import.meta.glob('../assets/products/*.jpg', { eager: true, import: 'default' }));
export const taskImg = byName(import.meta.glob('../assets/tasks/*.jpg', { eager: true, import: 'default' }));
export const illustrations = byName(import.meta.glob('../assets/illustrations/*.jpg', { eager: true, import: 'default' }));
export const icons = byName(import.meta.glob('../assets/icons/*.png', { eager: true, import: 'default' }));
