const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const Joc = require('./classeJoc.js');

const app = express();
app.use(express.static('public'));

let llistaPartides = [];
let contadorSalas = 1; // Inicializamos el contador en 1

// Definir el esquema GraphQL
// Definir el esquema GraphQL
const schema = buildSchema(`
  type Query {
    llistaPartides: [Joc]
  }
  type Mutation {
    crearSala: Int
    demanarCarta(idSala: Int, nJugador: Int, numeroDesitjat: Int): String
    acabarJoc(idSala: Int, nJugador: Int): String
  }
  type Joc {
    id: Int
    cartesJugador1: [Carta]
    cartesJugador2: [Carta]
    puntuacioJugador1: Int
    puntuacioJugador2: Int
  }
  type Carta {
    numero: Int
    pal: String
    disp: Boolean
  }
`);


// Configurar resolvers
const root = {
  llistaPartides: () => llistaPartides,
  crearSala: () => {
    const nuevaSala = new Joc();
    nuevaSala.id = contadorSalas; // Asignamos el ID único a la nueva sala
    llistaPartides.push(nuevaSala);
    contadorSalas++; // Incrementamos el contador de salas para la próxima sala
    return nuevaSala.id; // Retornamos el ID de la nueva sala
  },
  
  demanarCarta: ({ idSala, nJugador, numeroDesitjat }) => {
    try {
      if (idSala <= 0 || idSala > llistaPartides.length) {
        throw new Error("Error: No se encontró la partida.");
      }
  
      let partida = llistaPartides[idSala - 1];
  
      if (nJugador !== 1 && nJugador !== 2) {
        throw new Error("Error: No se encontró el jugador.");
      }
  
      let jugador = nJugador === 1 ? partida.cartesJugador1 : partida.cartesJugador2;
      let cartesDisponibles = partida.cartesDisponibles;
  
      let cartaEncontrada = false;
  
      // Buscar la carta solicitada en las cartas disponibles
      for (let i = 0; i < cartesDisponibles.length; i++) {
        if (cartesDisponibles[i].numero === numeroDesitjat) {
          // Agregar la carta al jugador que la ha pedido
          jugador.push(cartesDisponibles[i]);
          cartesDisponibles.splice(i, 1);
          cartaEncontrada = true;
          break;
        }
      }
  
      if (cartaEncontrada) {
        return `¡El jugador ${nJugador} ha recibido la carta ${numeroDesitjat}!`;
      } else {
        return `El jugador ${nJugador} no pudo encontrar la carta ${numeroDesitjat}.`;
      }
    } catch (error) {
      return error.message;
    }
  },
  


    acabarJoc: ({ idSala, nJugador }) => {
        try {
        if (idSala <= 0 || idSala > llistaPartides.length) {
            throw new Error("Error: No se encontró la partida.");
        }

        // Finaliza la partida eliminándola de la lista de partidas
        llistaPartides[idSala - 1] = null;

        return `El jugador ${nJugador} ha acabado la partida ${idSala}!`;
        } catch (error) {
        return `Error: No se encontró la partida o el jugador.`;
        }
    }
};


// Configurar GraphQL en Express
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true // Habilita GraphiQL para probar consultas GraphQL en el navegador
}));

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor GraphQL corriendo en http://localhost:${port}/graphql`);
});
