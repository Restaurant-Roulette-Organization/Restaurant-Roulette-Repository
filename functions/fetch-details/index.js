const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  const alias = event.queryStringParameters.alias;
  try {
    const resp = await fetch(`https://api.yelp.com/v3/businesses/${alias}`, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });
    const data = await resp.json();
    const json = JSON.stringify(data);

    return {
      statusCode: 200,
      body: json,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Fetching data failed' }),
    };
  }
};

module.exports = { handler };
