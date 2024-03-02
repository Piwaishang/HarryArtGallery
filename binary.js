const fs = require('fs');

const filePath = 'public/作曲作品/Fantasia in F.ogg';

try {
  // Read binary data from file synchronously
  const data = fs.readFileSync(filePath);

  // Print binary data
  console.log('Binary Data:', data.toString('hex'));

  // Optionally, you can write the binary data to another file
  const outputPath = 'output.txt';
  fs.writeFileSync(outputPath, data.toString('hex'));

  console.log(`Binary data written to ${outputPath}`);
} catch (err) {
  console.error(`Error reading file: ${err.message}`);
}
