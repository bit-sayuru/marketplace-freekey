// Returns a clean array of image URLs for a product.
// Supports both the new `images` array field and the old single `imageUrl` field
// (for products saved in localStorage before multi-image support existed).
export function getProductImages(product) {
  if (!product) return [];

  const fromArray = Array.isArray(product.images)
    ? product.images.filter(url => typeof url === 'string' && url.trim() !== '')
    : [];

  if (fromArray.length > 0) return fromArray;

  if (product.imageUrl && product.imageUrl.trim() !== '') {
    return [product.imageUrl];
  }

  return [];
}
