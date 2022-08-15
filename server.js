const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/pfe-front-reworked'));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname +
        '/dist/pfe-front-reworked/index.html'));
});
app.listen(process.env.PORT || 4200 );