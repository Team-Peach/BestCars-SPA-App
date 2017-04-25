const express = require('express');

let port = 3000; // process.env.PORT || 

let redirectToHomePage = function (req, res) {
	require('fs').readFile('./public/index.html', 'utf8', function (err, text) {
		if (err) {
			console.log(err);
			return;
		}

		res.send(text);
	});
};

let app = express();

app.use(express.static('public'));
app.use('/libs', express.static('node_modules'));

app.get('', redirectToHomePage);
app.get('/', redirectToHomePage);
app.get('/#', redirectToHomePage);
app.get('/#/', redirectToHomePage);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));