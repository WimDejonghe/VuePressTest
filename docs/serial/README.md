---
author: [Wim Dejonghe]
description: [Opbouw OOP lessen IoT.]
ms.date: [CREATION/UPDATE DATE - mm/dd/yyyy]
marp: true
title: [Seriele communicatie]
---

# Seriele communicatie  

![example image](./images/rs232_bits.png "An exemplary image")

---

In de cursus Interface wordt de seriele asynchrone communicatie tussen devices uitgelegd. Hier willen we enkel aangeven hoe je met een microcontroller kan communiceren met een aantal programma's op de computer via de USB poort.  

We leren hier hoe we een microcontroller kunnen laten communiceren via de virtuele COM-poort van de computer (er is dus geen aparte bedrading nodig). Er bestaan programma's die alle data die via een COM-poort (al of niet virtueel) de computer binnekomt kan visualiseren. En die programma's laten ook toe om data te verzenden vanuit de computer via de COM-poort van de computer naar de buiten wereld. Dit is een asynchrone seriele communicatie die gepaard gaat met enkele specifieke eigenschappen zoals baudrate (bits/seconde), pariteit, stop en startbits, etc. (zie cursus Interface technieken)

---

## MBED C++ Nucleo microcontroller

Zoals eerder werd gezien is de microcontroller in staat om data te ontvangen en te verzenden via de USB programmer die op het bordje aanwezig is. Dit is ook zo bij een Arduino of bij een Micro:Bit ea.

Met het commando  `printf`  kan er data vanuit de microcontroller via asynchrone seriele wijze worden verzonden. Het hangt af op welke pinnen dit zal gebeuren door de decelaratie van de seriele poort eerder in de code. Zie OOP.pdf . Wordt hierbij de standaard poort gekozen, dan zal de data via die poort uitgewisseld worden via de programmer-poort. Dit is dus via de virtuele COM-poort alover de USB-verbinding met de computer of RaspberryPi. 

Voorbeeldjes van code op de Nucleo kan terug gevonden worden in het OOP.pdf document.

---
## Terminal APP

Het komt zeer veel voor dat wanneer we dergelijke coommunicaties willen opzetten dat we nood hebben aan een programma op de computer om effectief te zien wat de microcontroller aan data allemaal verstuurt. Maar ook om eventueel data terug te sturen naar de microcontroller. Vooraleer we dit laten doen door een applicatie, kunnen we daar als test een teriminalprogramma voor gebruiken. Dit wordt zeer veel gedaan bij de ontwikkeling van systemen en is dus uiterst belangrijke stap in de ontwikkeling van een werkend systeem.

Er bestaan wel meer dergelijke programma's. De verzamelnaam voor die programma's is een terminal programma of editor. Voorbeelden zijn Putty of RealTerm. Ik ben nogal fan van RealTerm. Vandaar dat we dit hier eens gaan bekijken.

![example image](./images/realterm.png "An exemplary image")

Je kan dit op het internet downloaden.
Voor goede werking is het belangrijk dat je een aantal zaken weet, zoals:

- Met welke COM-poort wil je communiceren? Als je dat niet weet dan kan de Device Manager (Apparaatbeheer) binnen uw computer systeem u wel wegwijs brengen. Zoek daar op welke COM-poort uw hardware is verbonden. Stel dit in bij Port in RealTerm (tabblad Port).
- Ook de snelheid waarmee moet worden gecommuniceerd is van belang. Dit bepaal je binnen uw microcontroller. Het is natuurlijk de bedoeling dat het terminal programma op de zelfde snelheid data verzend en ontvangt als de snelheid van de controller. Dit is wat BaudRate (kortweg Baud) wordt genoemd.
- Verder zijn nog instellingen als pariteit, databits, aantal stopbits en flow controle belangrijke parameters bij een hardwarematieg seriele verbinding. Deze spelen minder een rol bij virtuele COM-poorten. Standaard staan die waarschijnlijk juist.
- Breng je wijzigingen aan binnen RealTerm, klik dan op *Change* om uw wijziging door te voeren naar de poort.
- Verder dient er nog opgemerkt te worden dat een programma een seriele poort kan openen. Let wel eenmaal een software pakket een poort heeft geopend, dan kan een ander programma er geen gebruik meer van maken. Wil je dit doen? Sluit dan eerst het ene programma af (poort wordt dan automatisch gesloten).
- Er zijn verschillende manieren om de ontvangen data te visualiseren (zie tabblad Display)
- Wil je data versturen, kies dan voor het tabblad Send.
- Het komt heel regelmatig voor dat de instellingen van een seriele poort wordt samengevat in een omschrijving: vb: 9600,8,1,N : Wat wil zeggen dat de bitsnelheid 9600 bits/sec is, dat er pakketjes wordt verstuurd die bestaan it 8 bits, dat er maar 1 STOPBit wordt gebruikt en dat er geen pariteit controle wordt toegepast binnen deze communicatie.

