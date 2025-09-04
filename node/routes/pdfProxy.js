const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/pdf-proxy", async (req, res) => {
  const pdfUrl = req.body.url;
  if (!pdfUrl) return res.status(400).send("Missing URL in body");

  try {
    const response = await fetch(pdfUrl);
    const contentType = response.headers.get("content-type");

    if (!response.ok || !contentType.includes("pdf")) {
      return res.status(400).send("Invalid PDF response");
    }

    res.set("Content-Type", "application/pdf");
    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("PDF proxy error");
  }
});

module.exports = router;
