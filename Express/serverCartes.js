const Joc = require("./classeJoc.js");
var fs = require('fs');

var express = require('express');
var app = express();
app.use(express.static('public'));


let llistaPartides = [];


app.get('/', function (req, res) {
    fs.readFile('Consumidor.html', (err, data) => {
        res.write(data);
        res.end();
    });
});

app.get('/Consumidor.js', function (req, res) {
    fs.readFile('Consumidor.js', (err, data) => {
        res.write(data);
        res.end();
    });
});

app.post('/crearSala', function (req, res) {
    llistaPartides.push(new Joc());
    res.json({ missatge: "El codi de la nova partida es: " + llistaPartides.length });
});

app.get('/veureCartes', function (req, res) {
    try {
        let idSala = req.query.idSala;
        let nJugador = req.query.nJugador;
        if (nJugador == 1) {
            res.json({ missatge: llistaPartides[idSala - 1].cartesJugador1.toString() });
        } else if (nJugador == 2) {
            res.json({ missatge: llistaPartides[idSala - 1].cartesJugador2.toString() });
        } else {
            res.json({ missatge: "Error. No s'ha trobat el jugador" });
        }
    } catch (error) {
        res.json({ missatge: "Error. No s'ha trobat la partida o el jugador" });
    }
});

app.get('/demanarCarta', function (req, res) {
    try {
        let idSala = req.query.idSala;
        let nJugador = req.query.nJugador;
        let numeroDesitjat = req.query.numeroDesitjat;

        if (nJugador == 1) {
            let nCartes = 0;
            for (let i of llistaPartides[idSala - 1].cartesJugador2) {
                if (i.numero == numeroDesitjat) {
                    let a = llistaPartides[idSala - 1].cartesJugador2.indexOf(i);
                    llistaPartides[idSala - 1].cartesJugador1.push(i);
                    llistaPartides[idSala - 1].cartesJugador2.splice(a, 1);
                    nCartes++;
                }
            }
            if (nCartes == 0) {
                let r = Math.floor(Math.random() * llistaPartides[idSala - 1].cartesDisponibles.length);
                llistaPartides[idSala - 1].cartesJugador1.push(llistaPartides[idSala - 1].cartesDisponibles[r]);
                llistaPartides[idSala - 1].cartesDisponibles.splice(r, 1);
                res.json({ missatge: "L'altre jugador no te ningun " + numeroDesitjat });
            } else {
                res.json({ missatge: "Has robat " + nCartes + " cartes!" });
            }
        } else if (nJugador == 2) {
            let nCartes = 0;
            for (let i of llistaPartides[idSala - 1].cartesJugador1) {
                if (i.numero == numeroDesitjat) {
                    let a = llistaPartides[idSala - 1].cartesJugador1.indexOf(i);
                    llistaPartides[idSala - 1].cartesJugador2.push(i);
                    llistaPartides[idSala - 1].cartesJugador1.splice(a, 1);
                    nCartes++;
                }
            }
            if (nCartes == 0) {
                let r = Math.floor(Math.random() * llistaPartides[idSala - 1].cartesDisponibles.length);
                llistaPartides[idSala - 1].cartesJugador2.push(llistaPartides[idSala - 1].cartesDisponibles[r]);
                llistaPartides[idSala - 1].cartesDisponibles.splice(r, 1);
                res.json({ missatge: "L'altre jugador no te ningun " + numeroDesitjat });
            } else {
                res.json({ missatge: "Has robat " + nCartes + " cartes!" });
            }
        } else {
            res.json({ missatge: "Error. No s'ha trobat el jugador" });
        }
    } catch (error) {
        res.json({ missatge: "Error. No s'ha trobat la partida o el jugador" });
    }
});

app.put('/descartarCartes', function (req, res) {
    try {
        let idSala = req.query.idSala;
        let nJugador = req.query.nJugador;
        let numeroDescartar = req.query.numeroDescartar;

        if (nJugador == 1) {
            let cartesABorrar = 0;
            let auxArr = [];

            for (let i of llistaPartides[idSala - 1].cartesJugador1) {
                if (i.numero === numeroDescartar) {
                    let a = llistaPartides[idSala - 1].cartesJugador1.indexOf(i);
                    auxArr.push(i);
                    llistaPartides[idSala - 1].cartesJugador1.splice(a, 1);
                    cartesABorrar++;
                }
            }

            if (cartesABorrar === 4) {
                auxArr = null;
                res.json({ missatge: `Has descartat las cartas del número ${numeroDescartar}, has ganado un punto!` });
            } else {
                llistaPartides[idSala - 1].cartesJugador1 = llistaPartides[idSala - 1].cartesJugador1.concat(auxArr);
                res.json({ missatge: `No tens cartes suficients de ${numeroDescartar}.` });
            }
        } else if (nJugador == 2) {
            let cartesABorrar = 0;
            let auxArr = [];

            for (let i of llistaPartides[idSala - 1].cartesJugador2) {
                if (i.numero === numeroDescartar) {
                    let a = llistaPartides[idSala - 1].cartesJugador2.indexOf(i);
                    auxArr.push(i);
                    llistaPartides[idSala - 1].cartesJugador2.splice(a, 1);
                    cartesABorrar++;
                }
            }

            if (cartesABorrar === 4) {
                auxArr = null;
                res.json({ missatge: `Has descartat las cartas del número ${numeroDescartar}, has ganado un punto!` });
            } else {
                llistaPartides[idSala - 1].cartesJugador2 = llistaPartides[idSala - 1].cartesJugador2.concat(auxArr);
                res.json({ missatge: `No tens cartes suficients de ${numeroDescartar}.` });
            }
        } else {
            res.json({ missatge: "Error. No se ha encontrado el jugador" });
        }
    } catch (error) {
        res.json({ missatge: "Error. No se ha encontrado la partida o el jugador" });
    }
});

app.delete('/acabarJoc', function (req, res) {
    try {
        let idSala = req.query.idSala;
        let nJugador = req.query.nJugador;

        llistaPartides[idSala - 1] = null;
        res.json({ missatge: "El jugador " + nJugador + " ha acabat la partida " + idSala + "!" });
    } catch (error) {
        res.json({ missatge: "Error. No s'ha trobat la partida o el jugador" });
    }
});

app.listen(3000, function () {
    console.log('Servidor escoltant port 3000');
})