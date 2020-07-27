---
author: [Wim Dejonghe]
description: [Opbouw OOP lessen IoT.]
ms.date: [CREATION/UPDATE DATE - mm/dd/yyyy]
marp: true
title: [OOP 1 + 2]
---

# Node-Red  

![example image](node-red.png "An exemplary image")

---

Node-RED is een flow gebaseerde visuele ontwikkelomgeving ontwikkeld door IBM. Het laat toe
hardware toestellen, API's en online diensten met elkaar te communiceren in het teken van het Internet of Things.

![example image](nodered1.png "An exemplary image")

Het biedt een browsergebaseerde editor die het gemakkelijk maakt om flows met elkaar te verbinden met behulp van het brede scala aan nodes die met een klik kunnen worden ingezet tijdens
de uitvoering.

Flows kunnen tevens heel makkelijk worden geëxporteerd of geïmporteerd als JSON.

---

# Node.js gebasseerd
Node.js is een open-source, platform-onafhankelijke JavaScript runtime omgeving die  JavaScript-code buiten een browser uitvoert.
De lichtgewicht runtime is gebouwd op Node.js en profiteert volledig van het eventbased, non-blocking async model. Dit maakt het ideaal om aan de rand van het netwerk te draaien op goedkope hardware zoals de Raspberry Pi en in de cloud. Met meer dan 225.000 modules in de packet repository van Node, is het eenvoudig om gamma aan nodes uit te breiden en zo nieuwe mogelijkheden toe te voegen.  

![example image](nodejs.png "An exemplary image")

---

## Node.js installeren

Start met installeren van Node.js. Surf hiervoor naar https://nodejs.org/en/.
Selecteer de LTS (Long Term Support) versie (12.16).
Volg de wizard om Node.js te installeren.

---

## Node.js testen

Open een powershell venster en type volgende command:
> node --version  

De output zo ongeveer het volgende moeten zijn:
> v12.16.1

---

# Installeren van Node-RED
Om Node-RED te installeren dien je volgende command uit te voeren in `powershell` :

> npm install -g --unsafe-perm node-red

Herstart nu voor alle zekerheid je computer.

---

# Starten van Node-RED
Node-RED dient te worden opgestart. Dit kan je realiseren door onderstaand commando uit te voeren in een `powershell` venster:

> node-red

Dit dien je telkens opnieuw te doen als je Node-RED wil gebruiken.

---

# Werken met Node-Red
Open een browser en surf naar http://127.0.0.1:1880.

![example image](nodered1.png "An exemplary image")

---

# Node-Red Flow

Een flow is een verzameling van Nodes die met elkaar zijn verbonden (bedraad) en die functioneert als een applicatie of programma.
De node-red werkruimte ondersteunt meerdere flows die allemaal afgehandeld worden in dezelfde nodejs- event-loop.

---

# Node-Red Nodes

Nodes zijn de basisbouwsteen van Node-Red.
Een node is in feite een softwareblok dat berichten verwerkt.
Een node kan ingangen en uitgangen hebben waarmee berichten tussen nodes kunnen worden doorgegeven.

Een invoer kan verbindingen van meerdere nodes accepteren en een uitvoer kan naar meerdere nodes worden uitgevoerd.

![example image](nodeflow.jpg "An exemplary image")

Verbindingen worden gemaakt tussen nodes met een "Wire".

Nodes zijn verzameld aan de linkerkant van de IDE en zijn onderverdeeld in categoriën.

![example image](catnodes.png "An exemplary image") 

![example image](node-red-screen.jpg "An exemplary image")

---

# Enkele eenvoudige veel gebruikte nodes

Er zijn twee nodes die je heel veel zult gebruiken.  
De Debug-node is te vergelijken met een breakpoint Debug knop in bijvoorbeeld Visual Studio.  Een Debug-node krijgt een message (msg) binnen en zal de inhoud ervan visualiseren in het Debug-venster.
De inhoud van een message wordt de payload van de message genoemd.
De Inject-node heeft als functie om een trigger te veroorzaken bij een event. Deze kan dus een flow activeren. De Inject-node geeft een message (msg) door via een Wire naar de volgende node.  
![example image](node-properties.jpg "An exemplary image")
Ieder node bezit eigenschappen (properties), die kunnen ingesteld worden door te dubbelklikken op de node zelf met de RMK op de muis.  

