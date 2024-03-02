const fs = require('fs');

const musicFilePath = 'public/作曲作品/Fantasia in F.ogg';
fs.readFile(musicFilePath, (err, musicData) => {
  if (err) {
    console.error(`Error reading music file: ${err.message}`);
  } else {
    // Convert binary data to Base64 string
    const base64String = musicData.toString('hex');

    // Write the Base64 string to another file
    const base64FilePath = 'path/to/your/base64file.txt';
    fs.writeFileSync("Fantasia in F.txt", base64String);

    console.log(`Base64 data written to ${base64FilePath}`);

    // Optionally, decode the Base64 string back to binary
    const decodedMusicData = Buffer.from(fs.readFileSync("Fantasia in F.txt"), 'hex');

    // Optionally, write the decoded binary data to another music file
    const decodedMusicFilePath = 'Fantasia in F decode.ogg';
    fs.writeFileSync(decodedMusicFilePath, decodedMusicData);

    console.log(`Decoded music data written to ${decodedMusicFilePath}`);
  }
});