const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walk(dirPath, callback);
    } else if (dirPath.endsWith('.tsx')) {
      callback(path.join(dirPath));
    }
  });
}

function replaceClasses(content) {
  // Replace standard page titles like: className="text-3xl font-medium text-gray-800 tracking-tight"
  let newContent = content.replace(/className=(['"])text-[\w-]+ font-[\w-]+ text-gray-800( tracking-tight)?(['"])/g, 'className=$1page-title$3');
  
  // also handle specific h1 styles that might slightly differ (e.g., text-4xl or font-semibold)
  newContent = newContent.replace(/<h1 className=(['"])(?:text-[\w-]+ |font-[\w-]+ |text-gray-800 |tracking-tight |mb-\d+ |text-gray-900 )*(['"])>/g, '<h1 className=$1page-title$2>');
  
  // Replace subtitles
  newContent = newContent.replace(/<p className=(['"])text-gray-500 mt-\d font-medium italic(?: flex items-center gap-2)?(['"])/g, '<p className=$1page-subtitle$2');
  
  // Replace section titles
  newContent = newContent.replace(/<h2 className=(['"])(?:text-[\w-]+ |font-[\w-]+ |text-gray-800 |tracking-tight |mb-\d+ |text-gray-900 |flex items-center gap-\d+ )*(['"])>/g, '<h2 className=$1section-title$2>');
  
  // Replace body text blocks (we can just replace general text-gray-500/600 that are common bodies, but be careful not to override layout specific ones, maybe skip generic body for script and do it if needed)
  return newContent;
}

const dir = path.join(__dirname, 'src', 'pages');

walk(dir, function(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = replaceClasses(content);
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});
