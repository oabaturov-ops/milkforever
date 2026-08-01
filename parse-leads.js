const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const queries = [
  'молочная ферма',
  'молочное животноводство',
  'коровник',
  'доильное оборудование'
];

async function searchRusprofile(query) {
  console.log('\n--- Ищем: ' + query + ' ---');
  try {
    const url = 'https://www.rusprofile.ru/search?query=' + encodeURIComponent(query);
    const { data, status } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'ru-RU,ru;q=0.9'
      },
      timeout: 15000
    });
    if (status === 403) {
      console.log('Заблокировано антиботом');
      return [];
    }
    const $ = cheerio.load(data);
    const results = [];
    $('.company-item, .search-result-item, [class*="company"]').each((i, el) => {
      const name = $(el).find('a, h3, h4, [class*="name"], [class*="title"]').first().text().trim();
      const inn = $(el).text().match(/ИНН\s*(\d{10}|\d{12})/);
      const region = $(el).find('[class*="region"], [class*="address"]').first().text().trim();
      if (name.length > 3) {
        results.push({ name, inn: inn ? inn[1] : '', region, source: query });
      }
    });
    console.log('Найдено элементов: ' + results.length);
    if (results.length === 0) {
      fs.writeFileSync('debug-page.html', data, 'utf-8');
      console.log('HTML сохранён в debug-page.html для анализа');
    }
    return results;
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      console.log('Таймаут - сайт не ответил за 15 сек');
    } else if (err.response && err.response.status === 403) {
      console.log('Заблокировано (403) - дальше научимся обходить');
    } else {
      console.log('Ошибка: ' + err.message);
    }
    return [];
  }
}

async function main() {
  console.log('=== Парсер rusprofile.ru ===');
  const allResults = [];
  for (const q of queries) {
    const results = await searchRusprofile(q);
    allResults.push(...results);
    await new Promise(r => setTimeout(r, 2000));
  }
  if (allResults.length > 0) {
    fs.writeFileSync('leads.json', JSON.stringify(allResults, null, 2), 'utf-8');
    console.log('\nИтого: ' + allResults.length + ' компаний');
    console.log('Сохранено в leads.json');
  }
  console.log('\nГотово!');
}

main();