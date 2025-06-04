const fs = require('fs');
const path = require('path');

// Simple module bundler for our player
function bundleFiles() {
  console.log('🔨 Building Omexa Player...');
  
  // Read all source files
  const icons = fs.readFileSync(path.join(__dirname, 'src/icons.js'), 'utf8');
  const styles = fs.readFileSync(path.join(__dirname, 'src/styles.js'), 'utf8');
  const youtube = fs.readFileSync(path.join(__dirname, 'src/youtube.js'), 'utf8');
  const controls = fs.readFileSync(path.join(__dirname, 'src/controls.js'), 'utf8');
  const player = fs.readFileSync(path.join(__dirname, 'src/player.js'), 'utf8');
  
  // Remove export/import statements and wrap in IIFE
  const processedIcons = icons.replace(/export const/g, 'const');
  const processedStyles = styles.replace(/export const/g, 'const');
  const processedYoutube = youtube.replace(/export class/g, 'class');
  const processedControls = controls
    .replace(/import.*from.*['"]\.\/icons\.js['"];?\n?/g, '')
    .replace(/export class/g, 'class');
  const processedPlayer = player
    .replace(/import.*from.*['"]\.\/styles\.js['"];?\n?/g, '')
    .replace(/import.*from.*['"]\.\/controls\.js['"];?\n?/g, '')
    .replace(/import.*from.*['"]\.\/youtube\.js['"];?\n?/g, '')
    .replace(/export class/g, 'class');
  
  // Create the bundled output
  const bundledCode = `/*!
 * Omexa Player v1.0.0
 * Modern video player for web
 * https://github.com/your-username/omexa-player
 * 
 * Copyright (c) 2024
 * Released under the MIT License
 */
(function() {
  'use strict';
  
  // Icons module
  ${processedIcons}
  
  // Styles module
  ${processedStyles}
  
  // YouTube Player module
  ${processedYoutube}
  
  // Controls module
  ${processedControls}
  
  // Main Player module
  ${processedPlayer}
  
})();`;
  
  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  
  // Write the bundled file
  fs.writeFileSync(path.join(__dirname, 'dist/omexa-player.js'), bundledCode);
  
  // Create minified version (very conservative minification)
  const minified = bundledCode
    .replace(/\/\*(?![\s\S]*?Omexa Player)[\s\S]*?\*\//g, '') // Remove comments except license
    .replace(/^\s*\/\/.*$/gm, '') // Remove line comments
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove excessive empty lines
    .replace(/^\s+/gm, '') // Remove leading whitespace
    .replace(/\s+$/gm, '') // Remove trailing whitespace
    .trim();
  
  fs.writeFileSync(path.join(__dirname, 'dist/omexa-player.min.js'), minified);
  
  console.log('✅ Build complete!');
  console.log('📄 Files created:');
  console.log('   - dist/omexa-player.js');
  console.log('   - dist/omexa-player.min.js');
  
  // Get file sizes
  const normalSize = fs.statSync(path.join(__dirname, 'dist/omexa-player.js')).size;
  const minifiedSize = fs.statSync(path.join(__dirname, 'dist/omexa-player.min.js')).size;
  
  console.log('📊 File sizes:');
  console.log(`   - Normal: ${(normalSize / 1024).toFixed(2)} KB`);
  console.log(`   - Minified: ${(minifiedSize / 1024).toFixed(2)} KB`);
}

// Run the build
bundleFiles(); 