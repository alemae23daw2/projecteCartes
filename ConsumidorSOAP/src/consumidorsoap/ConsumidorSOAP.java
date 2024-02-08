/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package consumidorsoap;
import java.util.Scanner;
import serversoap.JocServerService;
import serversoap.JocServer;
import java.net.URL;

public class ConsumidorSOAP {

    public static void main(String[] args) {
        String serviceURL = "http://localhost:8080/ServerSOAP/JocServerService?wsdl";

        try {
            URL url = new URL(serviceURL);
            serversoap.JocServerService service = new serversoap.JocServerService(url);      
            serversoap.JocServer port = service.getJocServerPort();

        } catch (Exception e) {
            e.printStackTrace();
        }
        
        Scanner scanner = new Scanner(System.in);

        System.out.println("Selecciona una operación:");
        System.out.println("1. Acabar Juego");
        System.out.println("2. Crear Sala");
        System.out.println("3. Pedir Carta");
        System.out.println("4. Descartar Cartas");
        System.out.println("5. Ver Cartas");

        int opcion = scanner.nextInt();

        switch (opcion) {
            case 1:
                System.out.println("Ingresa el ID de la Sala:");
                int idSala1 = scanner.nextInt();
                System.out.println("Ingresa el número del Jugador:");
                int nJugador1 = scanner.nextInt();
                System.out.println(acabarJoc(idSala1, nJugador1));
                break;

            case 2:
                System.out.println(crearSala());
                break;

            case 3:
                System.out.println("Ingresa el ID de la Sala:");
                int idSala3 = scanner.nextInt();
                System.out.println("Ingresa el número del Jugador:");
                int nJugador3 = scanner.nextInt();
                System.out.println("Ingresa el número deseado:");
                int numeroDesitjat3 = scanner.nextInt();
                System.out.println(demanarCarta(idSala3, nJugador3, numeroDesitjat3));
                break;

            case 4:
                System.out.println("Ingresa el ID de la Sala:");
                int idSala4 = scanner.nextInt();
                System.out.println("Ingresa el número del Jugador:");
                int nJugador4 = scanner.nextInt();
                System.out.println("Ingresa el número a descartar:");
                int numeroDescartar4 = scanner.nextInt();
                System.out.println(descartarCartes(idSala4, nJugador4, numeroDescartar4));
                break;

            case 5:
                System.out.println("Ingresa el ID de la Sala:");
                int idSala5 = scanner.nextInt();
                System.out.println("Ingresa el número del Jugador:");
                int nJugador5 = scanner.nextInt();
                System.out.println(veureCartes(idSala5, nJugador5));
                break;

            default:
                System.out.println("Opción no válida");
        }
    }

    private static String acabarJoc(int idSala, int nJugador) {
        serversoap.JocServerService service = new serversoap.JocServerService();
        serversoap.JocServer port = service.getJocServerPort();
        return port.acabarJoc(idSala, nJugador);
    }

    private static String crearSala() {
        serversoap.JocServerService service = new serversoap.JocServerService();
        serversoap.JocServer port = service.getJocServerPort();
        return port.crearSala();
    }

    private static String demanarCarta(int idSala, int nJugador, int numeroDesitjat) {
        serversoap.JocServerService service = new serversoap.JocServerService();
        serversoap.JocServer port = service.getJocServerPort();
        return port.demanarCarta(idSala, nJugador, numeroDesitjat);
    }

    private static String descartarCartes(int idSala, int nJugador, int numeroDescartar) {
        serversoap.JocServerService service = new serversoap.JocServerService();
        serversoap.JocServer port = service.getJocServerPort();
        return port.descartarCartes(idSala, nJugador, numeroDescartar);
    }

    private static String veureCartes(int idSala, int nJugador) {
        serversoap.JocServerService service = new serversoap.JocServerService();
        serversoap.JocServer port = service.getJocServerPort();
        return port.veureCartes(idSala, nJugador);
    }
    
    
}
