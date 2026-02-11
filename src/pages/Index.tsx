import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, FileText, Heart, Calendar, Tag, Users, BookOpen, Loader2, ExternalLink, Image as ImageIcon } from "lucide-react";
import { fetchNhentaiData, downloadPdf, type NhentaiResult } from "@/lib/api";
import { useSystemTheme } from "@/hooks/use-system-theme";

const Index = () => {
  useSystemTheme();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [result, setResult] = useState<NhentaiResult | null>(null);
  const [error, setError] = useState("");
  const [previewIdx, setPreviewIdx] = useState(0);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);
    setPreviewIdx(0);

    try {
      const data = await fetchNhentaiData(code.trim());
      setResult(data);
    } catch {
      setError("Gagal mengambil data. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await downloadPdf(code.trim());
      if (res.status && res.url) {
        window.open(res.url, "_blank");
      } else {
        setError(res.msg || "Download gagal.");
      }
    } catch {
      setError("Download gagal. Coba lagi.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Mesh gradient background */}
      <div className="mesh-gradient">
        <div className="blob-1" />
        <div className="blob-2" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            NH Downloader
          </h1>
          <p className="text-muted-foreground">
            Masukkan kode untuk preview & download PDF
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-strong mb-8 flex w-full max-w-lg items-center gap-3 rounded-2xl px-5 py-3"
        >
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="Masukkan kode (cth: 546230)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Cari"
            )}
          </button>
        </motion.form>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass mb-6 rounded-xl px-5 py-3 text-destructive"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading skeleton */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-strong w-full max-w-3xl rounded-3xl p-6"
            >
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="shimmer h-72 w-full rounded-2xl md:w-56" />
                <div className="flex flex-1 flex-col gap-3">
                  <div className="shimmer h-8 w-3/4 rounded-lg" />
                  <div className="shimmer h-5 w-1/2 rounded-lg" />
                  <div className="shimmer mt-4 h-10 w-full rounded-xl" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="shimmer h-7 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-strong w-full max-w-3xl rounded-3xl p-6"
            >
              <div className="flex flex-col gap-6 md:flex-row">
                {/* Preview image */}
                <div className="group relative shrink-0">
                  <div className="relative h-80 w-full overflow-hidden rounded-2xl md:w-56">
                    <img
                      src={result.images[previewIdx]}
                      alt="Preview"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 glass flex items-center justify-between px-3 py-2 text-xs text-foreground">
                      <span className="flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        {previewIdx + 1} / {result.images.length}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setPreviewIdx(Math.max(0, previewIdx - 1))}
                          disabled={previewIdx === 0}
                          className="rounded px-2 py-0.5 transition hover:bg-primary/20 disabled:opacity-30"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => setPreviewIdx(Math.min(result.images.length - 1, previewIdx + 1))}
                          disabled={previewIdx === result.images.length - 1}
                          className="rounded px-2 py-0.5 transition hover:bg-primary/20 disabled:opacity-30"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground leading-tight">
                      {result.info.title}
                    </h2>
                    {result.info.titleJapanese && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {result.info.titleJapanese}
                      </p>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-primary" />
                      {result.info.pages} halaman
                    </span>
                    {result.info.favorites !== undefined && (
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-destructive" />
                        {result.info.favorites.toLocaleString()}
                      </span>
                    )}
                    {result.info.uploadDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-accent" />
                        {result.info.uploadDate}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {result.info.artists.map(a => (
                      <span key={a} className="glass-input flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-foreground">
                        <Users className="h-3 w-3 text-primary" /> {a}
                      </span>
                    ))}
                    {result.info.tags.map(t => (
                      <span key={t} className="glass-input rounded-full px-3 py-1 text-xs text-muted-foreground">
                        <Tag className="mr-1 inline h-3 w-3" />{t}
                      </span>
                    ))}
                  </div>

                  {/* Languages & categories */}
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {result.info.languages.map(l => (
                      <span key={l} className="rounded-md bg-primary/10 px-2 py-1 capitalize text-primary">
                        {l}
                      </span>
                    ))}
                    {result.info.categories.map(c => (
                      <span key={c} className="rounded-md bg-accent/10 px-2 py-1 capitalize text-accent">
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Download button */}
                  <motion.button
                    onClick={handleDownload}
                    disabled={downloading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-auto flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-shadow hover:shadow-xl disabled:opacity-60"
                  >
                    {downloading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Memproses PDF...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5" />
                        Download PDF
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
                {result.images.slice(0, 10).map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setPreviewIdx(i)}
                    whileHover={{ scale: 1.08 }}
                    className={`shrink-0 overflow-hidden rounded-xl transition-all ${
                      previewIdx === i
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Page ${i + 1}`}
                      className="h-16 w-12 object-cover"
                      loading="lazy"
                    />
                  </motion.button>
                ))}
                {result.images.length > 10 && (
                  <div className="glass flex h-16 w-12 shrink-0 items-center justify-center rounded-xl text-xs text-muted-foreground">
                    +{result.images.length - 10}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-xs text-muted-foreground"
        >
          Powered by nhentaiToPdf · Liquid Glass UI
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
