---
author: [Wim Dejonghe]
description: [Korte introductie tot Micro:Bit met MicroPython.]
ms.date: [CREATION/UPDATE DATE - mm/dd/yyyy]
marp: true
title: [MicroBit MicroPython]
---

# Micro:Bit

![example image](./images/bbc-microbit-microbit-v22.png "An exemplary image")

---

## Introductie

De Micro:Bit is een microcontroller zoals er vele op de markt te verkrijgen zijn zoals Arduino, Nucleo, PIC, ... Deze worden heel frequent gebruikt zowel in industriële ontwikkeling, prototyping, als bij hobby-isten. De Micro:Bit is populair door zijn lage kostprijs, zijn laagdrempelige programmeeromgeving, de aanwezigheid van vele sensoren op de Micro:Bit, de veelheid aan demo en info op het internet. 

De Micro:bit is een geweldige manier om de basisprincipes van programmeren en informatica te leren. De Microsoft MakeCode-coderingsomgeving op basis van blokken is een krachtige en intuïtieve manier om de Micro:bit te laten reageren op allerlei soorten invoer, en u kunt fundamentele concepten zoals iteraties, voorwaardelijke instructies en variabelen introduceren met MakeCode.
Studenten richten zich vaak vooral op het 5x5 LED-scherm voor het leveren van output (actuator). Hoewel dit de meest direct toegankelijke manier is om een reactie op een of andere input te zien, zijn er veel meer creatieve mogelijkheden wanneer je je leerlingen aanmoedigt om de Micro:Bit te zien als een "brein" dat fysieke, tastbare creaties kan besturen.

Deze creaties hoeven niet complex of technisch hoogstaand te zijn. Het is geweldig om studenten te laten bouwen met gemeenschappelijke huishoudelijke benodigdheden. Omdat de Micro:bit zo licht is en zoveel sensoren ondersteunt, kan hij gemakkelijk in een fysiek ontwerp worden opgenomen, zolang studenten maar vooruit plannen voor de grootte en het gewicht. Een van de eerste vragen die je studenten zou kunnen stellen, is "Waar past de Micro:Bit in je creatie?"

De Micro:Bit kan in verschillende talen worden geprogrammeerd. De meest gebruikte programmeeromgeving voor kinderen in de Microsoft MakeCode editor. Met deze omgeving kan er online worden geprogrammeerd in 4 verschillende talen: Grafische blokken, MakeCode JavaScript, MakeCode Python. Wij zullen hier echter als initiatie hier de MicroPython gebruiken. Dit heeft het voordeel dat de gebruiker leert omgaan met de syntax van Python. In deze omgeving wordt een soort operating systeem geïnstalleerd op de Micro:Bit die volledig kan bestuurd worden met de standaard Python taal. 

![example image](./images/mb_hardware.png "De hardware van de µBit")

## Activity: De programmeeromgeving

Er bestaan verschillende manieren om de Micro:Bit in de Python programmeertaal te programmeren. Dit kan via Visual Studio Code, dit moet je dan zelf downloaden en installeren op uw computer, maar er bestaat ook een online omgeving voor MicroPython voor de Micro:Bit. Op die manier hoef je niets te installeren op uw computer. Ga hiervoor naar de website : https://microbit.org/ en klik bovenaan op "Let's code" en kies op die pagina voor de link : Python editor.

![example image](./images/microbitorg.png "De online programmeeromgeving die MicroPython ondersteunt.")

Herken hierop:
<ol>
  <li>Reference : Python bibliotheek</li>
  <li>Simulator</li>
  <li>Programmeer Python code zone</li>
</ol>

## MicroPython code

Initialisatie : Omdat we werken met een Micro:bit moeten we dit steeds aangeven bovenaan de code.  Importeer steeds (*) om (bijna) alle (hardware)mogelijkheden van de Micro:Bit te gebruiken. Doe dit door bovenaan in de Python code te schrijven :

```python
from microbit import *
#Dan de rest van de python code
```

