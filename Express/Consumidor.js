window.onload = () => {

    let terminal = document.querySelector(".terminal");

    let botoCrearSala = document.querySelector(".crearSala");
    let botoVeureCartes = document.querySelector(".veureCartes");
    let botoDemanarCarta = document.querySelector(".demanarCarta");
    let botoDescartarCartes = document.querySelector(".descartarCartes");
    let botoAcabarJoc = document.querySelector(".acabarJoc");

    botoCrearSala.addEventListener("click", () => {
        var cap = new Headers();
        cap.append("Content-Type", "application/json");

        var initPropi = {
            method: 'POST',
            headers: cap,
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        };

        var peticio = new Request('http://localhost:3000/crearSala', initPropi);

        fetch(peticio)
            .then(response => {
                return response.json();
            })
            .then(dades => {
                terminal.innerHTML+= `<p>${dades.missatge}</p>`;
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
        
        var cap = new Headers();
        cap.append("Content-Type", "application/json");

        var initPropi = {
            method: 'GET',
            headers: cap,
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        };

        var peticio = new Request(`http://localhost:3000/veureCartes?idSala=${codiSala}&nJugador=${nJugador}`, initPropi);

        fetch(peticio)
            .then(response => {
                return response.json();
            })
            .then(dades => {
                terminal.innerHTML+= `<p>${dades.missatge}</p>`;
            });
        actualitzarPantalla();
    });

    botoDemanarCarta.addEventListener("click", () => {
        let codiSala = prompt("A quina sala vols fer el teu moviment?");
        let nJugador = localStorage.getItem("jugador");
        let numeroDesitjat = prompt("Quin numero vols demanar?");

        var cap = new Headers();
        cap.append("Content-Type", "application/json");

        var initPropi = {
            method: 'GET',
            headers: cap,
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        };

        var peticio = new Request(`http://localhost:3000/demanarCarta?idSala=${codiSala}&nJugador=${nJugador}&numeroDesitjat=${numeroDesitjat}`, initPropi);

        fetch(peticio)
            .then(response => {
                return response.json();
            })
            .then(dades => {
                terminal.innerHTML+= `<p>${dades.missatge}</p>`;
            });
        actualitzarPantalla();
    });

    botoDescartarCartes.addEventListener("click", () => {
        let codiSala = prompt("A quina sala vols fer el teu moviment?");
        let nJugador = localStorage.getItem("jugador");
        let numeroDescartar = prompt("Quin numero vols descartar?");

        var cap = new Headers();
        cap.append("Content-Type", "application/json");

        var initPropi = {
            method: 'PUT',
            headers: cap,
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        };

        var peticio = new Request(`http://localhost:3000/descartarCartes?idSala=${codiSala}&nJugador=${nJugador}&numeroDescartar=${numeroDescartar}`, initPropi);

        fetch(peticio)
            .then(response => {
                return response.json();
            })
            .then(dades => {
                terminal.innerHTML+= `<p>${dades.missatge}</p>`;
            });
        actualitzarPantalla();
    });

    botoAcabarJoc.addEventListener("click", () => {
        let codiSala = prompt("A quina sala vols fer el teu moviment?");
        let nJugador = localStorage.getItem("jugador");

        var cap = new Headers();
        cap.append("Content-Type", "application/json");

        var initPropi = {
            method: 'GET',
            headers: cap,
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        };

        var peticio = new Request(`http://localhost:3000/descartarCartes?idSala=${codiSala}&nJugador=${nJugador}`, initPropi);

        fetch(peticio)
            .then(response => {
                return response.json();
            })
            .then(dades => {
                terminal.innerHTML+= `<p>${dades.missatge}</p>`;
            });

        actualitzarPantalla();
    });

    function actualitzarPantalla(){
        if(terminal.children.length > 5){
            terminal.removeChild(terminal.firstElementChild);
        }
    }

}