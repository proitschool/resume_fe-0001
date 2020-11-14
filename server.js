const app = require('./src/app.js');
const port = 3000;

app.listen(process.env.PORT || port, '0.0.0.0', () => {
	console.log(`App started on port: ${port}`);
})