![example image](./images/realterm2.png "An exemplary image")

\newpage
Een voorbeeldje:

```c
//Nucleo_read_hyperterminal
#include "mbed.h"

Serial pc(SERIAL_TX, SERIAL_RX);
DigitalOut led(LED1);
char c = '0';
void ToonTekstTerminal (char data);

int main()
{
    ToonTekstTerminal(c);
    while(1) {
        c = pc.getc(); // Read hyperterminal
        if (c == '0') {
            led = 0; // OFF
            
        }
        if (c == '1') {
            led = 1; // ON
        }
        ToonTekstTerminal(c);
    }
}
void ToonTekstTerminal(char waarde)
{
    pc.printf("De LED1 is %c\r\n", waarde);
    pc.printf("Press '1' to turn LED1 ON, '0' to turn it OFF\r\n");
    
}
```

Bestudeer deze eenvoudige code. Merk op met `getc` wordt één karakter binnengelezen door de microcontroller.  

Stel dat je hiermee vanuit RealTerm wil communiceren dan zou dit er zo uitzien. Klik op tab Send en zet een 0 of een 1 in het veld en klik op Send ASCII:

![example image](./images/realterm3.png "An exemplary image")

Ok, we hebben nu een werkende applicatie, maar dit is niet voldoende. We kunnen niet verwachten dat de IoT applicatie RealTerm zal gebruiken.

Laat ons een stap verder zetten en dit eens proberen vanuit Node-Red.

---

## Node-Red

We zullen nu het terminal programma vervangen door een Node-Red flow. Hiervoor moeten we Node-Red uitbreiden met een extra groep binnen de *palette*. Door dit te doen krijgen we enkele nodes ter beschikking: `Serial`. Met een Serial-node kunnen we data verzenden , met een andere Serial-node kunnen we data ontvangen van, jawel, opnieuw COM-poorten (al of niet virtueel). Dit is dezelfde functionaliteit als het terminal programma.

Zoek binnen Node-Red via Manage Palette naar extra nodes `node-red-node-SerialPort`.
Je krijgt nieuwe nodes binnen de Palette (mss moet je Node-Red eens herstarten?).

![example image](./images/serialnodes.png "An exemplary image")

Net zoals je bij het terminal programma , waar er instellingen dienden te gebeuren, zal dit hier ook moeten gedaan worden. Sleep Serial in - node op de flow. Dubbelklik erop:

![example image](./images/serial1.png "An exemplary image")

Maak een nieuw configuratie aan van een poort. Herinner je nog de instellingen bij het terminal programma:

![example image](./images/serial2.png "An exemplary image")

Wijzig zoals terminal prog:

![example image](./images/serial3.png "An exemplary image")

Maak volgende flow en gebruik debug node om te zien wat er binnenkomt:

![example image](./images/serial4.png "An exemplary image")

Zo kan je ook sturen vanuit Node-Red om de LED aan te sturen:

![example image](./images/serial5.png "An exemplary image")

Nog een stap verder is dat we van dit geheel een Node-Red-dashboard maken om de gebruiksvriendelijkheid van het geheel te vergroten:

![example image](./images/serial6.png "An exemplary image")

Bekijk de User Interface en bedien de drukknop

![example image](./images/serial7.png "An exemplary image")

Je zou ook de data die je terug ontvangt van de Nucleo kunnen visualiseren op de User Interface webpage:

![example image](./images/serial8.png "An exemplary image")

Maar de tekst is hier dan een beetje triviaal.

![example image](./images/serial9.png "An exemplary image")

---

