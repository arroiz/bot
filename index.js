const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const fn = async (size = '39,5') => {
  const { data } = await axios({
    method: 'GET',
    url: 'https://www.nike.com.br/tenis-nike-air-force-1-07-masculino-011137.html?cor=51',
  });

  const $ = cheerio.load(data);

  return !$(`input[data-testid="product-size-${size}"]`).attr('disabled');
};

const app = express();

app.get('/', async (req, res) => {
  const { size } = req.query;

  const isAvailable = await fn(size);

  res.send(`O tenis ${isAvailable ? 'está' : 'não está'} disponivel`);
});

app.listen(5000, () => {
  console.log('Running on port 5000.');
});
