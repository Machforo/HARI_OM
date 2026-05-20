import fs from 'fs';

const templePhotos = JSON.parse(fs.readFileSync('temple_photos.json', 'utf-8'));
const metadataPath = 'src/data/templeMetadata.ts';
let metadataContent = fs.readFileSync(metadataPath, 'utf-8');

// The file exports templeMetadata: Record<string, { state: string, deity: string, image: string, category: string, gallery?: string[] }>

let newMetadata = `export const templeMetadata: Record<string, { state?: string, deity?: string, image?: string, category?: string, gallery?: string[] }> = {\n`;

const existingMetadata = {};
// Let's extract existing keys and their values
const existingMatches = metadataContent.matchAll(/"([^"]+)"\s*:\s*({[^}]+})/g);
for (const m of existingMatches) {
  existingMetadata[m[1]] = m[2]; // m[2] is the string { state: "...", deity: "...", image: "..." }
}

for (const entry of templePhotos) {
  let slug = entry.temple_name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and').replace(/,/g, '');
  if (slug.endsWith('-temple')) slug = slug.replace('-temple', '');
  
  const photos = entry.photos.filter(p => p !== null);
  
  if (photos.length > 0) {
    const galleryStr = `[${photos.map(p => `"${p}"`).join(', ')}]`;
    
    if (existingMetadata[slug]) {
      // Append gallery if not exists
      if (!existingMetadata[slug].includes('gallery:')) {
        existingMetadata[slug] = existingMetadata[slug].replace(/}\s*$/, `, gallery: ${galleryStr} }`);
      }
    } else {
      // try to match without "temple" or "mandir" etc.
      for (const key in existingMetadata) {
        if (entry.temple_name.toLowerCase().includes(key.replace(/-/g, ' '))) {
          if (!existingMetadata[key].includes('gallery:')) {
            existingMetadata[key] = existingMetadata[key].replace(/}\s*$/, `, gallery: ${galleryStr} }`);
          }
          break;
        }
      }
    }
  }
}

