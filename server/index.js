require('./config');
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const server = express();

// middleware de json
server.use(cors({
  exposedHeaders: ['Authorization']
}));
server.use(express.json());

server.use(require('./routes'));
server.use('/public', express.static(`${__dirname}/public`));

server.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});

