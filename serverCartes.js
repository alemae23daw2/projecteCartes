var express = require('express');
var app = express();
app.use(express.static('public'));

app.post('/iniciarJoc/:codiPartida', function (req, res) {
    res.send('Hola Món!');
});



app.listen(3000, function () {
    console.log('Servidor escoltant port 3000');
})