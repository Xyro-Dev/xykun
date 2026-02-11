const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

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

export async function fetchNhentaiData(code: string): Promise<NhentaiResult> {
  const res = await fetch(`${API_BASE}/api/nhentai/${code}`);
  const data = await res.json();

  if (!data.status) {
    throw new Error(data.msg || "Gagal mengambil data");
  }

  return {
    images: data.images,
    info: data.info,
  };
}

export async function downloadPdf(code: string): Promise<DownloadResult> {
  const res = await fetch(`${API_BASE}/api/download/${code}`);
  return res.json();
}
