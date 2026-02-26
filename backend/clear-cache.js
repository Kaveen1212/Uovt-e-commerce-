/**
 * Clear All Backend Caches
 * This script removes all compiled files and caches
 */

const fs = require('fs');
const path = require('path');

function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✅ Removed: ${dirPath}`);
    return true;
  } else {
    console.log(`⏭️  Not found: ${dirPath}`);
    return false;
  }
}

console.log('🧹 Clearing all backend caches...\n');

// Remove compiled TypeScript output
removeDirectory(path.join(__dirname, 'dist'));

// Remove node_modules cache
removeDirectory(path.join(__dirname, 'node_modules', '.cache'));

// Remove TypeScript build info
const tsBuildInfo = path.join(__dirname, 'tsconfig.tsbuildinfo');
if (fs.existsSync(tsBuildInfo)) {
  fs.unlinkSync(tsBuildInfo);
  console.log(`✅ Removed: ${tsBuildInfo}`);
}

console.log('\n✨ Cache cleared successfully!');
console.log('\nNext steps:');
console.log('1. Stop backend server (Ctrl+C)');
console.log('2. Start fresh: npm run start:dev');
console.log('3. Wait for "Nest application successfully started"');
