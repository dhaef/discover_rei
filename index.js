const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;
const app = express();
dotenv.config({ path: './config/config.env' });

const counties = require('./routes/counties');
const county = require('./routes/county');
const metro = require('./routes/metro');
const totals = require('./routes/totals');
const user_input = require('./routes/user-input');

app.use(bodyParser.json());
// app.use(
//     bodyParser.urlencoded({
//         extended: true,
//     })
// );

app.use('/counties', counties);
app.use('/county', county);
app.use('/metro', metro);
app.use('/totals', totals);
app.use('/user', user_input);

app.listen(port, () => console.log(port));