---

# Een eenvoudige flow

Je kan via een wire de inject node verbinden met de debug node. Zo maak je een eenvoudige flow.
![example image](Basic-Flow-node-red.jpg "An exemplary image")
Deze flow zal een unix timestamp injecteren in de debug node. Deze zal de payload van de message visualiseren, te zien aan de rechterkant van de IDE.

---

# Activeren (deploying) van Flows

Bij de opstart van node red worden alle flows die ge-enabled staan automatisch gestart en uitgevoerd.

Als je een flow hebt ge-editeerd of een nieuwe flow hebt gemaakt dan is het noodzakelijk om eerst te deployen om alle aanpassingen te updaten.

De deploy knop verkleurt van grijs naar rood wanneer er een wijziging is aangebracht aan de flow.  
![example image](node-red-deploy.jpg "An exemplary image")
Je kan ervoor kiezen om alle flows, gewijzigde flows of flows te restarten te deployen in de workspace.

---

# Meer over een Node-Red message object

Een node red flow bestaat uit een serie van interconnected nodes.(wired nodes).
Alle nodes moeten een input hebben en kunnen 0 of multiple outputs hebben.
Nodes wisselen data met elkaar uit door gebruik te maken van het (JavaScript) message object (msg object).

Iedere node ontvangt een message object van de vorige node. Deze kan dan dit message object aanpassen/doorgeven aan de volgende node in de flow.

---

## Het Msg Object

Het message (msg) Object is een standard JavaScript object en bezit verchillende eigenschappen of delen.

Je kan de message properties zien door die naar een debug node te sturen.

![example image](node-red-debug-node.jpg "An exemplary image")

Standaard zal de debug node het msg.payload property displayen, maar je kan alle eigenschappen van de message displayen door alle eigenschappen te activeren (complete message object).

![example image](node-red-debug-node-edit.jpg "An exemplary image")

Een voorbeeld van het message object properties bij een inject node.

![example image](inject-node-message-object.jpg "An exemplary image")

---

### Inject Node Message Object

Volgende eigenschappen bezit een JavaScript Message

- payload
- topic
- _msgid

Een msg object afkomstig van een MQTT input node bezit de volgende eigenschappen (zoals te zien in volgende afbeelding):

- payload
- topic
- qos
- _msgid
- retain

 ![example image](node-red-view-properties.jpg "An exemplary image")

 De _msgid property is een message identifier toegevoegd door node-red en  kan gebruikt worden om berichtobjecten terug te vinden.

 Msg object properties kan om het even welk JavaScript type zijn.

- String
- Integer
- Object
- Boolean

---

## Wijzigen (Modified) van het msg Object
Node-Red bevat verschillende nodes die in staat zijn messages objecten te wijzigen zonder JavaScript code zelf te meoten schrijven.

Deze nodes zijn change, split, join, switch

Informatie omtrent een node kan weergegeven worden door de node op een flow te slepen en te selecteren.

 ![example image](node-red-node-info.jpg "An exemplary image")

 Er is ook een veel gebruikte function node, maar daar is het noodzakelijk om de Javacode zelf te schrijven.

---

## Toegang tot de the msg Properties
Je kan de msg properties op dezelfde manier behandelen als een JavaScript object.

De inhoud van de message wordt de payload genoemd en kan als volgt opgevangen worden bij een binnenkomende message in een node:

> var payload=msg.payload;

En kan als volgt gewijzigd worden:

> msg.payload=payload;

Gelijkaardig kan het topic van de message worden bereikt:

> var topic=msg.topic;

en kan dus ook bijgevolg worden gewijzigd bij het versturen van de message:

> msg.topic= topic;

Bij het wijzigen van een message wordt steeds verwezen naar de payload, maar je kan om het even welke eigenschap van de message wijzigen. Dit komt voor bij bijvoorbeeld de change node.

  ![example image](msg-change-node-example.jpg "An exemplary image")

---

### Toevoegen van Properties aan het msg Object
Je kan eigenschappen toevoegen aan het msg object. Bijvoorbeeld door bij het verpakken van sensordata in een message. Dit zou zo kunnen:

> sensors={sensor1:20,sensor2:21}

En voeg die toe aan het msg object door:

