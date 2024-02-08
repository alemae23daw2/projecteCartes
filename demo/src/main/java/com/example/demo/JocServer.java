package com.example.demo;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.ArrayList;
import jakarta.ws.rs.core.Response;

@Path("/")
public class JocServer {
    private static ArrayList<Joc> llistaPartides = new ArrayList<>();

    @POST
    @Path("/crearSala")
    @Produces(MediaType.APPLICATION_JSON)
    public Response crearSala() {
        llistaPartides.add(new Joc());
        return Response.ok().entity("{\"missatge\": \"El codi de la nova partida es: " + llistaPartides.size() + "\"}").build();
    }

    @GET
    @Path("/veureCartes")
    @Produces(MediaType.APPLICATION_JSON)
    public Response veureCartes(@QueryParam("idSala") int idSala, @QueryParam("nJugador") int nJugador) {
        Joc partida = llistaPartides.get(idSala - 1);
        try {
            if (nJugador == 1) {
                return Response.ok().entity("{\"missatge\": \"" + partida.cartesJugador1.toString() + "\"}").build();
            } else if (nJugador == 2) {
                return Response.ok().entity("{\"missatge\": \"" + partida.cartesJugador2.toString() + "\"}").build();
            } else {
                return Response.ok().entity("{\"missatge\": \"Error. No s'ha trobat el jugador\"}").build();
            }
        } catch (Exception e) {
            return Response.ok().entity("{\"missatge\": \"Error. No s'ha trobat la partida o el jugador\"}").build();
        }
    }

    @GET
    @Path("/demanarCarta")
    @Produces(MediaType.APPLICATION_JSON)
    public Response demanarCarta(@QueryParam("idSala") int idSala, @QueryParam("nJugador") int nJugador, @QueryParam("numeroDesitjat") int numeroDesitjat) {
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
                    return Response.ok().entity("{\"missatge\": \"L'altre jugador no te ningun\"" + numeroDesitjat + "}").build();

                }else {
                    return Response.ok().entity("{\"missatge\": \"Has robat \"" + nCartes + " cartes!}").build();
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
                    return Response.ok().entity("{\"missatge\": \"L'altre jugador no te ningun\"" + numeroDesitjat + "}").build();

                }else {
                    return Response.ok().entity("{\"missatge\": \"Has robat \"" + nCartes + " cartes!}").build();
                }            }
        } catch (Exception e) {
            return Response.ok().entity("{\"missatge\": \"Error. No s'ha trobat la partida o el jugador\""+e+"}").build();
        }
        return Response.ok().entity("{\"missatge\": \"Error. No s'ha trobat la partida o el jugador\"}").build();
    }

    @POST
    @Path("/descartarCartes")
    @Produces(MediaType.APPLICATION_JSON)
    public Response descartarCartes(@QueryParam("idSala") int idSala, @QueryParam("nJugador") int nJugador, @QueryParam("numeroDescartar") int numeroDescartar) {
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
                    return Response.ok().entity("{\"missatge\": \"Has descartat\""+ numeroDescartar+"!}").build();
                } else {
                    llistaPartides.get(idSala-1).cartesJugador1.addAll(eliminarCartas);
                    return Response.ok().entity("{\"missatge\": \"No hi han suficients cartes\"}").build();
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
                    return Response.ok().entity("{\"missatge\": \"Has descartat\""+ numeroDescartar+"!}").build();
                } else {
                    llistaPartides.get(idSala-1).cartesJugador2.addAll(eliminarCartas);
                    return Response.ok().entity("{\"missatge\": \"No hi han suficients cartes\"}").build();
                }
            } else {
                return Response.ok().entity("{\"missatge\": \"Error. No s'ha trobat el jugador\"}").build();
            }
        } catch (Exception e) {
            return Response.ok().entity("{\"missatge\": \"Error. No s'ha trobat la partida o el jugador\""+ e +"}").build();
        }
    }

    @DELETE
    @Path("/acabarJoc")
    @Produces(MediaType.APPLICATION_JSON)
    public Response acabarJoc(@QueryParam("idSala") int idSala, @QueryParam("nJugador") int nJugador) {
        try {
            Joc partida = llistaPartides.get(idSala - 1);
            llistaPartides.remove(idSala - 1);
            return Response.ok().entity("{\"missatge\": \"El jugador " + nJugador + " ha acabat la partida " + idSala + "!\"}").build();
        } catch (Exception e) {
            return Response.ok().entity("{\"missatge\": \"Error. No s'ha trobat la partida o el jugador\"}").build();
        }
    }

    public static void main(String[] args) {
        // Código para iniciar el servidor
    }
}
