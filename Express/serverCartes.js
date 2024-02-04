import { Joc } from "./classeJoc.js";

var express = require('express');
var app = express();
app.use(express.static('public'));

//-----------------------------------------//

let llistaPartides = [];

//-----------------------------------------//

app.post('/crearSala', function (req, res) {
    llistaPartides.push(new Joc());
    res.json({codiPartida : llistaPartides.length});
});

app.get('/veureCartes', function (req, res) {
    let idSala = req.query.idSala;
    let nJugador = req.query.nJugador;
    if(nJugador == 1){
        res.json({missatge : llistaPartides[idSala - 1].cartesJugador1});
    }else if(nJugador == 2){
        res.json({missatge : llistaPartides[idSala - 1].cartesJugador2});
    }else{
        res.json({missatge : "Error. No s'ha trobat el jugador"});
    }
    
});

app.get('/demanarCarta', function (req, res) {
    let idSala = req.query.idSala;
    let nJugador = req.query.nJugador;
    let numeroDesitjat = req.query.numeroDesitjat;

    if(nJugador == 1){
        let nCartes = 0;
        for(let i of llistaPartides[idSala - 1].cartesJugador2){
            if(i.numero == numeroDesitjat){
                let a = llistaPartides[idSala - 1].cartesJugador2.indexOf(i);
                llistaPartides[idSala - 1].cartesJugador1.push(i);
                llistaPartides[idSala - 1].cartesJugador2.splice(a, 1);
                nCartes++;
            }
        }
        if(nCartes == 0){
            let r = Math.floor(Math.random() * llistaPartides[idSala - 1].cartesDisponibles.length);
            llistaPartides[idSala - 1].cartesJugador1.push(llistaPartides[idSala - 1].cartesDisponibles[r]);
            llistaPartides[idSala - 1].cartesDisponibles.splice(r, 1);
            res.json({missatge : "L'altre jugador no te ningun " + numeroDesitjat});
        }else{
            res.json({missatge : "Has robat " + nCartes + " cartes!"});
        }
    }else if(nJugador == 2){
        let nCartes = 0;
        for(let i of llistaPartides[idSala - 1].cartesJugador1){
            if(i.numero == numeroDesitjat){
                let a = llistaPartides[idSala - 1].cartesJugador1.indexOf(i);
                llistaPartides[idSala - 1].cartesJugador2.push(i);
                llistaPartides[idSala - 1].cartesJugador1.splice(a, 1);
                nCartes++;
            }
        }
        if(nCartes == 0){
            let r = Math.floor(Math.random() * llistaPartides[idSala - 1].cartesDisponibles.length);
            llistaPartides[idSala - 1].cartesJugador2.push(llistaPartides[idSala - 1].cartesDisponibles[r]);
            llistaPartides[idSala - 1].cartesDisponibles.splice(r, 1);
            res.json({missatge : "L'altre jugador no te ningun " + numeroDesitjat});
        }else{
            res.json({missatge : "Has robat " + nCartes + " cartes!"});
        }
    }else{
        res.json({missatge : "Error. No s'ha trobat el jugador"});
    }    
});

app.put('/descartarCartes', function (req, res) {
    let idSala = req.query.idSala;
    let nJugador = req.query.nJugador;
    let numeroDescartar = req.query.numeroDescartar;

    if(nJugador == 1){
        let cartesABorrar = 0;
        let auxArr = [];
        for(let i of ArrayJocs[idSala - 1].cartesJugador1){
            if(i.numero == numeroDescartar){
                let a = ArrayJocs[idSala - 1].cartesJugador1.indexOf(i);
                auxArr.push(i);
                ArrayJocs[idSala - 1].cartesJugador1.splice(a, 1);
                cartesABorrar++;
            }
        }
        if(cartesABorrar == 4){
            auxArr.length = 0;
            ArrayJocs[idSala - 1].puntuacioJugador1++;
            res.json({missatge : "Has descartat les cartes del numero " + numeroDescartar + ", has guanyat un punt!"});
        }else{
            ArrayJocs[idSala - 1].cartesJugador1.concat(auxArr);
        }
    }else if(nJugador == 2){
        let cartesABorrar = 0;
        let auxArr = [];
        for(let i of ArrayJocs[idSala - 1].cartesJugador2){
            if(i.numero == numeroDescartar){
                let a = ArrayJocs[idSala - 1].cartesJugador2.indexOf(i);
                auxArr.push(i);
                ArrayJocs[idSala - 1].cartesJugador2.splice(a, 1);
                cartesABorrar++;
            }
        }
        if(cartesABorrar == 4){
            auxArr.length = 0;
            ArrayJocs[idSala - 1].puntuacioJugador2++;
            res.json({missatge : "Has descartat les cartes del numero " + numeroDescartar + ", has guanyat un punt!"});
        }else{
            ArrayJocs[idSala - 1].cartesJugador2.concat(auxArr);
        }
    }else{
        res.json({missatge : "Error. No s'ha trobat el jugador"});
    }    
});

app.delete('/acabarJoc', function (req, res) {
    let idSala = req.query.idSala;

    ArrayJocs[idSala - 1] = 0;
    res.json({missatge : "Partida amb codi " +  idSala +  " acabada!"});
});

app.listen(3000, function () {
    console.log('Servidor escoltant port 3000');
})