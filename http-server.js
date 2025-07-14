require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_PATH = process.env.BASE_PATH;

// Servir una imagen específica
app.get("/images/:camera/:channel/:date/:filename", (req, res) => {
  const { camera, channel, date, filename } = req.params;
  const imagePath = path.join(BASE_PATH, camera, channel, date, filename);

  // Validar que el archivo existe
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("Imagen no encontrada");
    }

    res.sendFile(imagePath);
  });
});

app.listen(PORT, () => {
  console.log(
    `Servicio de imágenes Omnibox escuchando en http://localhost:${PORT}`
  );
});
