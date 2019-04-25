export function parseIncedents(incidents: any) {
  return [...incidents]
    .filter((item: any) => item.title != null)
    .map((item: any) => {
      return {
        title: item.title,
        description: item.description,
        id: item.id,
        thumbnail_img: item.media.image_url_thumb
      };
    });
}
