const Carta = require('./classeCartes.js');

class Joc{

    constructor(){;
        this.cartesDisponibles = this.getLlistaCartes();
        this.cartesJugador1 = this.repartirCartes();
        this.cartesJugador2 = this.repartirCartes();
        this.puntuacioJugador1 = 0;
        this.puntuacioJugador2 = 0;
    }

    getLlistaCartes(){
        let llistaCartes = [];

        let map = {
            1 : "Diamant",
            2 : "Cor",
            3 : "Pica",
            4 : "Trebol",
        }

        for(let i = 1; i < 11; i++){
            for(let a = 1; a < 5; a++){
                llistaCartes.push(new Carta(i, map[a], true));
            }
        }

        return llistaCartes;
    }

    repartirCartes(){
        let cartas = [];

        for(let i = 0; i < 5; i++){
            let r = Math.floor(Math.random() * this.cartesDisponibles.length);
            cartas.push(this.cartesDisponibles[r]);
            this.cartesDisponibles.splice(r, 1);
        }

        return cartas;
    }
}

module.exports = Joc;