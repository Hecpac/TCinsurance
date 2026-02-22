import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../src/data/blogPosts.ts');

async function fetchNews() {
  console.log('🕵️‍♂️  Agente Research: Buscando noticias recientes sobre seguros en Texas...');
  const url = "https://news.google.com/rss/search?q=seguros+salud+texas+OR+seguros+vida+texas&hl=es-419&gl=US&ceid=US:es-419";
  
  const response = await fetch(url);
  const text = await response.text();
  
  // Regex parsing for RSS items
  const items = text.match(/<item>([\s\S]*?)<\/item>/g) || [];
  const newsPosts = [];
  
  for (const item of items.slice(0, 5)) { // Get top 5 news
    const titleMatch = item.match(/<title>([^<]+)<\/title>/);
    let linkMatch = item.match(/<link>([^<]+)<\/link>/);
    const pubDateMatch = item.match(/<pubDate>([^<]+)<\/pubDate>/);
    const sourceMatch = item.match(/<source[^>]*>([^<]+)<\/source>/);
    
    if (titleMatch && linkMatch && pubDateMatch) {
      const title = titleMatch[1].replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
      const link = linkMatch[1];
      const pubDate = new Date(pubDateMatch[1]);
      const source = sourceMatch ? sourceMatch[1] : 'Agente Research';
      
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '').substring(0, 60);
      const formattedDate = pubDate.toISOString().split('T')[0];
      
      newsPosts.push({
        slug,
        title,
        excerpt: `Últimas noticias: ${title}. Haz clic para leer más sobre este desarrollo importante para el mercado de seguros en Texas.`,
        category: "NOTICIAS",
        publishedAt: formattedDate,
        readTime: "2 MIN",
        author: source,
        status: "active",
        featuredImage: "/blog/News Paper.jpeg",
        content: [
          `### Reporte automatizado por nuestro Agente Research`,
          `Esta es una noticia en desarrollo capturada por nuestro sistema de monitoreo en tiempo real sobre el mercado de seguros en Texas.`,
          `**Fuente:** ${source}`,
          `**Fecha de publicación:** ${pubDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
          `> [**Lee la noticia completa en su fuente original haciendo clic aquí**](${link})`
        ]
      });
    }
  }
  
  return newsPosts;
}

async function updateBlogPosts(newsPosts) {
  console.log('📝  Agente Research: Actualizando el archivo de blogPosts.ts...');
  
  let currentFile = await fs.readFile(DATA_FILE, 'utf-8');
  
  // Check if we already have these news to avoid duplicates
  const existingSlugs = new Set();
  const slugRegex = /slug:\s*"([^"]+)"/g;
  let match;
  while ((match = slugRegex.exec(currentFile)) !== null) {
    existingSlugs.add(match[1]);
  }
  
  const newPostsToInsert = newsPosts.filter(post => !existingSlugs.has(post.slug));
  
  if (newPostsToInsert.length === 0) {
    console.log('✅  Agente Research: No hay noticias nuevas para agregar hoy.');
    return;
  }
  
  // Format the objects into string representations
  const postsStringArray = newPostsToInsert.map(post => {
    return '  {\n' +
    '    slug: "' + post.slug + '",\n' +
    '    title: ' + JSON.stringify(post.title) + ',\n' +
    '    excerpt: ' + JSON.stringify(post.excerpt) + ',\n' +
    '    category: "' + post.category + '",\n' +
    '    publishedAt: "' + post.publishedAt + '",\n' +
    '    readTime: "' + post.readTime + '",\n' +
    '    author: "' + post.author + '",\n' +
    '    status: "' + post.status + '",\n' +
    (post.featuredImage ? '    featuredImage: "' + post.featuredImage + '",\n' : '') +
    '    content: [\n' +
    '      ' + post.content.map(c => JSON.stringify(c)).join(',\n      ') + '\n' +
    '    ],\n' +
    '  },';
  });
  
  const postsString = postsStringArray.join('\n');
  
  // Insert at the beginning of the blogPosts array
  const arrayStartMarker = 'export const blogPosts: BlogPost[] = [';
  currentFile = currentFile.replace(arrayStartMarker, arrayStartMarker + '\n' + postsString);
  
  await fs.writeFile(DATA_FILE, currentFile, 'utf-8');
  console.log(`✅  Agente Research: ¡Se han agregado ${newPostsToInsert.length} nuevas noticias al blog!`);
}

async function main() {
  try {
    const news = await fetchNews();
    await updateBlogPosts(news);
  } catch (error) {
    console.error('❌  Agente Research: Error al buscar noticias:', error);
  }
}

main();
