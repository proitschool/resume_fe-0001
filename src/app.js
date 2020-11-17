const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

const STATIC_ROOT_PATH = path.join(__dirname, '..', 'static');
const DEFAULT_LOCAL = 'en';
const AVAILABLE_LOCALS = new Set(['en', 'ru']);

app.use('/static', express.static(STATIC_ROOT_PATH));
app.use(cookieParser());

app.get('/', (req, res) => {
	let local = req.cookies.local;
	if (!local || !AVAILABLE_LOCALS.has(local)) {
		local = DEFAULT_LOCAL;
		res.cookie('local', local);
	}
	res.sendFile(`${local}.html`, {root: STATIC_ROOT_PATH});
});

module.exports = app;
