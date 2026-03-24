const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/musny/Desktop/Hashnate/beyond3k_2';

const files = ['index.html', 'about.html', 'contact.html', 'services.html', 'general-construction.html', 'facility-maintenance.html'];

files.forEach(file => {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');

  // Replace footer
  content = content.replace(/<div class="container" style="margin-top: 120px; border-top: 1px solid var\(--border-color\); padding-top: 24px; color: var\(--text-muted\); font-size: 0\.875rem; display: flex; justify-content: space-between;">/g, '<div class="container footer-bottom">');

  // Replace massive section paddings with variables
  content = content.replace(/padding-top: 250px; padding-bottom: 120px;/g, 'padding-top: var(--space-20x); padding-bottom: var(--space-10x);');
  content = content.replace(/padding-top: 200px; padding-bottom: 100px;/g, 'padding-top: var(--space-20x); padding-bottom: var(--space-10x);');
  content = content.replace(/padding-top: 200px; padding-bottom: 0;/g, 'padding-top: var(--space-20x); padding-bottom: 0;');
  content = content.replace(/padding-top: 160px;/g, 'padding-top: var(--space-20x);');

  // Replace margin strings
  const replacements = [
    [/margin-top: 150px;/g, 'margin-top: var(--space-10x);'],
    [/margin-top: 120px;/g, 'margin-top: var(--space-10x);'],
    [/margin-top: 100px;/g, 'margin-top: var(--space-10x);'],
    [/margin-bottom: 120px;/g, 'margin-bottom: var(--space-10x);'],
    [/margin-bottom: 80px;/g, 'margin-bottom: var(--space-10x);'],
    [/margin-bottom: 60px;/g, 'margin-bottom: var(--space-10x);'],
    [/margin-top: 60px;/g, 'margin-top: var(--space-10x);'],
    
    // medium gaps
    [/margin-top: 48px;/g, 'margin-top: var(--space-6x);'],
    [/margin-top: 40px;/g, 'margin-top: var(--space-6x);'],
    [/margin-bottom: 40px;/g, 'margin-bottom: var(--space-6x);'],
    
    // small gaps
    [/margin-bottom: 24px;/g, 'margin-bottom: var(--space-3x);'],
    [/margin-bottom: 16px;/g, 'margin-bottom: var(--space-3x);'],
  ];

  for (const [regex, replacement] of replacements) {
    content = content.replace(regex, replacement);
  }

  // In some files, there's multiple spaces or slight variations:
  // e.g. `margin-top: 60px; max-width: 600px;` -> safely replacing just the rule
  fs.writeFileSync(p, content, 'utf8');
});

console.log('Script completed.');
