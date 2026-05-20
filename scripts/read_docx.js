import mammoth from "mammoth";
import path from "path";
import fs from "fs";

const docxPath = "public/assets/content/darshan/Dwarkadhish Temple Special Darshan Booking _ Hassle-Free Darshan.docx";

mammoth.extractRawText({ path: docxPath })
  .then(result => {
    console.log("=== RAW TEXT ===");
    console.log(result.value.substring(0, 1500));
  })
  .catch(err => {
    console.error("Error reading docx:", err);
  });
