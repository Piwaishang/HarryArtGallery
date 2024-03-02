const { exec } = require('child_process');

// Specify the path to your mysql.server script
const mysqlServerPath = '/usr/local/bin/mysql.server'; // Adjust the path if needed

// Start the MySQL server
exec(`${mysqlServerPath} start`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting MySQL server: ${stderr}`);
  } else {
    console.log(`MySQL server started:\n${stdout}`);
  }
});
