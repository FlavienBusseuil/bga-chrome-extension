const fs = require('fs');
const path = require('path');

// Path to legacy darkThemeGames.ts with styles
const tsFilePath = path.join(__dirname, '../src/js/config/darkThemeGames.ts');

fs.readFile(tsFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the TypeScript file:', err);
        return;
    }

    // Regex to match styles and references
    const regexMap = {
        darkStyle: {
            styleRegex: /_darkStyleForGame\['([^']+)'\]\s*=\s*`([^`]+)`;/g,
            referenceRegex: /_darkStyleForGame\['([^']+)'\]\s*=\s*_darkStyleForGame\['([^']+)'\];/g,
            fileName: 'darkStyle.less',
        },
        style: {
            styleRegex: /_styleForGame\['([^']+)'\]\s*=\s*`([^`]+)`;/g,
            referenceRegex: /_styleForGame\['([^']+)'\]\s*=\s*_styleForGame\['([^']+)'\];/g,
            fileName: 'style.less',
        },
    };

    // Replace JS constants with LESS mixins
    const replaceConstantsWithMixins = (cssContent) => {
        return cssContent.replace(/\$\{([a-zA-Z]+Button(?:Over)?)\}/g, '.$1();');
    };

    // Function to write styles to files
    const writeStyles = (gameName, cssContent, fileName) => {
        const commonImport = '@import "../common";\n';
        const replacedCssContent = commonImport + replaceConstantsWithMixins(cssContent);

        // Create directory for the game if it doesn't exist
        const gameDir = path.join(__dirname, '../src/css/games/', gameName);
        fs.mkdirSync(gameDir, { recursive: true });

        const cssFilePath = path.join(gameDir, fileName);
        fs.writeFile(cssFilePath, replacedCssContent, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing ${fileName} for ${gameName}:`, err);
            } else {
                console.log(`Created ${cssFilePath}`);
            }
        });
    };

    // Resolve references to other games by using imports
    const writeReference = (gameName, referencedGame, fileName) => {
        const referenceContent = `@import "../${referencedGame}/${fileName}";\n`;

        // Create directory for the game if it doesn't exist
        const gameDir = path.join(__dirname, '../src/css/games/', gameName);
        fs.mkdirSync(gameDir, { recursive: true });

        // Write the reference content to the specified file
        const cssFilePath = path.join(gameDir, fileName);
        fs.writeFile(cssFilePath, referenceContent, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing reference ${fileName} for ${gameName}:`, err);
            } else {
                console.log(`Created reference ${cssFilePath}`);
            }
        });
    };

    const processStyles = (type, resolvedStyles) => {
        const { styleRegex, referenceRegex, fileName } = regexMap[type];

        // Extract styles
        let match;
        while ((match = styleRegex.exec(data)) !== null) {
            const gameName = match[1];
            const cssContent = match[2];
            resolvedStyles[gameName] = cssContent;
        }

        // Handle references
        while ((match = referenceRegex.exec(data)) !== null) {
            const referencingGame = match[1];
            const referencedGame = match[2];

            if (resolvedStyles[referencedGame]) {
                writeReference(referencingGame, referencedGame, fileName);
            } else {
                console.warn(`Referenced game "${referencedGame}" not found for "${referencingGame}".`);
            }
        }

        // Write resolved styles to files
        Object.entries(resolvedStyles).forEach(([gameName, cssContent]) => {
            writeStyles(gameName, cssContent, fileName);
        });
    };

    // Process dark styles and regular styles
    const resolvedDarkStyles = {};
    const resolvedStyles = {};
    processStyles('darkStyle', resolvedDarkStyles);
    processStyles('style', resolvedStyles);
});