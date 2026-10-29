import express from 'express';
import cors from 'cors';
import multer from 'multer';
import PptxGenJS from 'pptxgenjs';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors({ origin: 'http://localhost:5173' }));

app.post('/partida', upload.array('images', 50), (req, res) => {
  const pptx = new PptxGenJS();

  // Registra un diseño personalizado (en pulgadas)
  const widthInches = 19.05 * 0.3937;
  const heightInches = 25.4 * 0.3937;
  pptx.defineLayout({ name: 'custom', width: widthInches, height: heightInches });
  pptx.layout = 'custom';

  const images = req.files;

  // Dimensiones de las imágenes
  const imageWidth = 7.73 * 0.3937;
  const imageHeight = 5.79 * 0.3937;

  // Padding y separación
  const padding = 0.5; // 0.5 pulgadas de margen
  const gap = 0.3; // Separación entre imágenes

  for (let i = 0; i < images.length; i += 6) {
    const slide = pptx.addSlide();

    // Calcula las posiciones con padding y separación
    const positions = [
      { x: padding, y: padding },
      { x: padding + imageWidth + gap, y: padding },
      { x: padding, y: padding + imageHeight + gap },
      { x: padding + imageWidth + gap, y: padding + imageHeight + gap },
      { x: padding, y: padding + 2 * (imageHeight + gap) },
      { x: padding + imageWidth + gap, y: padding + 2 * (imageHeight + gap) },
    ];

    images.slice(i, i + 6).forEach((image, index) => {
      slide.addImage({
        data: `data:image/jpeg;base64,${image.buffer.toString('base64')}`,
        x: positions[index].x,
        y: positions[index].y,
        w: imageWidth,
        h: imageHeight,
      });
    });
  }

  pptx.write('base64').then((data) => {
    const buffer = Buffer.from(data, 'base64');
    res.setHeader('Content-Disposition', 'attachment; filename=partida.pptx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    res.send(buffer);
  });
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
