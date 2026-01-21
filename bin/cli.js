#!/usr/bin/env node

/**
 * Simple CLI to add Mri UI components to a project.
 * Usage: npx @mriqbox/ui-kit add <component-name>
 * Example: npx @mriqbox/ui-kit add mri-button
 */

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import https from 'https';

const program = new Command();
const BASE_URL = 'https://raw.githubusercontent.com/mri-Qbox-Brasil/mri-ui-kit/main/src/components/ui';

function toPascalCase(str) {
    return str
        .replace(/(^\w|-\w)/g, (clear) => clear.replace(/-/, "").toUpperCase());
}
function ensureDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                fs.unlink(dest, () => { });
                reject(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

const visited = new Set();

async function processComponent(componentName, installDir) {
    let targetName = componentName;

    let fileName = componentName;
    let isVariant = componentName.includes('variants');

    if (!isVariant) {
        if (!fileName.startsWith('Mri') && !fileName.match(/^[A-Z]/)) {
            fileName = toPascalCase(fileName);
        }
        if (!fileName.startsWith('Mri')) {
            fileName = `Mri${fileName}`;
        }
        if (!fileName.endsWith('.tsx')) fileName += '.tsx';
    } else {
        if (!fileName.endsWith('.ts')) fileName += '.ts';
    }
    if (visited.has(fileName)) return;
    visited.add(fileName);

    const destPath = path.join(installDir, fileName);
    const fileUrl = `${BASE_URL}/${fileName}`;

    if (fs.existsSync(destPath)) {
        console.log(chalk.gray(`   ${fileName} already exists.`));
        // Even if exists, we should scan it for dependencies?
        // Maybe the user has an outdated version.
        // For detailed recursion, strictly we should read it.
        // But let's assume if it exists, its deps are likely handled or user manages it.
        // To be safe for "fresh" installs, let's scan it anyway if we can read it.
        // But standard 'add' usually skips or prompts overwrite.
        // Let's just skip download but continues to scan deps if we want to be thorough.
        // For this "Simple CLI", let's stop at existence to avoid overwriting user changes.
        // BUT we must check its imports to ensure children exist.
        checkDependencies(destPath, installDir);
        return;
    }

    console.log(chalk.cyan(`⬇️  Downloading ${fileName}...`));
    try {
        await downloadFile(fileUrl, destPath);
        console.log(chalk.green(`✅ ${fileName} added.`));

        await checkDependencies(destPath, installDir);

    } catch (err) {
        console.error(chalk.red(`❌ Error downloading ${fileName}: ${err.message}`));
    }
}

async function checkDependencies(filePath, installDir) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const importRegex = /from\s+['"](?:@\/components\/ui\/|\.\/)([^'"]+)['"]/g;
        let match;

        while ((match = importRegex.exec(content)) !== null) {
            const depName = match[1];
            if (depName.startsWith('Mri') || depName.includes('variants')) {
                await processComponent(depName, installDir);
            }
        }
    } catch (e) {
        console.warn(chalk.yellow(`Could not parse dependencies for ${filePath}`));
    }
}

program
    .name('mri-ui')
    .description('Add Mri UI components to your project')
    .version('2.0.0');

program
    .command('add <component>')
    .description('Add a component to your project')
    .action(async (componentName) => {
        try {
            console.log(chalk.blue(`🔹 Resolving ${componentName}...`));

            let installDir = './src/components/ui';
            if (fs.existsSync('components.json')) {
                try {
                    if (fs.existsSync('./components/ui')) installDir = './components/ui';
                } catch (e) { }
            } else if (fs.existsSync('./components/ui')) {
                installDir = './components/ui';
            }

            console.log(chalk.gray(`   Target directory: ${installDir}`));
            ensureDirectory(installDir);

            await processComponent(componentName, installDir);

            console.log(chalk.blue(`\n🎉 Done!`));
            console.log(chalk.gray(`   Don't forget to install external libraries if prompted by your linter (lucide-react, etc).`));

        } catch (error) {
            console.error(chalk.red('An unexpected error occurred:'), error);
        }
    });

program.parse();
