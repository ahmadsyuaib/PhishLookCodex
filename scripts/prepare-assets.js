const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const projectRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(projectRoot, 'src', 'assets');
const certsDir = path.join(projectRoot, 'certs');

const iconSpecs = [
  { file: 'icon-16.png', size: 16, color: [0x1f, 0x93, 0xff] },
  { file: 'icon-32.png', size: 32, color: [0x1f, 0x93, 0xff] },
  { file: 'icon-80.png', size: 80, color: [0x1f, 0x93, 0xff] }
];

function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function createIcon({ file, size, color }) {
  const outputPath = path.join(assetsDir, file);
  if (fs.existsSync(outputPath)) {
    return Promise.resolve();
  }

  const png = new PNG({ width: size, height: size });
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const idx = (size * y + x) << 2;
      png.data[idx] = color[0];
      png.data[idx + 1] = color[1];
      png.data[idx + 2] = color[2];
      png.data[idx + 3] = 0xff;
    }
  }

  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(outputPath);
    stream.on('finish', () => {
      console.log(`Created ${path.relative(projectRoot, outputPath)}`);
      resolve();
    });
    stream.on('error', reject);
    png.pack().pipe(stream);
  });
}

ensureDirectory(assetsDir);
ensureDirectory(certsDir);
Promise.all(iconSpecs.map(createIcon))
  .then(() => {
    console.log('Assets directory is ready.');
    console.log('Certificates directory created (generate your own PEM files as described in TODO.md).');
  })
  .catch((error) => {
    console.error('Unable to prepare assets:', error);
    process.exitCode = 1;
  });