Binnen een programmeertaal zijn een aantal zaken belangrijk en keren steeds terug in andere programmeertalen. Dit zijn:
<ol>
  <li>Commentaar in Python begint met een #.</li>
  <li>Variabelen: reserveren van geheugenplaats om data (tijdelijk) in te bewaren</li>
  <li>Soorten variabelen : type : 
    <ul>
        <li>Getallen zonder komma: integer</li>
        <li>Getallen met komma: float</li>
        <li>Boolean: variabele die maar twee waarden kan bevatten: 1/0 of True/False </li>
        <li>String: variabele die tekst kan bevatten (groepering van characters) </li>
        <li>char: variabele die maar 1 character/symbool kan bevatten </li>
    </ul>
  </li>
  <li>Iteraties: herhalingen:
    <ul>
        <li>While Loop: herhaling die steeds wordt herhaald als voorwaarde True is (aantal loops is niet gekend)</li>
        <li>For Loop: herhaling die steeds wordt herhaald als voorwaarde True is (aantal loops is gekend)</li>
    </ul>
  </li>
  <li>Converties of type casting: omzetting van ene type naar een ander type variabele</li>
  <li>Concatenatie van strings: samenvoegen van twee strings tot 1 string (aan elkaar kleven)</li>
  <li>Maken van eigen functies met daarbij parameters en return waarden</li>
</ol>

**Iets meer over variabelen:**
Tekst die bestaat uit meerdere tekens, omsloten door enkele of dubbele aanhalingtekens wordt een **string** genoemd . (“string”) </br>
Een getal kan een **integer** zijn (geheel getal) of een **float** (een komma getal)( Let op! moet een punt zijn i.p.v. een komma)</br>
Een **boolean** is een variabele die maar twee toestanden kent: 0 of 1 , soms wel als **False** en **True** uitgedrukt.  </br>
**Variabele :** We kunnen ook iets opslaan in het geheugen van de computer (= declaratie = reservatie van geheugenplaatsen). Aantal geheugenplaatsen is afhankelijk van het type variabele (int, float, string, bool). Een variabele krijgt steeds een (logische)naam die de programmeur zelf kan kiezen.

![example image](./images/vars.png "De soorten variabelen.")

**Iets meer over iteraties:**

Door Python code te schrijven kan een statement, instructie één keer worden uitgevoerd, door die code op te nemen in een While-True statement kan een oneindige herhaling worden gecreëerd waarbij dit statement telkens zal worden herhaald. (zie verder) 

## Micro:Bit specifieke MicroPython functies

Deze functies hebben specifieke bertrekking tot de onboard sensoren en actuatoren.

### Led matrix

```python
from microbit import *
display.show(<nummer>)
display.scroll(<nummer>)
```
Toon hiermee 1 cijfer en experimenteer met getallen bestaande uit meerdere cijfers.

**Toon 1 keer een getal:**
```python
from microbit import *

display.scroll(1234)
```
**Herhaal telkens de weergave van een getal:**
```python
from microbit import *

while True:
  display.scroll(1234)
```
![example image](./images/whileloop.png "De While Loop")

**Gebruik van een variabele:**

Je zou dit kunnen programmeren om eenmalig een getal te laten aftellen:
```python
from microbit import *
display.show(4)
sleep(500) #laat de microcontroller een beetje slapen 500 milliseconden - wacht om volgend statement uit te voeren
display.show(3)
sleep(500)
display.show(2)
sleep(500)
display.show(1)
sleep(500)
display.show(0)
sleep(500)
while True:
  display.scroll('Hello')
```
Als je de tussentijden wesnt aante passen, moet je nu overal de 500 aan passen naar een nieuwe waarde. Dit kan éénmalig met een variabele gebeuren.

```python
from microbit import *
wacht_tijd=500 #variabele met de naam wacht_tijd en de inhoud ervan is een integer met waarde 500
display.show(4)
sleep(wacht_tijd) 
display.show(3)
sleep(wacht_tijd)
display.show(2)
sleep(wacht_tijd)
display.show(1)
sleep(wacht_tijd)
display.show(0)
sleep(wacht_tijd)
while True:
  display.scroll('Hello')
```

**Gebruik van een For-Loop:**

Stel dat je een aftelling wilt maken niet van 4 naar 0, maar van 1000000 naar 0. Dan wordt het programma onzinnig met een miljoen aan dezelfde statements.
Beter is hiervoor een FOR-loop (ook een herhalings iteratie) te gebruiken. In een For-loop is het aantal herhalingen gekend en wordt bijgehouden in een variabele die telkens met 1 wordt verminderd. 

![example image](./images/forloop.jpg "De For Loop")

```python
from microbit import *
wacht_tijd=500 #variabele met de naam wacht_tijd en de inhoud ervan is een integer met waarde 500

for i in range (4): #herhaling van 4 keer met gebruik van een integer variabele met naam i
  display.show(i)
  sleep(wacht_tijd) 

while True:
  display.scroll('Hello')
```

```mermaid
flowchart TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    C --> D[Rethink]
    D --> B
    B ---->|No| E[End]
```

