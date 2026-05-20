import fs from 'fs';

const temples = [
  "Amaralingeswara Swamy Temple", "Sri Satyanarayana Swamy Temple", "Kanaka Durga Temple", "Penchalakona Lakshmi Narasimha Swamy Temple", "Sri Malyadri Lakshmi Narasimha Swamy Temple", "Sri Panakala Narasimha Swamy Temple", "Sri Varasiddhi Vinayaka Swamy Temple", "Sri Varaha Lakshmi Narasimha Swamy Temple", "Srikalahasti Temple", "Tirumala Venkateswara Temple", "Vontimitta Ram Mandir", "Mallikarjuna Swamy Temple", "Ahobilam Temple Complex", "Lepakshi Veerabhadra Temple", "Arasavalli Sun Temple", "Yaganti Uma Maheswara Temple", "Draksharamam Temple", "Kamakhya Temple", "Umananda Temple", "Mahabodhi Temple", "Vishnupad Temple", "Patan Devi Temple", "Mangla Gauri Temple", "Danteshwari Temple", "Bamleshwari Temple", "Jhandewalan Temple", "Laxminarayan Temple Birla Mandir Delhi", "Shri Kalkaji Mandir", "Lotus Temple Delhi", "ISKCON Temple Delhi", "Chhatarpur Temple", "Akshardham Temple Delhi", "Shree Shantadurga Temple Goa", "Dwarkadhish Temple Gujarat", "Nageshwar Temple Gujarat", "Palitana Jain Tirth Temple", "Somnath Temple", "Swaminarayan Akshardham Mandir Gandhinagar", "Ambaji Temple Gujarat", "Modhera Sun Temple", "Rukmini Devi Temple Dwarka", "Dakor Ranchhodraiji Temple", "Shamlaji Temple Gujarat", "Bahuchar Mata Temple", "Hutheesing Jain Temple Ahmedabad", "Mata Mansa Devi Temple Haridwar", "Sthaneshwar Mahadev Temple Kurukshetra", "Bhadrakali Temple Kurukshetra", "Naina Devi Temple Himachal Pradesh", "Jwala Ji Temple Himachal Pradesh", "Brajeshwari Temple Kangra", "Chintpurni Temple", "Raghunath Temple Jammu", "Vaishno Devi Temple", "Amarnath Cave Temple", "Shankaracharya Temple Kashmir", "Kheer Bhawani Temple Kashmir", "Hari Parbat Temple Srinagar", "Shikharji Temple Jharkhand", "Baidyanath Jyotirlinga Temple", "Chamundeshwari Temple Mysuru", "Shri Kshetra Dharmasthala", "Sri Male Mahadeshwara Swamy Temple", "Sringeri Sharada Peetham Temple", "Udupi Sri Krishna Matha", "Virupaksha Temple Hampi", "Murudeshwar Temple", "Kukke Subramanya Temple", "Gokarna Mahabaleshwar Temple", "Kollur Mookambika Temple", "Chennakeshava Temple Belur", "Hoysaleswara Temple Halebidu", "ISKCON Temple Bangalore", "Horanadu Annapoorneshwari Temple", "Banavasi Madhukeshwara Temple", "Guruvayur Temple Kerala", "Padmanabhaswamy Temple Thiruvananthapuram", "Sabarimala Temple Kerala", "Chottanikkara Temple Kerala", "Vadakkunnathan Temple Thrissur", "Attukal Bhagavathy Temple", "Vaikom Mahadeva Temple", "Mannarasala Nagaraja Temple", "Sree Poornathrayeesa Temple", "Ambalappuzha Sri Krishna Temple", "Thirunelli Temple Kerala", "Khajuraho Temples", "Mahakaleshwar Temple Ujjain", "Omkareshwar Temple", "Bageshwar Dham Sarkar Madhya Pradesh", "Maihar Devi Temple", "Pitambara Peeth Datia", "Kal Bhairav Temple Ujjain", "Chintaman Ganesh Temple Ujjain", "Chausath Yogini Temple Morena", "Sasbahu Temple Gwalior", "Bhojeshwar Temple Bhojpur", "Bhimashankar Jyotirlinga Maharashtra", "Kalaram Temple Nashik", "Shirdi Sai Baba Temple", "Siddhivinayak Temple Mumbai", "Trimbakeshwar Temple", "Grishneshwar Temple", "Mahalakshmi Temple Kolhapur", "Tulja Bhavani Temple", "Renuka Mata Temple Maharashtra", "Saptashrungi Temple", "Mayureshwar Temple Morgaon", "Ballaleshwar Temple Pali", "Varadvinayak Temple Mahad", "Chintamani Temple Theur", "Girijatmaj Temple Lenyadri", "Vighnahar Temple Ozar", "Mahaganapati Temple Ranjangaon", "Pandharpur Vithoba Temple", "Dagadusheth Halwai Ganapati Pune", "Mumbadevi Temple Mumbai", "Babulnath Temple Mumbai", "Ekvira Aai Temple Karla", "Jyotiba Temple Kolhapur", "Nartiang Durga Temple Meghalaya", "Jagannath Temple Puri", "Lingaraj Temple Bhubaneswar", "Ram Mandir Bhubaneswar Odisha", "Tara Tarini Temple Odisha", "Konark Sun Temple", "Mukteswara Temple Bhubaneswar", "Samaleswari Temple Sambalpur", "Rajarani Temple Bhubaneswar", "The Golden Temple Amritsar", "Durgiana Temple Amritsar", "Shri Devi Talab Mandir Jalandhar", "Mukteshwar Mahadev Temple Punjab", "Govind Dev Ji Temple Jaipur", "Khatu Shyam Ji Temple Rajasthan", "Mehandipur Balaji Temple Rajasthan", "Nathdwara Shrinathji Temple Rajasthan", "Salasar Dham Temple Rajasthan", "Trinetra Ganesh Temple Ranthambore", "Brahma Temple Pushkar", "Karni Mata Temple Deshnok", "Dilwara Temples Mount Abu", "Ranakpur Jain Temple", "Galtaji Temple Jaipur", "Osian Temples Rajasthan", "Shri Mahavirji Temple Rajasthan", "Adiyogi Shiva Temple Coimbatore", "Airavatesvara Temple Darasuram", "Brihadeeswarar Temple Thanjavur", "Ekambareswarar Temple Kanchipuram", "Bhagavathy Amman Temple Tamil Nadu", "Linga Bhairavi Temple Coimbatore", "Meenakshi Temple Madurai", "Palani Murugan Temple", "Rameswaram Temple", "Ranganathaswamy Temple Srirangam", "Swarnakarshana Bhairavar Temple Tamil Nadu", "Thillai Nataraja Temple Chidambaram", "Varadharaja Perumal Temple Kanchipuram", "Kamakshi Amman Temple Kanchipuram", "Swamimalai Murugan Temple", "Thiruchendur Murugan Temple", "Thirupparamkunram Murugan Temple", "Thiruthani Murugan Temple", "Pazhamudircholai Murugan Temple", "Jambukeswarar Temple Thiruvanaikaval", "Arunachaleswarar Temple Thiruvannamalai", "Suryanar Kovil Tamil Nadu", "Kailasanathar Temple Kanchipuram", "Vaitheeswaran Koil Tamil Nadu", "Swetharanyeswarar Temple Thiruvenkadu", "Apatsahayesvarar Temple Thiruveezhimizhalai", "Agniswarar Temple Kanjanur", "Dharbaranyeswarar Temple Sirkazhi", "Naganathar Temple Sirkazhi", "Naganathaswamy Temple Kumbakonam", "Kapaleeshwarar Temple Chennai", "Parthasarathy Temple Chennai", "Sripuram Golden Temple Vellore", "Samayapuram Mariamman Temple", "Vadapalani Andavar Temple Chennai", "Suchindram Thanumalayan Temple", "Srivilliputhur Andal Temple", "Kanchi Kailasanathar Temple", "Uchi Pillayar Temple Tiruchirappalli", "Namakkal Anjaneyar Temple", "Alampur Jogulamba Temple Telangana", "Birla Mandir Hyderabad", "Chilkur Balaji Temple", "Kotilingala Temple Telangana", "Sita Ramachandraswamy Temple Bhadrachalam", "Sri Lakshmi Narasimha Swamy Temple Yadagirigutta", "Sri Peddamma Thalli Temple Hyderabad", "Sri Punyalingeswara Swamy Temple", "Bhadrakali Temple Warangal", "Ramappa Temple Warangal", "Thousand Pillar Temple Warangal", "Gnana Saraswati Temple Basar", "Karmanghat Hanuman Temple Hyderabad", "Mata Tripura Sundari Temple Tripura", "Banke Bihari Temple Vrindavan", "Bhitargaon Brick Temple Kanpur", "Gokul Chaurasi Khamba Mathura", "Guptar Ghat Ayodhya", "Hanuman Garhi Temple Ayodhya", "Kanak Bhawan Ayodhya", "Kashi Vishwanath Temple Varanasi", "Madan Mohan Temple Vrindavan", "Nageshwarnath Temple Ayodhya", "Nand Bhavan Temple Nandgaon", "Prem Mandir Vrindavan", "Radha Raman Temple Vrindavan", "Ram Mandir Ayodhya", "Rangji Temple Vrindavan", "Shahji Temple Vrindavan", "Shree Krishna Janmabhoomi Mathura", "Shri Radha Rani Temple Barsana", "Vindhyachal Temple Mirzapur", "Vishalakshi Temple Varanasi", "Sankat Mochan Hanuman Temple Varanasi", "Annapurna Devi Temple Varanasi", "Kaal Bhairav Temple Varanasi", "Gorakhnath Temple Gorakhpur", "Tulsi Manas Mandir Varanasi", "Sarnath Mulagandhakuti Vihara", "Bateshwar Nath Temple Agra", "JK Temple Kanpur", "Badrinath Temple Uttarakhand", "Gangotri Temple Uttarakhand", "Kedarnath Temple Uttarakhand", "Neelkanth Mahadev Temple Rishikesh", "Yamunotri Temple Uttarakhand", "Mansa Devi Temple Haridwar", "Chandi Devi Temple Haridwar", "Maya Devi Temple Haridwar", "Jageshwar Dham Almora", "Dhari Devi Temple Uttarakhand", "Tungnath Temple Uttarakhand", "Belur Math Howrah West Bengal", "Dakshineswar Kali Temple Kolkata", "ISKCON Temple Kolkata", "Kalighat Kali Temple Kolkata", "Parasnath Digambar Jain Temple Kolkata", "Tara Temple Tarapith West Bengal", "Tarakeshwar Temple West Bengal", "Mayapur Chandrodaya Mandir West Bengal", "Hanseswari Temple Bansberia West Bengal", "Ananta Basudeba Temple Puri"
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const headers = { 'User-Agent': 'TemplePhotosBot/1.0 (test@example.com)' };

async function fetchTemplePhotos(templeName) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(templeName)}&srnamespace=6&format=json&srlimit=8`;
    const searchRes = await fetch(searchUrl, { headers });
    const searchData = await searchRes.json();
    
    if (!searchData.query || !searchData.query.search) return [];

    let fileTitles = searchData.query.search.map(r => r.title);
    fileTitles = fileTitles.filter(title => {
      const lower = title.toLowerCase();
      return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png');
    });

    fileTitles = fileTitles.slice(0, 4);

    const urls = [];
    for (const title of fileTitles) {
      const urlRes = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`, { headers });
      const urlData = await urlRes.json();
      if (!urlData.query || !urlData.query.pages) continue;

      const pages = urlData.query.pages;
      for (const pageId in pages) {
        if (pages[pageId].imageinfo && pages[pageId].imageinfo[0]) {
          urls.push(pages[pageId].imageinfo[0].url);
        }
      }
    }
    return urls;
  } catch (err) {
    console.error(`Error fetching for ${templeName}:`, err.message);
    return [];
  }
}

