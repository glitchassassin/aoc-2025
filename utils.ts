import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function readInput(filename: string) {
    // Get the caller's file path from the stack trace
    const stack = new Error().stack;
    if (!stack) {
        throw new Error('Unable to get call stack');
    }
    
    // Find the first stack frame that's not this file
    const stackLines = stack.split('\n');
    let callerFilePath: string | null = null;
    
    for (const line of stackLines) {
        // Try to match file:// URLs or direct file paths
        let fileMatch = line.match(/file:\/\/([^:\)]+)/);
        if (!fileMatch) {
            // Try matching direct file paths (e.g., /path/to/file.ts:line:col)
            fileMatch = line.match(/(\/[^:\)]+\.ts)/);
        }
        
        if (fileMatch) {
            let filePath = fileMatch[1];
            // If it's a file:// URL, convert it
            if (filePath.startsWith('file://')) {
                filePath = fileURLToPath(filePath);
            } else if (filePath.startsWith('/')) {
                // Already an absolute path
            } else {
                continue;
            }
            
            // Skip utils.ts and node internals
            if (!filePath.includes('utils.ts') && !filePath.includes('node:')) {
                callerFilePath = filePath;
                break;
            }
        }
    }
    
    if (!callerFilePath) {
        throw new Error('Unable to find caller file path in stack trace');
    }
    
    const callerDir = path.dirname(callerFilePath);
    
    return fs.readFileSync(path.join(callerDir, filename), 'utf8');
}

export function renderGrid(grid: (string | number)[][]) {
    for (const row of grid) {
        console.log(row.join(''));
    }
}