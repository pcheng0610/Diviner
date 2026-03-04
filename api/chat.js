module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
  }

  let body = {};
  if (raw) {
    try {
      body = JSON.parse(raw);
    } catch (err) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      return;
    }
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const temperature = body.temperature ?? 0.7;
  const maxTokens = body.max_tokens;
  const topP = body.top_p;

  // Prefer local Ollama if configured (for local debugging)
  const ollamaBase = process.env.OLLAMA_BASE_URL;
  if (ollamaBase) {
    const model = process.env.OLLAMA_MODEL || 'llama3.1';
    const options = {};
    if (temperature != null) options.temperature = temperature;
    if (topP != null) options.top_p = topP;

    try {
      const resp = await fetch(`${ollamaBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages,
          stream: false,
          options,
        }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        res.statusCode = resp.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
        return;
      }

      const content = data?.message?.content || '';
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        choices: [{ message: { role: 'assistant', content } }],
      }));
      return;
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
  }

  // Default to Hugging Face (for production)
  const hfToken = process.env.HF_TOKEN;
  if (!hfToken) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'HF_TOKEN not set' }));
    return;
  }

  const hfModel = process.env.HF_MODEL || body.model || 'meta-llama/Llama-3.1-8B-Instruct';
  const payload = {
    model: hfModel,
    messages,
    temperature,
  };
  if (maxTokens != null) payload.max_tokens = maxTokens;
  if (topP != null) payload.top_p = topP;

  try {
    const resp = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hfToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.text();
    res.statusCode = resp.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err.message }));
  }
};
