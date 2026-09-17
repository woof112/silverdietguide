const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-245d0dc833184e4b80107b712fb69775'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
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

app.listen(3000, () => console.log('已啟動：http://localhost:3000'));