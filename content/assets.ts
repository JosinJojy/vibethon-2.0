export interface GalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export const gallery: GalleryItem[] = [
  { id: 'g1', src: '/images/vibethon/gallery/I1.jpeg', width: 1672, height: 941, alt: 'VIBETHON 2025 venue', caption: 'VIBETHON 2025 opening ceremony' },
  { id: 'g2', src: '/images/vibethon/gallery/I2.jpeg', width: 941, height: 1672, alt: 'Participants coding', caption: 'Intense midnight building session' },
  { id: 'g3', src: '/images/vibethon/gallery/I3.jpeg', width: 1024, height: 1536, alt: 'Mentorship session', caption: 'Expert mentorship during the hack' },
  // { id: 'g4', src: '/images/vibethon/gallery/G4.avif', width: 1672, height: 941, alt: 'VIBETHON 2025 winners', caption: 'The winning team of VIBETHON 2025' }
];

export interface AssetEntry {
  src: string | null;
  width: number;
  height: number;
  available: boolean;
}

// Set 'available: true' only after verifying the file exists locally
export const assets: Record<string, AssetEntry> = {
  heroDesktop: { src: '/images/vibethon/hero-vault-desktop.avif', width: 1672, height: 941, available: true },
  heroMobile: { src: '/images/vibethon/hero-vault-mobile.avif', width: 941, height: 1672, available: true },
  professor: { src: '/images/vibethon/professor-cutout.avif', width: 1024, height: 1536, available: true },
  vaultChamber: { src: '/images/vibethon/vault-chamber.avif', width: 1672, height: 941, available: true },
  brandLogo: { src: '/brand/encide-logo.webp', width: 438, height: 150, available: true },
};
