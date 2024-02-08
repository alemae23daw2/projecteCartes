/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/WebService.java to edit this template
 */
package ServeiWebSOAP;

import java.util.ArrayList;
import java.util.Random;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

/**
 *
 * @author pc1
 */
@WebService(serviceName = "serveiwebSoap")
public class serveiwebSoap {

    private static ArrayList<Dispositiu> llistaDispositius = new ArrayList<>();

    @WebMethod
    public String afegirDispositiu(@WebParam(name = "ip") String ip, @WebParam(name = "nom") String nom, @WebParam(name = "actiu") boolean actiu) {
        llistaDispositius.add(new Dispositiu(ip, nom, actiu));
        return "S'ha afegit el nou dispositiu:" + llistaDispositius.get(llistaDispositius.size() - 1).toString();
    }

    @WebMethod
    public String consultarDispositiu(@WebParam(name = "ip") String ip) {
        for(int i = 0; i <= llistaDispositius.size() - 1; i++){
            if (llistaDispositius.get(i).getIP().equals(ip)){
                return llistaDispositius.get(i).toString();
            }
        }
        return "No s'ha trobat el dispositiu amb ip: " + ip;
    }

    @WebMethod
    public String consultarDispositius() {
        return llistaDispositius.toString();
    }

    @WebMethod
    public String esborrarDispositiu(@WebParam(name = "ip") String ip) {
        for(int i = 0; i <= llistaDispositius.size() - 1; i++){
            if (llistaDispositius.get(i).getIP().equals(ip)){
                llistaDispositius.remove(i);
                return "S'ha esborrat el dispositiu amb ip: " + ip;
            }
        }
        return "No s'ha trobat el dispositiu amb ip: " + ip;
    }
}

class Dispositiu {

    private String ip;
    private String nom;
    private boolean actiu;

    public Dispositiu(String ip, String nom, boolean actiu) {
        this.ip = ip;
        this.nom = nom;
        this.actiu = actiu;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setActiu(boolean actiu) {
        this.actiu = actiu;
    }
    
    public String getIP() {
        return this.ip;
    }

    @Override
    public String toString() {
        return "ip: " + this.ip +", nom: " + this.nom + ", actiu: " + this.actiu;
    }

}