async function run() {
  const results = [];
  let with4 = 0;
  let with3 = 0;
  let fewer = 0;

  console.log(`Starting fetch for ${temples.length} temples...`);

  for (let i = 0; i < temples.length; i++) {
    const name = temples[i];
    console.log(`[${i + 1}/${temples.length}] Fetching: ${name}...`);
    
    let photos = await fetchTemplePhotos(name);
    
    // Fill to 4 slots
    while (photos.length < 4) {
      photos.push(null);
    }
    
    const validCount = photos.filter(p => p !== null).length;
    if (validCount === 4) with4++;
    else if (validCount === 3) with3++;
    else fewer++;

    results.push({
      temple_name: name,
      photos: photos
    });

    await sleep(300); // 300ms delay
  }

  // Write JSON
  fs.writeFileSync('temple_photos.json', JSON.stringify(results, null, 2), 'utf-8');

  // Write CSV
  let csvContent = "temple_name,photo_1_url,photo_2_url,photo_3_url,photo_4_url\n";
  for (const row of results) {
    const escapedName = `"${row.temple_name.replace(/"/g, '""')}"`;
    const line = [escapedName, ...row.photos.map(p => p ? `"${p}"` : 'null')].join(',');
    csvContent += line + "\n";
  }
  fs.writeFileSync('temple_photos.csv', csvContent, 'utf-8');

  console.log('\n--- Summary ---');
  console.log(`Total temples processed: ${temples.length}`);
  console.log(`Total with 4 photos: ${with4}`);
  console.log(`Total with 3 photos: ${with3}`);
  console.log(`Total with fewer than 3 photos: ${fewer}`);
  console.log('Saved to temple_photos.json and temple_photos.csv');
}

run();
