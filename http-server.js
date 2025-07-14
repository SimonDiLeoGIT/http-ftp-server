const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Carpeta base donde están las imágenes
const BASE_ROOT = "H:\\Omnibox v2";

// Servir una imagen específica
app.get("/images/:camera/:cannel/:date/:filename", (req, res) => {
  const { camera, date, filename } = req.params;
  const imagePath = path.join(BASE_ROOT, camera, date, filename);

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