// Ensure the custom replacements (which we did earlier) have their first custom image as the first image in the gallery
const replacements = [
  { term: 'dwarkadhish', url: 'https://hblimg.mmtcdn.com/content/hubble/img/dwarka/mmt/activities/m_Dwarkadhish%20Temple-1_l_498_640.jpg' },
  { term: 'iskcon-temple-bangalore', url: 'https://www.iskconbangalore.org/wp-content/uploads/2020/03/iskcon-whitefield-860x600.jpg' },
  { term: 'iskcon-bangalore', url: 'https://www.iskconbangalore.org/wp-content/uploads/2020/03/iskcon-whitefield-860x600.jpg' },
  { term: 'mumbadevi', url: 'https://mumbadevi.org.in/assets/images/mobile-slider11.jpg' },
  { term: 'penchalakona', url: 'https://s7ap1.scene7.com/is/image/incredibleindia/mahabaleshwar-temple-maharashtra-1-attr-nearby?qlt=82&ts=1726668906099' },
  { term: 'salasar-balaji', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Salasar_balaji_02.jpg' },
  { term: 'salasar-dham-temple-rajasthan', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Salasar_balaji_02.jpg' },
  
  { term: 'yamunotri', url: 'https://temple.yatradham.org/public/Product/temple/temple_fO4FL40m_202506241837100.webp' },
  { term: 'yaganti-uma-maheswara', url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Uma-Maheswaraswami_Temple.jpg' },
  { term: 'yadadri-lakshmi-narasimha', url: 'https://blogbox.indianeagle.com/wp-content/uploads/2017/10/Yadagirigutta-Yadadri-Temple-Complex-Telangana.jpg' },
  { term: 'sri-lakshmi-narasimha-swamy-temple-yadagirigutta', url: 'https://blogbox.indianeagle.com/wp-content/uploads/2017/10/Yadagirigutta-Yadadri-Temple-Complex-Telangana.jpg' },
  { term: 'vontimitta-kodanda-rama', url: 'https://www.astroved.com/astropedia/assets/images/temples/Vontimitta-Sri-Kodandarama-Swamy-Temple.jpg' },
  { term: 'vontimitta-ram-mandir', url: 'https://www.astroved.com/astropedia/assets/images/temples/Vontimitta-Sri-Kodandarama-Swamy-Temple.jpg' },
  { term: 'virupaksha', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Complex_of_Virupaksha_Temple%2C_Hampi_%2804%29.jpg' },
  { term: 'vindhyachal', url: 'https://temple.yatradham.org/public/Product/temple/temple_Klmue7RQ_202408131457590.webp' },
  { term: 'vadakkunnathan', url: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/%E0%B4%B5%E0%B4%9F%E0%B4%95%E0%B5%8D%E0%B4%95%E0%B5%81%E0%B4%82%E0%B4%A8%E0%B4%BE%E0%B4%A5%E0%B4%95%E0%B5%8D%E0%B4%B7%E0%B5%87%E0%B4%A4%E0%B5%8D%E0%B4%B0%E0%B4%82-%E0%B4%A4%E0%B5%86%E0%B4%95%E0%B5%8D%E0%B4%95%E0%B5%87%E0%B4%97%E0%B5%8B%E0%B4%AA%E0%B5%81%E0%B4%B0%E0%B4%82.jpg' },
  { term: 'umananda', url: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Chandrasekhar_Temple%2C_Umananda.jpg' },
  { term: 'udupi-sri-krishna', url: 'https://thrillingtravel.in/wp-content/uploads/2021/05/Udupi-Sri-Krishna.jpg' },
  { term: 'tulja-bhavani', url: 'https://thetempleguru.com/wp-content/uploads/2023/11/Tulja-Bhavani-Temple-12.jpg' },
  { term: 'trimbakeshwar', url: 'https://temple.yatradham.org/public/Product/temple/temple_EdjWln6w_202506241437150.jpg' },
  { term: 'the-golden-temple', url: 'https://assets.cntraveller.in/photos/60c07fa11393a40ce8d810b0/4:3/w_4076,h_3057,c_limit/D8R9MT.jpg' },
  { term: 'swaminarayan-akshardham', url: 'https://akshardham.com/newdelhi/wp-content/uploads/2015/06/akshardham_facts_and_figure_banner.jpg' },
  { term: 'sripuram-golden', url: 'https://static.wixstatic.com/media/a521ab_2a8a7a4959824d6195a61c4810cc3abd~mv2.jpg/v1/fill/w_280,h_223,q_90,enc_avif,quality_auto/a521ab_2a8a7a4959824d6195a61c4810cc3abd~mv2.jpg' },
  { term: 'sringeri-sharada-peetham', url: 'https://d34vm3j4h7f97z.cloudfront.net/optimized/4X/5/3/9/539ffebc1177213befb0d1109dd6bebeae88335c_2_351x500.jpeg' },
  { term: 'srikalahasti', url: 'https://srikalahasthitemple.com/wp-content/uploads/2020/01/10984559_877179542334102_5292272037271817961_o.jpg' },
  { term: 'sri-varasiddhi-vinayaka', url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/00/b5/d9/outside-view.jpg?w=1200&h=-1&s=1' },
  { term: 'sri-panakala-narasimha', url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/fb/c2/96/caption.jpg?w=900&h=500&s=1' },
  { term: 'sri-malyadri-lakshmi-narasimha', url: 'https://i.pinimg.com/736x/68/11/fc/6811fc2c0ea31991ceb0053c8128af75.jpg' },
  { term: 'simhachalam', url: 'https://i0.wp.com/hindupad.com/wp-content/uploads/2015/12/Simhachalam-Temple-Varaha-Lakshmi-Narasimha-Swamy.jpg?fit=283%2C400&ssl=1' },
  { term: 'siddhivinayak', url: 'https://english.bombaysamachar.com/wp-content/uploads/2025/05/siddhivinayak-temple.webp' },
  { term: 'shri-kshetra-dharmasthala', url: 'https://sannidhi.net/wp-content/uploads/2024/01/dharmasthala1.png' },
  { term: 'shreemant-dagdusheth', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Dagdusheth_Ganpati_Temple_Decorated_during_Ganesh_Chaturti_September_2012_%281%29.JPG' },
  { term: 'dagadusheth-halwai-ganapati-pune', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Dagdusheth_Ganpati_Temple_Decorated_during_Ganesh_Chaturti_September_2012_%281%29.JPG' },
  { term: 'shree-krishna-janmabhoomi', url: 'https://content.jdmagicbox.com/comp/mathura/s5/9999px565.x565.141215113547.v1s5/catalogue/shri-krishna-janmabhoomi-temple-mathura-ho-mathura-temples-asyvg9e.jpg' },
  { term: 'shirdi-sai-baba', url: 'https://shirditourism.co.in/images/v2/places-to-visit/sai-baba-samadhi-mandir-shirdi-header-tourism.jpg' }
];

for (const { term, url } of replacements) {
  if (existingMetadata[term]) {
    // If it has a gallery, insert the url at the front
    if (existingMetadata[term].includes('gallery: [')) {
      existingMetadata[term] = existingMetadata[term].replace(/gallery:\s*\[/, `gallery: ["${url}", `);
    } else {
      existingMetadata[term] = existingMetadata[term].replace(/}\s*$/, `, gallery: ["${url}"] }`);
    }
  }
}

for (const key in existingMetadata) {
  newMetadata += `  "${key}": ${existingMetadata[key]},\n`;
}
newMetadata += `};\n`;

fs.writeFileSync(metadataPath, newMetadata, 'utf-8');
console.log('Updated templeMetadata.ts with galleries!');
