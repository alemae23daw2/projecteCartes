export class Carta{

    constructor(numero, pal, disp){
        this.numero = numero;
        this.pal = pal;
        this.disp = disp;
    }

    isDisp(){
        return this.disp;
    }

    setDisp(disp){
        this.disp = disp;
    }

    getnumero(){
        return this.numero;
    }

    getPal(){
        return this.pal;
    }

    toString(){
        return `\nCarta{\n numero: ${this.numero}, \n pal: ${this.pal}, \n disp: ${this.disp}}`;
    }

    repartirCartes(Jugador){
        
    }

}