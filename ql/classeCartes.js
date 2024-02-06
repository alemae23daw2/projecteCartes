class Carta {
    constructor(numero, pal, disp) {
      this.numero = numero;
      this.pal = pal;
      this.disp = disp;
    }
  
    toString() {
      return `<br>Carta: ${this.numero} de ${this.pal}`;
    }
  }
  
  module.exports = Carta;
  