import fs from 'fs';

async function test() {
  const envFile = fs.readFileSync('.env.production', 'utf8');
  const apiKeyLine = envFile.split('\n').find(line => line.startsWith('GEMINI_API_KEY='));
  if (!apiKeyLine) return console.log('No API key found');
  const key = apiKeyLine.split('=')[1].replace(/"/g, '').trim();

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
  const data = await res.json();
  const validModels = data.models.filter(m => m.supportedGenerationMethods.includes('generateContent') && m.name.includes('gemini'));
  console.log(validModels.map(m => m.name));
}

test();
