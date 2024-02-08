var fs = require('fs');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const Joc = require('./classeJoc.js');

const app = express();
app.use(express.static('public'));

let llistaPartides = [];
let contadorSalas = 1;

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

const schema = buildSchema(`
  type Query {
    llistaPartides: [Joc]
    crearSala: CartesResponse
    veureCartes(idSala: Int!, nJugador: Int!): CartesResponse
    descartarCartes(idSala: Int!, nJugador: Int!, numeroDescartar: Int!): CartesResponse
    acabarJoc(idSala: Int!, nJugador: Int!): CartesResponse
    demanarCarta(idSala: Int!, nJugador: Int!, numeroDesitjat: Int!): CartesResponse
  }

  type Joc {
    cartesDisponibles: [Carta]
    cartesJugador1: [Carta]
    cartesJugador2: [Carta]
  }

  type Carta {
    numero: Int
    pal: String
    disp: Boolean
  }

  type CartesResponse {
    missatge: String
  }
`);


const root = {
  llistaPartides: () => llistaPartides,
  crearSala: () => {
    llistaPartides.push(new Joc());
    return { missatge: "El codi de la nova partida es: " + llistaPartides.length };
  },

  veureCartes: ({ idSala, nJugador }) => {
    try {
      if (nJugador === 1) {
        return { missatge: llistaPartides[idSala - 1].cartesJugador1.toString() };
      } else if (nJugador === 2) {
        return { missatge: llistaPartides[idSala - 1].cartesJugador2.toString() };
      } else {
        return { missatge: "Error. No s'ha trobat el jugador" };
      }
    } catch (error) {
      return { missatge: "Error. No s'ha trobat la partida o el jugador" };
    }
  },
  
  descartarCartes: ({ idSala, nJugador, numeroDescartar }) => {
      try {
        if (nJugador === 1) {
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
            return { missatge: `Has descartat las cartas del número ${numeroDescartar}, has ganado un punto!` };
          } else {
            llistaPartides[idSala - 1].cartesJugador1 = llistaPartides[idSala - 1].cartesJugador1.concat(auxArr);
            return { missatge: `No tens cartes suficients de ${numeroDescartar}.` };
          }
        } else if (nJugador === 2) {
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
            return { missatge: `Has descartat las cartas del número ${numeroDescartar}, has ganado un punto!` };
          } else {
            llistaPartides[idSala - 1].cartesJugador2 = llistaPartides[idSala - 1].cartesJugador2.concat(auxArr);
            return { missatge: `No tens cartes suficients de ${numeroDescartar}.` };
          }
        } else {
          return { missatge: "Error. No se ha encontrado el jugador" };
        }
      } catch (error) {
        return { missatge: "Error. No se ha encontrado la partida o el jugador" };
      }
    },

  demanarCarta: ({ idSala, nJugador, numeroDesitjat }) => {
    try {
      if (nJugador === 1) {
        let nCartes = 0;
        for (let i of llistaPartides[idSala - 1].cartesJugador2) {
          if (i.numero === numeroDesitjat) {
            let a = llistaPartides[idSala - 1].cartesJugador2.indexOf(i);
            llistaPartides[idSala - 1].cartesJugador1.push(i);
            llistaPartides[idSala - 1].cartesJugador2.splice(a, 1);
            nCartes++;
          }
        }
        if (nCartes === 0) {
          let r = Math.floor(Math.random() * llistaPartides[idSala - 1].cartesDisponibles.length);
          llistaPartides[idSala - 1].cartesJugador1.push(llistaPartides[idSala - 1].cartesDisponibles[r]);
          llistaPartides[idSala - 1].cartesDisponibles.splice(r, 1);
          return { missatge: `L'altre jugador no té cap ${numeroDesitjat}` };
        } else {
          return { missatge: `Has robat ${nCartes} cartes!` };
        }
      } else if (nJugador === 2) {
        let nCartes = 0;
        for (let i of llistaPartides[idSala - 1].cartesJugador1) {
          if (i.numero === numeroDesitjat) {
            let a = llistaPartides[idSala - 1].cartesJugador1.indexOf(i);
            llistaPartides[idSala - 1].cartesJugador2.push(i);
            llistaPartides[idSala - 1].cartesJugador1.splice(a, 1);
            nCartes++;
          }
        }
        if (nCartes === 0) {
          let r = Math.floor(Math.random() * llistaPartides[idSala - 1].cartesDisponibles.length);
          llistaPartides[idSala - 1].cartesJugador2.push(llistaPartides[idSala - 1].cartesDisponibles[r]);
          llistaPartides[idSala - 1].cartesDisponibles.splice(r, 1);
          return { missatge: `L'altre jugador no té cap ${numeroDesitjat}` };
        } else {
          return { missatge: `Has robat ${nCartes} cartes!` };
        }
      } else {
        return { missatge: "Error. No s'ha trobat el jugador" };
      }
    } catch (error) {
      return { missatge: "Error. No s'ha trobat la partida o el jugador" };
    }
  },

acabarJoc: ({ idSala, nJugador }) => {
  try {

  llistaPartides[idSala - 1] = null;

  return { missatge: `El jugador ${nJugador} ha acabado la partida ${idSala}!` };
  } catch (error) {
  return { missatge: "Error. No s'ha trobat la partida o el jugador" };
  }
}
};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor GraphQL corriendo en http://localhost:${port}/graphql`);
});
