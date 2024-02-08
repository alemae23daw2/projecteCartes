/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/WebService.java to edit this template
 */
package ServerSOAP;

import java.util.ArrayList;
import java.util.Random;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

@WebService
public class JocServer {

    private static ArrayList<Joc> llistaPartides = new ArrayList<>();

    @WebMethod
    public String crearSala() {
        llistaPartides.add(new Joc());
        return "{\"missatge\": \"El codi de la nova partida es: " + llistaPartides.size() + "\"}";
    }

    @WebMethod
    public String veureCartes(@WebParam(name = "idSala") int idSala, @WebParam(name = "nJugador") int nJugador) {
        Joc partida = llistaPartides.get(idSala - 1);
        try {
            if (nJugador == 1) {
                return "{\"missatge\": \"" + partida.cartesJugador1.toString() + "\"}";
            } else if (nJugador == 2) {
                return "{\"missatge\": \"" + partida.cartesJugador2.toString() + "\"}";
            } else {
                return "{\"missatge\": \"Error. No s'ha trobat el jugador\"}";
            }
        } catch (Exception e) {
            return "{\"missatge\": \"Error. No s'ha trobat la partida o el jugador\"}";
        }
    }

    @WebMethod
    public String demanarCarta(@WebParam(name = "idSala") int idSala, @WebParam(name = "nJugador") int nJugador, @WebParam(name = "numeroDesitjat") int numeroDesitjat) {
        try {
            if (nJugador == 1) {
                byte nCartes = 0;
                for(int i = 0; i <= llistaPartides.get(idSala - 1).cartesJugador2.size()-1; i++){
                    if (llistaPartides.get(idSala - 1).cartesJugador2.get(i).getNumero() == numeroDesitjat){
                        llistaPartides.get(idSala - 1).cartesJugador1.add(llistaPartides.get(idSala - 1).cartesJugador2.get(i));
                        llistaPartides.get(idSala -1).cartesJugador2.remove(i);
                        nCartes++;
                    }
                }
                if(nCartes == 0){
                    int numeroAleatorio = (int) (Math.random()*llistaPartides.get(idSala - 1).cartesDisponibles.size());
                    llistaPartides.get(idSala - 1).cartesJugador1.add(llistaPartides.get(idSala -1).cartesDisponibles.get(numeroAleatorio));
                    llistaPartides.get(idSala-1).cartesDisponibles.remove(numeroAleatorio);
                    return "{\"missatge\": \"L'altre jugador no te ningun\"" + numeroDesitjat + "}";

                }else {
                    return "{\"missatge\": \"Has robat \"" + nCartes + " cartes!}";
                }
            } else if (nJugador == 2) {
                byte nCartes = 0;
                for(int i = 0; i <= llistaPartides.get(idSala - 1).cartesJugador1.size()-1; i++){
                    if (llistaPartides.get(idSala - 1).cartesJugador1.get(i).getNumero() == numeroDesitjat){
                        llistaPartides.get(idSala - 1).cartesJugador2.add(llistaPartides.get(idSala - 1).cartesJugador1.get(i));
                        llistaPartides.get(idSala -1).cartesJugador1.remove(i);
                        nCartes++;
                    }
                }
                if(nCartes == 0){
                    int numeroAleatorio = (int) (Math.random()*llistaPartides.get(idSala - 1).cartesDisponibles.size());
                    llistaPartides.get(idSala - 1).cartesJugador2.add(llistaPartides.get(idSala -1).cartesDisponibles.get(numeroAleatorio));
                    llistaPartides.get(idSala-1).cartesDisponibles.remove(numeroAleatorio);
                    return "{\"missatge\": \"L'altre jugador no te ningun\"" + numeroDesitjat + "}";

                }else {
                    return "{\"missatge\": \"Has robat \"" + nCartes + " cartes!}";
                }            }
        } catch (Exception e) {
            return "{\"missatge\": \"Error. No s'ha trobat la partida o el jugador\""+e+"}";
        }
        return "{\"missatge\": \"Error. No s'ha trobat la partida o el jugador\"}";
    }

