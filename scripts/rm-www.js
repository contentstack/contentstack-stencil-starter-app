import fs from 'node:fs';

// directory path
const dir = 'www';

// delete directory recursively
try {
  fs.rm(dir, { recursive: true }, () => {});

  console.log(`${dir} is deleted!`);
} catch (err) {
  console.error(`Error while deleting ${dir}.`);
}
