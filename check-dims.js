const sharp = require('sharp');

async function check() {
  const files = [
    'public/images/vibethon/hero-vault-desktop.avif',
    'public/images/vibethon/hero-vault-mobile.avif',
    'public/images/vibethon/professor-cutout.avif',
    'public/images/vibethon/vault-chamber.avif',
    'public/brand/encide-logo.webp'
  ];
  
  for (const f of files) {
    try {
      const meta = await sharp(f).metadata();
      console.log(`${f} - ${meta.width}x${meta.height}`);
    } catch (e) {
      console.log(`Failed to read ${f}: ${e.message}`);
    }
  }
}

check().catch(console.error);