> msg.sensors=sensors

Dit zal worden doorgegeven aan de volgende node samen met de reeds aanwezige properties van de message.

---

### Voorkomende fouten
Wanneer er gewerkt wordt met het message object dan worden er waarschijnlijk fouten gemaakt die te maken hebben met:

- Een functie probeert een bericht te versturen van het type number node red
- Een functie probeert een bericht te versturen van het type string node red
- Beide worden veroorzaakt doordat er geprobeerd wordt om een nummer of een string toe te wijzen aan het message object in plaats van een object toe te wijzen, zoals volgende voorbeelden.

> msg=1;
> msg="This is invalid";

Een ander veelvoorkomende fout is bij het wissen (delete) de bestaande msg property of het niet doorgeven ervan naar de volgende node.

> msg={};
> return msg;

Het volgende is juist (valid), maar alle originele properties van het msg object zijn verloren voor de volgende node.

> msg1={};
> msg1.payload="test";
> return msg1;

---
### Interessant : 

[Meer info over de function node](http://www.steves-internet-guide.com/node-red-functions/)

---

## Dashboard in Node-Red
Een dashboard is eigenlijk een website die via Node-Red kan maken met de mogelijkheid om controls te plaatsen die enerzijds als functie hebben om iets te bedienen, anderzijds om een bepaalde toestand van iets weer te geven.  

[YouTube](https://www.youtube.com/watch?time_continue=123&v=e70ta8jI_nM&feature=emb_logo)


Standaard is dit niet aanwezig in de Node-Red installatie. Dit is een module die aan Node-Red kan worden toegevoegd. Zo zijn er wel meer modules die je kan toevoegen aan Node-Red. We spreken dus van de Node-Red dashboard is een add-on module.

---

### Installatie Dashboard:

[Installatie dashboard, klik hier](https://flows.nodered.org/node/node-red-dashboard)

---
De installatie zorgt ervoor dat er een nieuwe categorie aan de controls van Node-red worden toegevoegd aan de Node-Palette. Deze controls zijn UI (User Interface)-nodes. Ze bevatten zowel input- als output nodes. Wil je die gebruiken, sleep die dan gewoon op het canvas van Node-Red.

  ![example image](node-red-dashboardA.jpg "An exemplary image")

---

### Gebruik van de Node-Red Dashboard

Het dashboard of display nodes verschijnt in de User interface (UI) dashboard. Om die te bekijken gebruik de **url - host:1880/ui**  
Dit zou er zo kunnen uitzien:

  ![example image](node-red-dashboard-layout.jpg "An exemplary image")  

Je kan dus meerdere **display pages** hebben die **tabs** worden genoemd. Iedere tab bezit een **naam**.

Op een Page de display nodes kunnen onderverdeeld worden in **Groups**.

Iedere dashboard-node bezit drie belangrijke instellingen (settings):

- De **Group Name** - group en tab voorbeeld in afbeelding : **Group Name** = *control* en **tab** = *MyHome*
- **Label Name** - Dit is de naam van het dashboard
- **Name** - Dit is de naam van de Flow-Workspace.

  ![example image](dashboard-node-properties.jpg "An exemplary image")  

---

### Controlling de dashbard layout
De layout van de User Interface (UI) kan opgemaakt worden via de dashboard tab (derde kolom van het main screen) van de admin page, selecteer **layout**.

Nieuwe **tabs** en **groups** kunnen worden aangemaakt. Dit is meestal de plaats waar je start bij een nieuw design.

  ![example image](node-red-dashboard-layout-1.jpg "An exemplary image")  

Het bovenste venster toont een flow met drie display tabs genaamd: *MyHome*, *Bedroom* en *Lounge*.

In de onderstaande figuur is hetvolgde van toepassing:
De **MyHome** tab bezit twee display Groups genaamd *display* en *control*.
De **Display** group bezit twee display nodes: *Gauge* en *light status*.
De **Control** group bezit ook twee display nodes: *switch* en *slider*.

  ![example image](node-red-dashboard-ui.jpg "An exemplary image")  

Als je nu wilt via de **Control** group de **Display** group bedienen via een Node_red flow, dan zou die er zo uitzien:

  ![example image](node-red-dashboard-demo-flow.jpg "An exemplary image")  

---

