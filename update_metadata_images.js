import fs from 'fs';

const templePhotos = JSON.parse(fs.readFileSync('temple_photos.json', 'utf-8'));
const metadataPath = 'src/data/templeMetadata.ts';
let metadataContent = fs.readFileSync(metadataPath, 'utf-8');

// The file exports templeMetadata: Record<string, { state: string, deity: string, image: string, category: string }>
// We need to parse it, but it's a TS file.
// We can use a regex to match the slug and update the image URL.
// Or we can just extract the object, update it, and write it back.

const match = metadataContent.match(/export const templeMetadata: [^=]+= ({[\s\S]*?});/);
if (match) {
  let metadataObjStr = match[1];
  // Since it's a JS object string (not strict JSON), we can use eval if we are careful, 
  // but it's better to just write a simple replacer.
  
  for (const entry of templePhotos) {
    const photos = entry.photos.filter(p => p !== null);
    if (photos.length > 0) {
      const firstPhoto = photos[0];
      
      // Try to find a matching slug. 
      // Name from list: "Sri Varaha Lakshmi Narasimha Swamy Temple" 
      // Slug might be "sri-varaha-lakshmi-narasimha-swamy" or "simhachalam"
      // Let's generate a slug for the name
      let slug = entry.temple_name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and').replace(/,/g, '');
      if (slug.endsWith('-temple')) slug = slug.replace('-temple', '');
      
      // Let's try to find if this slug exists in metadataObjStr
      const regex = new RegExp(`("${slug}"\\s*:\\s*{[^}]*?image\\s*:\\s*)"([^"]*)"`, 'g');
      metadataObjStr = metadataObjStr.replace(regex, `$1"${firstPhoto}"`);
      
      // Also try to match directly by name without "Temple"
      const nameParts = entry.temple_name.replace(' Temple', '').toLowerCase().split(' ');
      
      // We will do a generic replacement if slug matches
    }
  }
  
  // Since string replacement is fragile, let's parse the TS file using a custom approach
}

// A better way is to run a script that imports the TS file (if it was JS)
// Let's just create a new map for ALL 248 temples and export it!
// We can generate a new templeMetadata.ts that has the state, deity, image, category for all 248 temples!

let newMetadata = `export const templeMetadata: Record<string, { state?: string, deity?: string, image?: string, category?: string }> = {\n`;

const existingMetadata = {};
// Let's extract existing keys and their values
const existingMatches = metadataContent.matchAll(/"([^"]+)"\s*:\s*({[^}]+})/g);
for (const m of existingMatches) {
  existingMetadata[m[1]] = m[2]; // m[2] is the string { state: "...", deity: "...", ... }
}

for (const entry of templePhotos) {
  let slug = entry.temple_name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and').replace(/,/g, '');
  if (slug.endsWith('-temple')) slug = slug.replace('-temple', '');
  
  const photos = entry.photos.filter(p => p !== null);
  const image = photos.length > 0 ? photos[0] : null;
  
  if (existingMetadata[slug]) {
    // update image
    if (image) {
      existingMetadata[slug] = existingMetadata[slug].replace(/image:\s*"[^"]*"/, `image: "${image}"`);
    }
  } else {
    // try to match without "temple" or "mandir" etc.
    let matched = false;
    for (const key in existingMetadata) {
      if (entry.temple_name.toLowerCase().includes(key.replace(/-/g, ' '))) {
        if (image) {
          existingMetadata[key] = existingMetadata[key].replace(/image:\s*"[^"]*"/, `image: "${image}"`);
        }
        matched = true;
        break;
      }
    }
    
    if (!matched && image) {
      // Add a new entry
      existingMetadata[slug] = `{ image: "${image}" }`;
    }
  }
}

for (const key in existingMetadata) {
  newMetadata += `  "${key}": ${existingMetadata[key]},\n`;
}
newMetadata += `};\n`;

fs.writeFileSync(metadataPath, newMetadata, 'utf-8');
console.log('Updated templeMetadata.ts');
