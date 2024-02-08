package com.example.demo;
public class Carta {

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
