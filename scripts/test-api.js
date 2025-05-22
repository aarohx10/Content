const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testApiKey(apiKey, keyName) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent('Test connection');
    console.log(`✅ ${keyName} is working`);
    return true;
  } catch (error) {
    console.error(`❌ ${keyName} failed:`, error.message);
    return false;
  }
}

async function testAllKeys() {
  const keys = {
    'Primary Key': process.env.GOOGLE_API_KEY,
    'Fallback Key 1': process.env.GOOGLE_API_KEY_1,
    'Fallback Key 2': process.env.GOOGLE_API_KEY_2,
    'Fallback Key 3': process.env.GOOGLE_API_KEY_3,
    'Fallback Key 4': process.env.GOOGLE_API_KEY_4,
  };

  console.log('Testing API Keys...\n');
  
  const results = await Promise.all(
    Object.entries(keys).map(([name, key]) => testApiKey(key, name))
  );

  const workingKeys = results.filter(Boolean).length;
  console.log(`\n${workingKeys} out of ${Object.keys(keys).length} keys are working`);

  if (workingKeys === 0) {
    console.error('\n❌ No working API keys found. Please check your configuration.');
    process.exit(1);
  } else if (workingKeys < Object.keys(keys).length) {
    console.warn('\n⚠️ Some API keys are not working. Consider fixing them for better reliability.');
  } else {
    console.log('\n✅ All API keys are working!');
  }
}

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Run tests
testAllKeys().catch(console.error); 