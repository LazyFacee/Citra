// Membangun index.html mandiri: src/app.html + JSZip yang disisipkan (inline).
// Pakai:  npm ci && npm run build
// Opsional: SITE_URL=https://nama.vercel.app npm run build   (mengisi og:url / og:image)
import { readFileSync, writeFileSync } from 'node:fs';
const zip = readFileSync(new URL('./node_modules/jszip/dist/jszip.min.js', import.meta.url), 'utf8').replaceAll('</script', '<\\/script');
let html = readFileSync(new URL('./src/app.html', import.meta.url), 'utf8').replace('<!--LIBS-->', () => '<script>' + zip + '</script>\n');
html = html.replaceAll('\uFFFD', '\\ufffd');
const site = (process.env.SITE_URL || '').replace(/\/+$/, '');
if (site) html = html.replaceAll('https://ALAMAT-SITUSMU/', site + '/');
writeFileSync(new URL('./index.html', import.meta.url), html);
console.log(`index.html dibangun (${(html.length / 1024).toFixed(0)} KB)` + (site ? ` untuk ${site}` : ''));
