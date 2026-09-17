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
        'Authorization': 'Bearer ${process.env.DEEPSEEK_API_KEY}'
      },
      body: JSON.stringify({
        model: 'deepseek-v4.1-flash',
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
