const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walk(dirPath, callback);
    } else if (dirPath.endsWith('.tsx')) {
      callback(path.join(dirPath));
    }
  });
}

function fixClasses(content) {
  let lines = content.split('\n');
  let newLines = lines.map(line => {
    // If it has page-title but isn't h1
    if (line.includes('page-title') && !line.includes('<h1')) {
      if (line.includes('<h2')) {
        return line.replace('page-title', 'section-title');
      } else if (line.includes('<h3') || line.includes('<h4') || line.includes('<h5')) {
        return line.replace('page-title', 'card-title');
      } else if (line.includes('<p') || line.includes('<span') || line.includes('className="page-title"')) {
        return line.replace('page-title', 'text-xl font-normal text-gray-700');
      }
    }
    
    // Fix hardcoded "text-2xl font-medium text-gray-800"
    if (line.includes('text-2xl font-medium text-gray-800')) {
        return line.replace('text-2xl font-medium text-gray-800', 'section-title');
    }
    return line;
  });
  return newLines.join('\n');
}

const dir = path.join(__dirname, 'src', 'pages');

walk(dir, function(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = fixClasses(content);
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Fixed ${filePath}`);
  }
});
