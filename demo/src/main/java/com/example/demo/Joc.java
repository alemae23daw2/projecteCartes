package com.example.demo;
import java.util.ArrayList;
import java.util.Random;

public class Joc {

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
