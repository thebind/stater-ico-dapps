module.exports = verifyHtml => {
  return `
  <html>
    <body>
      <p>Hello</p>
      <p>Thankyou for registeration!</p>
      <p>Please verifty your email cliking following url:</p>
      http://localhost:3000/verify/${verifyHtml.local.secretToken}
      <br />
    </body>
  </html>
  `;
};
