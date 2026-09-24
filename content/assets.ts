export interface GalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export const gallery: GalleryItem[] = [];

export interface AssetEntry {
  src: string | null;
  width: number;
  height: number;
  available: boolean;
}

// Set 'available: true' only after verifying the file exists locally
export const assets: Record<string, AssetEntry> = {
  heroDesktop: { src: '/images/vibethon/hero-vault-desktop.avif', width: 2560, height: 1440, available: false },
  heroMobile: { src: '/images/vibethon/hero-vault-mobile.avif', width: 1440, height: 2560, available: false },
  professor: { src: '/images/vibethon/professor-cutout.webp', width: 1600, height: 2000, available: false },
  vaultChamber: { src: '/images/vibethon/vault-chamber.avif', width: 2400, height: 1350, available: false },
  brandLogo: { src: '/brand/encide-logo.svg', width: 200, height: 50, available: false },
};
