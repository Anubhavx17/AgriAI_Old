// tiffUtils.js
import { fromUrl } from "geotiff";

export async function loadTiff(url) {
  const tiff = await fromUrl(url);
  const image = await tiff.getImage();
  const metaData = image.getFileDirectory();
  const data = await image.readRasters();
console.log({url});
  return {
    metaData,
    data,
  };
}
    
      
    