    @WebMethod
    public String descartarCartes(@WebParam(name = "idSala") int idSala, @WebParam(name = "nJugador") int nJugador, @WebParam(name = "numeroDescartar") int numeroDescartar) {
        try {
            Joc partida = llistaPartides.get(idSala - 1);
            byte cartesBorrar = 0;
            ArrayList<Carta> eliminarCartas = new ArrayList<>();

            if (nJugador == 1) {
                for(int i = 0; i <= llistaPartides.get(idSala - 1).cartesJugador1.size()-1; i++){
                    if (llistaPartides.get(idSala - 1).cartesJugador1.get(i).getNumero() == numeroDescartar){
                        eliminarCartas.add(llistaPartides.get(idSala - 1).cartesJugador1.get(i));
                        llistaPartides.get(idSala -1).cartesJugador1.remove(i);
                        cartesBorrar++;
                    }
                }
                if (cartesBorrar == 4) {
                    eliminarCartas = null;
                    return "{\"missatge\": \"Has descartat\""+ numeroDescartar+"!}";
                } else {
                    llistaPartides.get(idSala-1).cartesJugador1.addAll(eliminarCartas);
                    return "{\"missatge\": \"No tens suficients \""+ numeroDescartar+"!}";
                }
            } else if (nJugador == 2) {
                for(int i = 0; i <= llistaPartides.get(idSala - 1).cartesJugador2.size()-1; i++){
                    if (llistaPartides.get(idSala - 1).cartesJugador2.get(i).getNumero() == numeroDescartar){
                        eliminarCartas.add(llistaPartides.get(idSala - 1).cartesJugador2.get(i));
                        llistaPartides.get(idSala -1).cartesJugador2.remove(i);
                        cartesBorrar++;
                    }
                }
                if (cartesBorrar == 4) {
                    eliminarCartas = null;
                    return "{\"missatge\": \"Has descartat\""+ numeroDescartar+"!}";
                } else {
                    llistaPartides.get(idSala-1).cartesJugador2.addAll(eliminarCartas);
                    return "{\"missatge\": \"No tens suficients \""+ numeroDescartar+"!}";
                }
            } else {
                return "{\"missatge\": \"Error. No s'ha trobat el jugador\"}";
            }
        } catch (Exception e) {
            return "{\"missatge\": \"Error. No s'ha trobat la partida o el jugador\""+ e +"}";
        }
    }

    @WebMethod
    public String acabarJoc(@WebParam(name = "idSala") int idSala, @WebParam(name = "nJugador") int nJugador) {
        try {
            Joc partida = llistaPartides.get(idSala - 1);
            llistaPartides.remove(idSala - 1);
            return "{\"missatge\": \"El jugador " + nJugador + " ha acabat la partida " + idSala + "!\"}";
        } catch (Exception e) {
            return "{\"missatge\": \"Error. No s'ha trobat la partida o el jugador\"}";
        }
    }

}

class Joc {

    public ArrayList<Carta> cartesDisponibles;
    public ArrayList<Carta> cartesJugador1;
    public ArrayList<Carta> cartesJugador2;

    public Joc() {
        this.cartesDisponibles = getLlistaCartes();
        this.cartesJugador1 = repartirCartes();
        this.cartesJugador2 = repartirCartes();
    }

    private ArrayList<Carta> getLlistaCartes() {
        ArrayList<Carta> llistaCartes = new ArrayList<>();

        String[] pals = {"Diamant", "Cor", "Pica", "Trebol"};

        for (int i = 1; i < 11; i++) {
            for (String pal : pals) {
                llistaCartes.add(new Carta(i, pal, true));
            }
        }

        return llistaCartes;
    }

    private ArrayList<Carta> repartirCartes() {
        ArrayList<Carta> cartas = new ArrayList<>();
        Random rand = new Random();

        for (int i = 0; i < 5; i++) {
            int r = rand.nextInt(this.cartesDisponibles.size());
            cartas.add(this.cartesDisponibles.get(r));
            this.cartesDisponibles.remove(r);
        }

        return cartas;
    }

    @Override
    public String toString() {
        return "Cartes Jugador 1: " + cartesJugador1.toString() +
                "\nCartes Jugador 2: " + cartesJugador2.toString();
    }
}

class Carta {

    private int numero;
    private String pal;
    private boolean disp;

    public Carta(int numero, String pal, boolean disp) {
        this.numero = numero;
        this.pal = pal;
        this.disp = disp;
    }

    public boolean isDisp() {
        return this.disp;
    }

    public void setDisp(boolean disp) {
        this.disp = disp;
    }

    public int getNumero() {
        return this.numero;
    }

    public String getPal() {
        return this.pal;
    }

    @Override
    public String toString() {
        return "\nCarta: " + this.numero + " de " + this.pal;
    }

}