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
                terminal.innerHTML+= dades.missatge;
                terminal.innerHTML+= "<br>";
            });
    });

    botoVeureCartes.addEventListener("click", () => {
        let codiSala = prompt("A quina sala vols fer el teu moviment?");
        let nJugador = prompt("Quin jugador vols ser?");

        localStorage.setItem(codiSala, nJugador);

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
                terminal.innerHTML+= dades.missatge;
            });
    });

    botoDemanarCarta.addEventListener("click", () => {
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

        var peticio = new Request('https://itunes.apple.com/search?term=queen&media=music&entity=album', initPropi);

        fetch(peticio)
            .then(response => {
                return response.json();
            })
            .then(dades => {
                terminal.innerHTML+= dades.missatge;
            });
    });

    botoDescartarCartes.addEventListener("click", () => {
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

        var peticio = new Request('https://itunes.apple.com/search?term=queen&media=music&entity=album', initPropi);

        fetch(peticio)
            .then(response => {
                return response.json();
            })
            .then(dades => {
                terminal.innerHTML+= dades.missatge;
            });
    });

    botoAcabarJoc.addEventListener("click", () => {
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

        var peticio = new Request('https://itunes.apple.com/search?term=queen&media=music&entity=album', initPropi);

        fetch(peticio)
            .then(response => {
                return response.json();
            })
            .then(dades => {
                terminal.innerHTML+= dades.missatge;
            });
    });

}