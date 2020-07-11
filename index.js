const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
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

app.use('/api/counties', counties);
app.use('/api/county', county);
app.use('/api/metro', metro);
app.use('/api/totals', totals);
app.use('/api/user', user_input);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(port, () => console.log(port));