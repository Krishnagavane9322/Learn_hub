// Helper function to generate Unsplash URLs
// In a real app, this would call the Unsplash API

export function getUnsplashUrl(query: string, width = 600, height = 400): string {
  // Generate a stable hash from the query for consistent images
  const hash = query.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const imageId = Math.abs(hash % 1000) + 1500000000000;
  
  return `https://images.unsplash.com/photo-${imageId}?w=${width}&h=${height}&fit=crop`;
}

export const unsplash_tool = {
  search: (query: string) => getUnsplashUrl(query)
};
