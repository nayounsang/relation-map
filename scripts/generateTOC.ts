import * as fs from 'fs';
import * as path from 'path';

// Function to generate a table of contents from a given README file content
function generateTOC(fileContent: string): string {
    const lines = fileContent.split('\n');
    let toc: string[] = [];

    // Regular expression to match headers up to ### level
    const headerRegex = /^(#{1,3})\s+(.*)/;

    // Dictionary to keep track of header occurrences
    const headerCount: { [key: string]: number } = {};

    for (const line of lines) {
        const match = headerRegex.exec(line);
        if (match) {
            const [ , hashes, title ] = match;
            const level = hashes.length;
            if (level <= 3) {
                let anchor = title.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                
                // Increment header count for unique identification
                if (headerCount[anchor]) {
                    headerCount[anchor]++;
                    anchor = `${anchor}-${headerCount[anchor]}`;
                } else {
                    headerCount[anchor] = 1;
                }

                // Create the TOC entry with proper indentation
                toc.push(`${'  '.repeat(level - 1)}- [${title.trim()}](#${anchor})`);
            }
        }
    }

    return toc.join('\n');
}

// Function to insert the TOC at the beginning of the README file
function insertTOCToFile(filePath: string): void {
    // Read the original README.md file
    const originalContent = fs.readFileSync(filePath, 'utf-8');
    
    // Generate the TOC from the original content
    const tocContent = generateTOC(originalContent);

    // Define the TOC marker
    const tocMarker = '<!-- TOC -->';

    // Remove existing TOC if any, to avoid duplication
    const contentWithoutOldTOC = originalContent.replace(new RegExp(`^${tocMarker}[\\s\\S]*?${tocMarker}`, 'm'), '');

    // Create new content with TOC at the top
    const newContent = `${tocMarker}\n${tocContent}\n${tocMarker}${contentWithoutOldTOC}`;

    // Write the new content back to the README.md file
    fs.writeFileSync(filePath, newContent, 'utf-8');

    console.log('Table of Contents has been updated in README.md');
}

const readmePath = path.join(__dirname, '../README.md');
insertTOCToFile(readmePath);