const express = require('express');
const app = express();

const key = process.env.DEEPSEEK_API_KEY || '';
console.log('=== Key 调试 ===');
console.log('Key length:', key.length);
console.log('Key first 8:', key.slice(0, 8));
console.log('Key last 6:', key.slice(-6));
console.log('=== 调试结束 ===');

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-flash',
        messages: req.body.messages,
        temperature: req.body.temperature ?? 0.7
      })
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log(`已啟動：http://localhost:${port}`));
