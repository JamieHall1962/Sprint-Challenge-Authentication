//https://github.com/JamieHall1962/Sprint-Challenge-Authentication/pull/1


require('dotenv').config(); // load .env variables

const server = require('./api/server.js');

const port = process.env.PORT || 3300;
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
