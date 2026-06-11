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

function fixH3(content) {
  return content.replace(/<h3 className="page-title"/g, '<h3 className="card-title"');
}

const dir = path.join(__dirname, 'src', 'pages');

walk(dir, function(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = fixH3(content);
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Fixed h3 in ${filePath}`);
  }
});
