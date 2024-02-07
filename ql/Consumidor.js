window.onload = () => {

let terminal = document.querySelector(".terminal");

let botoCrearSala = document.querySelector(".crearSala");
let botoVeureCartes = document.querySelector(".veureCartes");
let botoDemanarCarta = document.querySelector(".demanarCarta");
let botoDescartarCartes = document.querySelector(".descartarCartes");
let botoAcabarJoc = document.querySelector(".acabarJoc");

botoCrearSala.addEventListener("click", () => {
    fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query {
                    crearSala {
                        missatge
                    }
                }
            `
        })
    })
    .then(response => response.json())
    .then(data => {
        terminal.innerHTML += `<p>${data.data.crearSala.missatge}</p>`;
    });
    actualitzarPantalla();
});

botoVeureCartes.addEventListener("click", () => {
    let codiSala = prompt("A quina sala vols fer el teu moviment?");
    let nJugador;
    if(localStorage.getItem("jugador")){
        nJugador = localStorage.getItem("jugador");
        console.log(nJugador);
    }else{
        nJugador = prompt("Quin jugador vols ser?");
        localStorage.setItem("jugador", nJugador);
        console.log(nJugador);
    }
    
    fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query {
                    verCartas(idSala: "${codiSala}", nJugador: "${nJugador}")
                }
            `
        })
    })
    .then(response => response.json())
    .then(data => {
        terminal.innerHTML += `<p>${data.data.verCartas}</p>`;
    });
    actualitzarPantalla();
});

function actualitzarPantalla(){
    if(terminal.children.length > 5){
        terminal.removeChild(terminal.firstElementChild);
    }
}

}