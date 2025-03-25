const fs = require('fs');
const path = require('path');

// Directory containing the files to rename
const directoryPath = './reNamer';

// Function to rename files
function renameFiles() {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach((file, index) => {
            const oldPath = path.join(directoryPath, file);
            const newPath = path.join(directoryPath, `stefan_${index + 1}${path.extname(file)}`);

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error(`Error renaming file ${file}:`, err);
                } else {
                    console.log(`Renamed ${file} to ${path.basename(newPath)}`);
                }
            });
        });
    });
}

// Run the rename function
renameFiles();