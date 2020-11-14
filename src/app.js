const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

const STATIC_ROOT_PATH = path.join(__dirname, '..', 'static');

app.use('/static', express.static(STATIC_ROOT_PATH));
app.use(cookieParser());

app.get('/', (req, res) => {
	let local = req.cookies.local;
	if (!local) {
		local = 'en';
		res.cookie('local', local);
	}
	res.sendFile(`${local}.html`, {root: STATIC_ROOT_PATH});
});

module.exports = app;