In volgend voorbeeld wordt er een dashboard gemaakt met een Gauge en een switch. De gauge is een analoge meter die de ingestelde waarde van de potentiometer zal weergeven (waarde tussen 0 en 1). Tevens wordt die analoge waarde (een float waarde tussen 0 en 1), gebruikt als duty-cycle waarde om een PWM signaal (met vaste frequentie) te genereren, waarmee we LED6 van het shield zullen aansturen.  

Ook zullen we het aansturen van de LED op de Nucleo zelf blijvend kunnen bedienen met een SWITCH op het dashboard. Door het feit dat we hier in de MBED code `if (pc.readable)` gebruiken wordt het lezen (en dus wachten op een binnenkomende char vermeden) verenvoudigd. Op die manier blijft de processor niet hangen, en kan de processor binnen de While(true) - lus blijven ronddraaien.  

Let ook op dat bij het versturen van de analoge waarde via printf naar Node-red er een NewLine wordt toegevoegd (\n). De reden daarvoor is dat Node-Red bij het binnenlezen van verschillende waarden, deze ondersheidt door een NewLne (zie instellingen bij de Serial_IN instellingen van die node).

```c
//Analog_Read_NodeRed
#include "mbed.h"

//Mooie opdracht om Nucleo te laten communiceren met Node_red dashboard (2 richtingen)
//Potentiometer bediend een Gauge op het dashboard en stuurt ook LED 6 in PWM duty cycle aan.
//Op dashboard wordt een SWITCH gezet waarmee de LED op de Nucleo zelf aan en uit kan worden gezet.
//Tevens wordt er gebruik gemaakt van pc.readable omte voorkomen dat bij getc() de Nucleo staat te wachten op een binnenkomende char.

PwmOut led6(PA_8);
DigitalOut led (LED1);

AnalogIn potentiometer(A0);
Serial pc(SERIAL_TX, SERIAL_RX);  


int main()
{
    led6.period(0.01f);         //freq = 100Hz ; periode = 10 milliseconden
    led6.write(0.9f);       //duty cycle = 90%
    float gemetenWaarde;

    while(true)
    {
      gemetenWaarde = potentiometer.read(); //lees analoge waarde van de pot-meter
      wait(0.03);                           //waarschijnlijk niet nodig
      led6.write(gemetenWaarde);            //stuur duty-cycle bij
      pc.printf("%f\n", gemetenWaarde);     //stuur analoge waarde naar Node-Red
      if (pc.readable())
      {
          char c = pc.getc();               //Lees de 0 of 1 binnen afkomstig van SWITCH dahBoard Node-Red
          if (c == '0'){led = true;}
          if (c == '1') {led = false;}
      }
    }
}
```

De Node-Red flow ziet er dan als volgt uit (Tevens ziet u ook de Layout-opmaak van het dashboard).:

![example image](./images/node_red_db_pot.png "An exemplary image")

Waarbij dan het dashboard er als volgt uit ziet:

![example image](./images/nr_db1.png "An exemplary image")

---

Het aansturen van meerdere LED's zou je kunnen doen door een CHAR-variable (8 bits) binnen te lezen via GETc. Als je die waarde dan naar de methode stuurt die we eerder hebben gezien in het OOP.pdf document, dan zou iedere getal tussen 0 en 255 een specifieke combinatie moeten opleveren op de 8 LED's van het shield. Uw MBED code zou er dan als volgt uitzien:

