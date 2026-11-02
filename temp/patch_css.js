const fs = require('fs');
let css = fs.readFileSync('src/styles/game-world.css', 'utf8');
const lines = css.split('\n');
let startIdx = -1;
let endIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('.chapter-banner-mode')) {
    startIdx = i;
    // Find the closing brace
    for (let j = i; j < lines.length; j++) {
      if (lines[j].trim() === '}' && j > i) {
        endIdx = j;
        break;
      }
    }
    break;
  }
}
if (startIdx >= 0 && endIdx >= 0) {
  const before = lines.slice(0, startIdx).join('\n');
  const after = lines.slice(endIdx + 1).join('\n');
  const newSection = '.section-head-visual { margin-top: 16px; margin-bottom: 24px; height: 40px; display: flex; align-items: center; justify-content: center; }';
  const newCss = before + '.chapter-banner-mode {\n  grid-column: 1 / -1;\n  color: #a7b5b4;\n  font-size: 0.49rem;\n  letter-spacing: 0.14em;\n}\n\n.section-head-visual {\n  margin-top: 16px;\n  margin-bottom: 24px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}' + '\n\n' + after;
  fs.writeFileSync('src/styles/game-world.css', newCss);
  console.log('CSS updated successfully');
} else {
  console.log('Could not find chapter-banner-mode section');
  console.log('startIdx:', startIdx, 'endIdx:', endIdx);
}