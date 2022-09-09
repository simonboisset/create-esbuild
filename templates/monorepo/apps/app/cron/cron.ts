import { schedule } from '@netlify/functions';
export const handler = schedule('@hourly', async function (event) {
  return {
    statusCode: 200,
  };
});
