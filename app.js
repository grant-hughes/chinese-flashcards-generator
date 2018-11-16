const express = require('express');
const path = require('path');
const indexRoutes = require('./routes/index');

const app = express();
const PORT = 5000;
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);

app.listen(PORT);
console.log('Listening on port ' + PORT + '...');