```c++
//GETc_Leds
#include "mbed.h"

Serial pc(USBTX, USBRX);

void ToonLEDS (unsigned char data);

DigitalOut LED(LED1);
DigitalOut led1(PC_0);
DigitalOut led2(PB_3);
DigitalOut led3(PB_5);
DigitalOut led4(PB_4);
DigitalOut led5(PB_10);
DigitalOut led6(PA_8);
DigitalOut led7(PC_7);
DigitalOut led8(PB_6);

DigitalIn mybutton(USER_BUTTON);
DigitalIn sw1(PA_1);
DigitalIn sw2(PA_4);
DigitalIn sw3(PB_0);
DigitalIn sw4(PC_1);

int main ()
{
    pc.printf("Stuur een getal door en we tonen de waarde ervan op de LEDs\r\n");
    unsigned char waarde;

    while(1)
    {
        if (pc.readable())
        {
            waarde = pc.getc();
            ToonLEDS(waarde);
            pc.printf("Je stuurde de waarde : %d \r\n", waarde);
        }
        wait(0.05);
        //pc.printf("Stuur een getal door en we tonen de waarde ervan op de LEDs\r\n");
        LED = !LED;
        
    }
    
    
}

void ToonLEDS (unsigned char data)
{        
    if (data/128%2 != 0)
            { led8 = true; }        //Set   LED8
    else    { led8 = false;}        //Reset LED8
    if (data/64%2 != 0)
            { led7 = true; }         //Set   LED7
    else    { led7 = false;}     //Reset LED7
    if (data/32%2 != 0)
            { led6 = true;}           //Set   LED6
    else    { led6 = false;}      //Reset LED6
    if (data/16%2 != 0)
            { led5 = true;}         //Set   LED5
    else    { led5 = false;}     //Reset LED5
    if (data/8%2 != 0)
            { led4 = true;}           //Set   LED4
    else    { led4 = false;}      //Reset LED4
    if (data/4%2 != 0)
            { led3 = true;}           //Set   LED3
    else    { led3 = false;}      //Reset LED3
    if (data/2%2 != 0)
            { led2 = true;}           //Set   LED2
    else    { led2 = false;}      //Reset LED2
    if (data%2 != 0)
            { led1 = true;}           //Set   LED1
    else    { led1 = false;}      //Reset LED1
}

```

Dit moet heel eenvoudig te testen zijn met RealTerm. Stuur hiervoor een getal door naar de Nucleo, en deze toont de respectievelijke waarde. Controlleer de werking.

Via Node-Red zou dit ook moeten lukken. Je kan natuurlijk dit met een Injectie-node testen. Wil je er een dashboard van maken dan zou dit er zo kunnen uitzien:  

![example image](./images/nodered_leds.png "An exemplary image")

Iedere Switch node zal in de payload een waarde doorsturen naar de Function-node. Afhankelijk van de waarde van de LED in de rij zal die waarde de respectievelijke binaire-decimale waarde doorgeven. Zo zal LED1 een waarde +1 doorsturen bij een ON-switch en een waarde -1 doorsturen bij een OFF-switch naar de Function-Node (deze zal die waarde optellen bij een variabele). Bij LED2 zal dit +2 en -2 zijn, bij LED3: +4 en -4, ... In volgende afbeelding is te zien hoe dit ingesteld staat voor de LED4-switch:

![example image](./images/led4.png "An exemplary image")

De Function-Node die hier wordt gebruikt zal dus een variabele hebben die telkens het inkomend getal (payload van de SWITCH) van een LED-switch zal optellen (of aftrekken bij een negatief getal) bij de oude waarde van die variabele. De oude waarde heeft dus eigenlijk onthouden wat de andere toestanden zijn van de verschillende SWITCHEN.  

Door het feit dat bij het bedienen van een switch niet weten hoe de andere switchen staan, gaan we er hier vanuit dat de decimale waarde van die switch wordt opgeteld bij een JavaScript variabele. Dit ziet er zo uit:

```Java
var waarde = context.get('waarde') || 0;
var inkomendeWaarde = Number(msg.payload);

waarde = Number(waarde) + inkomendeWaarde;
context.set('waarde', waarde);

msg.payload = String.fromCharCode(Number(waarde));
return msg;

```

Deze code is niet 100% waterdicht. Twee problemen doen zich voor bij die code:

* Indien je Node-Red (re)start (Deploy) en er zou op dat moment nog een switch ON staan op het dashboard, dan kan de Function-node dit niet weten. Daardoor zal de function-Node ervan uitgaan dat de variabele die de waarde van de switchen moet bijhouden op nul wordt gezet. Hierdoor zal bij het UnSwitchen van die switch er een getal worden afgetrokken van 0. Hierdoor komt de waarde van die variabele negatief te staan, wat hier geen betekenis heeft.
* Tweede beperking van deze code is dat de omzetting  `String.fromCharCode(Number(waarde))` een omzetting doet van een decimale waarde naar een 7bit waarde. Hierdoor kunnen niet alle 8 LEDS op de shield worden gebruikt (Voor 7 LEDS werkt dit wel best goed)

Natuurlijk kan er gezocht worden om deze opstellingen beter te maken. Maar als inzicht in de werking kunnen we de bovenstaande beperkingen accepteren.

---
Veel succes,  
Dhr. Dejonghe.  
