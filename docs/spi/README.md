---
author: [Wim Dejonghe]
description: [Korte introductie SPI communicatie.]
ms.date: [CREATION/UPDATE DATE - mm/dd/yyyy]
marp: true
title: [SPI communicatie]
---

# SPI  

![example image](./images/spi.png "An exemplary image")

---

## Introductie

Serial Peripheral Interface (SPI) is een bus-interface die in de meeste gevallen bedoeld is om data uit te wisselen tussen een microcontroller en kleine randapparaten (small peripherals) zoals schuifregisters ,  sensoren, en SD cards. Deze bus gebruikt een afzonderlijke lijn voor clock en data. Er kunnen zich meerdere van deze randapparaten bevinden op dezelfde bus (dit in tegenstelling tot een asynchrone seriële
bus). Vanuit de microcontroller wordt het device geselecteerd waarmee er moet gecommuniceerd worden door gebruik te maken van selectielijnen.

## Waarom geen seriële verbinding?

Een normale seriele poort, die herkenbaar zijn door de aanwezigheid van een TX en een RX lijn, wordt asynchroon (niet synchroon dus)genoemd omdat er geen aanwezigheid van een clock signaal op een aparte lijn. Er is dus geen garantie dat beide devices op dezlfde snelheid werken. Er horen daar dus afspraken te gebeuren om de communicatie vlot te laten verlopen. Zelfs wanneer bij juiste afspraken, kan het toch nog gebeuren dat de communicatie niet naar behoren loopt. Daar de snelheidsinsteling van een seriele poort op een device afhankelijk is van de clock frequentie (meestal een kristal oscillator) van de processor, en daar identieke oscillatoren niet voorkomen, kan het gebeuren dat de data-overdracht toch nog fout loopt.

Dit wordt bij asynchrone seriele communicatie voor een deel opgelost door gebruik te maken van synchronistiepulsen (start- en stopbits). Het datapakket wordt ingekapseld tot een framepakket. Op die manier kan de ontvanger zich synchroniseren in de tijd op de de ontvangen datastroom. Tussen beide devices moeten echter nog altijd afspraken worden gemaakt omtrent de datasnelheid (baud rate, bps). Dit kan niet afgeleid worden uit de synchronisatiebits. Kleine verschillen in werksnelheid tussen de twee devices is niet echt een probleem, daar er om de byte (+ sync bits en evt pariteit) nieuwe syncbits worden gebruikt voor de volgende byte. Het aantal bits tussen de sync bits is heel beperkt (meestal tussen de 8 a 12 bits, afhankelijk van het aantal bits in het datapakket en de aanwezigheid van een parieteit en het aantal stopbits).
