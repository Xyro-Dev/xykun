const API_BASE = ""; // Set your backend API URL here

export interface NhentaiInfo {
  title: string;
  titleJapanese?: string;
  pages: number;
  tags: string[];
  artists: string[];
  languages: string[];
  categories: string[];
  parodies: string[];
  characters: string[];
  groups: string[];
  uploadDate?: string;
  favorites?: number;
}

export interface NhentaiResult {
  images: string[];
  info: NhentaiInfo;
}

export interface DownloadResult {
  status: boolean;
  url?: string;
  msg?: string;
}

// Simulated data for demo — replace with real API calls
export async function fetchNhentaiData(code: string): Promise<NhentaiResult> {
  // In production, this would call your backend:
  // const res = await fetch(`${API_BASE}/api/nhentai/${code}`);
  // return res.json();

  // Demo simulation with delay
  await new Promise(r => setTimeout(r, 1500));

  return {
    images: [
      `https://i2.nhentai.net/galleries/1579924/1.jpg`,
      `https://i1.nhentai.net/galleries/1579924/2.jpg`,
      `https://i4.nhentai.net/galleries/1579924/3.png`,
      `https://i4.nhentai.net/galleries/1579924/4.jpg`,
      `https://i4.nhentai.net/galleries/1579924/5.jpg`,
      `https://i9.nhentai.net/galleries/1579924/6.png`,
      `https://i9.nhentai.net/galleries/1579924/7.jpg`,
      `https://i2.nhentai.net/galleries/1579924/8.jpg`,
      `https://i2.nhentai.net/galleries/1579924/9.jpg`,
      `https://i9.nhentai.net/galleries/1579924/10.jpg`,
      `https://i4.nhentai.net/galleries/1579924/11.jpg`,
      `https://i1.nhentai.net/galleries/1579924/12.jpg`,
      `https://i9.nhentai.net/galleries/1579924/13.jpg`,
      `https://i1.nhentai.net/galleries/1579924/14.jpg`,
      `https://i2.nhentai.net/galleries/1579924/15.jpg`,
      `https://i4.nhentai.net/galleries/1579924/16.jpg`,
      `https://i4.nhentai.net/galleries/1579924/17.jpg`,
      `https://i1.nhentai.net/galleries/1579924/18.jpg`,
      `https://i9.nhentai.net/galleries/1579924/19.jpg`,
      `https://i1.nhentai.net/galleries/1579924/20.jpg`,
      `https://i9.nhentai.net/galleries/1579924/21.jpg`,
      `https://i4.nhentai.net/galleries/1579924/22.jpg`,
      `https://i2.nhentai.net/galleries/1579924/23.jpg`,
      `https://i2.nhentai.net/galleries/1579924/24.jpg`,
      `https://i1.nhentai.net/galleries/1579924/25.png`,
    ],
    info: {
      title: `[Artist] Sample Doujinshi Title #${code}`,
      titleJapanese: "サンプル同人誌タイトル",
      pages: 25,
      tags: ["manga", "doujinshi", "translated", "full color"],
      artists: ["Sample Artist"],
      languages: ["japanese", "translated"],
      categories: ["doujinshi"],
      parodies: ["original"],
      characters: ["original character"],
      groups: ["Circle Name"],
      uploadDate: "2024-03-15",
      favorites: 1247,
    },
  };
}

export async function downloadPdf(code: string): Promise<DownloadResult> {
  // In production: const res = await fetch(`${API_BASE}/api/download/${code}`);
  await new Promise(r => setTimeout(r, 2000));

  // Demo result
  return {
    status: true,
    url: `https://qu.ax/demo-${code}.pdf`,
  };
}
