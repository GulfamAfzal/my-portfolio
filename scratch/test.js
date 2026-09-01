const https = require('https');
const fs = require('fs');
const key = fs.readFileSync('.env.local', 'utf8').split('"')[1];

https.get('https://generativelanguage.googleapis.com/v1beta/models?key=' + key, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const json = JSON.parse(data);
    if (json.models) {
      console.log(json.models.map(m => m.name).join('\n'));
    } else {
      console.log('Error:', json);
    }
  });
});
