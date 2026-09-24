const sharp = require('sharp');
const fs = require('fs');

async function convert() {
  if (!fs.existsSync('public/images/vibethon/gallery')) {
    fs.mkdirSync('public/images/vibethon/gallery', { recursive: true });
  }
  
  const files = ['G1', 'G2', 'G3', 'G4'];
  for (const f of files) {
    const src = `public/images/vibethon/${f}.png`;
    if (fs.existsSync(src)) {
      const meta = await sharp(src).metadata();
      await sharp(src)
        .avif({ quality: 75 })
        .toFile(`public/images/vibethon/gallery/${f}.avif`);
      console.log(`${f} converted to AVIF. Original dims: ${meta.width}x${meta.height}`);
      
      // Move master out of public
      if (!fs.existsSync('assets-master')) fs.mkdirSync('assets-master');
      fs.renameSync(src, `assets-master/${f}.png`);
    }
  }
}

convert().catch(console.error);
