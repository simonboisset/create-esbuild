export const loader = () => {
  const robotText = `
        User-agent: Googlebot

        User-agent: *
        Allow: /
    
        Sitemap: https://my-url/sitemap.xml
        `;

  return new Response(robotText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
