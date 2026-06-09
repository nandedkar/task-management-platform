import express from "express";

const app = express();

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "API Running"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});