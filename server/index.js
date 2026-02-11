const express = require('express');
const cors = require('cors');
const { nhentaiToPdf, fetchNhentaiInfo } = require('./nh');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Fetch nhentai info + images
app.get('/api/nhentai/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const result = await fetchNhentaiInfo(code);
    res.json(result);
  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
});

// Download as PDF
app.get('/api/download/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const result = await nhentaiToPdf(code);
    res.json(result);
  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`NH Downloader API running on port ${PORT}`);
});
