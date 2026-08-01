const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'input.txt');
const dataFile = path.join(__dirname, 'src/data/blog-data.json');

const raw = fs.readFileSync(inputFile, 'utf-8');
const lines = raw.split('\n').map(l => l.trimEnd());

function getField(name, lines) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(name + ':')) {
      const value = lines[i].slice(name.length + 1).trim();
      const content = [];
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].includes(':') && !lines[j].startsWith('#') && !lines[j].startsWith('-') && !lines[j].startsWith('>') && j > i + 1) {
          if (/^[А-ЯЁA-Z]/.test(lines[j]) && lines[j].length < 80 && !lines[j].includes('http')) break;
        }
        content.push(lines[j]);
      }
      return value ? value + '\n' + content.join('\n').trim() : content.join('\n').trim();
    }
  }
  return '';
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const title = getField('Название', lines).split('\n')[0].trim();
const slug = (getField('Slug', lines) || slugify(title)).split('\n')[0].trim();
const content = getField('Текст', lines);
const excerpt = getField('Выдержка', lines) || content.slice(0, 200) + '...';
const categoryName = (getField('Категория', lines) || 'Советы фермерам').split('\n')[0].trim();
const tagsStr = getField('Теги', lines);
const tags = tagsStr ? tagsStr.split(',').map(t => {
  const name = t.trim();
  const id = 'tag-' + slugify(name);
  return { id, name, slug: slugify(name) };
}) : [];
const catSlug = slugify(categoryName);
const catId = 'cat-' + catSlug;

const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
const posts = data.posts || [];

const maxNum = posts.reduce((max, p) => {
  const n = parseInt((p.id || '').replace('post-', ''));
  return n > max ? n : max;
}, 0);
const newId = 'post-' + (maxNum + 1);
const now = new Date().toISOString();

const newPost = {
  id: newId,
  title: title,
  slug: slug,
  content: content,
  excerpt: excerpt,
  coverImage: '/blog/article-' + (maxNum + 1) + '.jpg',
  published: true,
  createdAt: now,
  updatedAt: now,
  views: 0,
  category: { id: catId, name: categoryName, slug: catSlug },
  tags: tags,
  author: { name: 'AgroDir' }
};

posts.push(newPost);
data.posts = posts;
fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');

console.log('OK: added ' + newId + ' - ' + title);
console.log('Slug: ' + slug);
console.log('Category: ' + categoryName);
console.log('Tags: ' + tags.map(t => t.name).join(', '));