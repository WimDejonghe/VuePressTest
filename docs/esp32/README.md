---
author: [Wim Dejonghe]
description: [Korte intleiding esp32 - Huzzah.]
ms.date: [CREATION/UPDATE DATE - mm/dd/yyyy]
marp: true
title: [esp32 Huzzah]
---

# esp32

![example image](./images/feather_pinouttop.jpg "An exemplary image")

---

## Introductie

### Hardware

Er zijn verschillende versies van de esp32 op de markt te verkrijgen. Verschillende fabrikanten hebben hun eigen versie op de markt gebracht. Het nadeel van dit aanbod is dat er naar pincompatibiliteit geen afspraken zijn gemaakt en er dus afwijkingen kunnen zijn op dat vlak tussen vershillende types esp32. 
In deze cursus wordt de focus gelegd op de Adafruit Feather HUZZAH32 ESP32 4Mb. 
Meer info is te vinden op : <https://www.adafruit.com/product/3405>

### Software

De esp32 kan via verschillende platformen worden geprogrammeerd. Het is heel populair om te doen via de Arduino IDE <https://www.arduino.cc/en/software>. Echter zullen we hier Visual Studio Code gebruiken. Visual Studio Code, vanaf nu VSC, is een IDE die voor verschillende ontwikkelingen kan worden gebruikt en wordt in de professionele wereld heel veel gebruikt. Je kan VSC gebruiken voor ontwikkelingen in verschillende talen zoals JAVA, Python, C, .... Dus hiermee ervaring krijgen heeft zeker zijn voordeel. VSC biedt voor de esp32 niet alleen de mogelijkheid om code te schrijven, maar ook om die te compileren en die te downloaden in de esp32 microcontroller zelf. Tevens bezit VSC een Serial Terminal scherm die het mogelijk maakt om tijdens de run van de esp32 serieëel te kunnen uitwisselen. Dit kan een ondersteuning zijn voor het debuggen van uw code. 

Een echte debug tool met breakpoints is zonder extra hardware echter niet mogelijk. <https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/jtag-debugging/index.html>

## Installatie + preparatie Visual Studio Code

Installeer VSC via <https://code.visualstudio.com/download>.

Om binnen VSC softwarecode te kunnen werken met de esp32 moet je VSC uitbreiden met een extra plugin. Hier wordt gebruik gemaakt van PlatformIO (PIO). Installatie via  <https://randomnerdtutorials.com/vs-code-platformio-ide-esp32-esp8266-arduino/>.

![example image](./images/vsc1.jpg "An exemplary image")


Met Visual Studio kunnen WPF applicaties worden gemaakt. Men kan er ook voor zorgen dat een dergelijke applicatie een dashboard is voor de Nucleo. Op die manier kan er worden voor gezorgd dat de bla bla ......

