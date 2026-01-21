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
const BASE_PREFIX = 'https://raw.githubusercontent.com/mri-Qbox-Brasil/mri-ui-kit/main/src/components';

const COMPONENT_MAP = {
    // Atoms
    'MriBadge': 'atoms',
    'MriButton': 'atoms',
    'MriIcons': 'atoms',
    'MriInput': 'atoms',
    'MriScrollArea': 'atoms',
    'MriStatusBadge': 'atoms',
    'mri-badge-variants': 'atoms',
    'mri-button-variants': 'atoms',

    // Molecules
    'MriButtonGroup': 'molecules',
    'MriCard': 'molecules',
    'MriCompactSearch': 'molecules',
    'MriDialog': 'molecules',
    'MriModal': 'molecules',
    'MriPopover': 'molecules',
    'MriSelectSearch': 'molecules',
    'MriThemeToggle': 'molecules',
    'MriTimePicker': 'molecules',
    'MriCommand': 'molecules',
    'MriCopyButton': 'molecules',
    'MriEconomyCard': 'molecules',
    'MriGridActionButton': 'molecules',
    'MriSearchInput': 'molecules',
    'MriSectionHeader': 'molecules',
    'MriDatePicker': 'molecules',

    // Organisms
    'MriCalendar': 'organisms',
    'MriPageHeader': 'organisms',
    'MriSidebar': 'organisms',
    'MriTable': 'organisms',
};

function toPascalCase(str) {
    return str
        .replace(/(^\w|-\w)/g, (clear) => clear.replace(/-/, "").toUpperCase());
}
function ensureDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function fetchFileContent(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                let data = '';
                response.on('data', (chunk) => data += chunk);
                response.on('end', () => resolve(data));
            } else {
                reject(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
}

const visited = new Set();

async function processComponent(componentName, installDir) {
    let fileName = componentName;
    let isVariant = componentName.includes('variants');

    if (!isVariant) {
        if (!fileName.startsWith('Mri') && !fileName.match(/^[A-Z]/)) {
            fileName = toPascalCase(fileName);
        }
        if (!fileName.startsWith('Mri')) {
            fileName = `Mri${fileName}`;
        }
    }

    // Check map for directory
    const componentKey = isVariant ? fileName.replace(/\.ts$/, '') : fileName.replace(/\.tsx$/, '');
    const category = COMPONENT_MAP[componentKey];

    if (!category) {
        console.warn(chalk.yellow(`⚠️  Component ${fileName} not found in atomic map. Trying legacy path...`));
    }

    if (!isVariant) {
        if (!fileName.endsWith('.tsx')) fileName += '.tsx';
    } else {
        if (!fileName.endsWith('.ts')) fileName += '.ts';
    }

    if (visited.has(fileName)) return;
    visited.add(fileName);

    const destPath = path.join(installDir, fileName);

    // Construct URL
    const remoteDir = category || 'ui';
    const fileUrl = `${BASE_PREFIX}/${remoteDir}/${fileName}`;

    if (fs.existsSync(destPath)) {
        console.log(chalk.gray(`   ${fileName} already exists.`));
        await checkDependencies(destPath, installDir);
        return;
    }

    console.log(chalk.cyan(`⬇️  Downloading ${fileName}...`));
    try {
        let content = await fetchFileContent(fileUrl);

        // Rewrite imports to be flat
        // Replace @/components/(atoms|molecules|organisms)/ with @/components/ui/
        content = content.replace(/@\/components\/(?:atoms|molecules|organisms)\//g, '@/components/ui/');

        fs.writeFileSync(destPath, content);

        console.log(chalk.green(`✅ ${fileName} added.`));

        await checkDependenciesContent(content, installDir);

    } catch (err) {
        console.error(chalk.red(`❌ Error downloading ${fileName}: ${err.message}`));
    }
}

async function checkDependenciesContent(content, installDir) {
    try {
        const importRegex = /from\s+['"](?:@\/components\/ui\/|\.\/)([^'"]+)['"]/g;
        let match;

        while ((match = importRegex.exec(content)) !== null) {
            const depName = match[1];
            if (depName.startsWith('Mri') || depName.includes('variants')) {
                await processComponent(depName, installDir);
            }
        }
    } catch (e) {
        console.warn(chalk.yellow(`Could not parse dependencies.`));
    }
}

async function checkDependencies(filePath, installDir) {
    const content = fs.readFileSync(filePath, 'utf8');
    await checkDependenciesContent(content, installDir);
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
