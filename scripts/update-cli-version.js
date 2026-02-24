import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, '../package.json');
const cliPath = path.resolve(__dirname, '../bin/cli.js');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const version = packageJson.version;

let cliContent = fs.readFileSync(cliPath, 'utf-8');

// Regex to find .version('x.x.x')
cliContent = cliContent.replace(/\.version\(['"][^'"]+['"]\)/, `.version('${version}')`);

fs.writeFileSync(cliPath, cliContent);

console.log(`✅ Updated CLI version to ${version}`);
