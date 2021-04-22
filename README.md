Demo of the shopping cart is available on: ''

Project runs in [http://localhost:3000] after running 'npm start' in your terminal

Het formulier is gebouwd aan de hand van de onderstaande opdracht:

Inleiding

Om je specialisme en kennis goed te kunnen peilen hebben we een opdracht voor je opgesteld. De richtlijn voor deze case is 4 uur (​kleine uitloop mag)​. Vervolgens gaan wij de case beoordelen. De opdracht hoeft niet af binnen de tijd. Probeer ​zo ver mogelijk​ te komen als je kunt en beoordeel zelf waar je de focus van je uitvoering legt, er is geen fout!
Je mag je project aanleveren als een github/bitbucket project of als ZIP. Uiteraard netjes als je ons verteld hoe we je project kunnen starten.Succes!

Case: Incentronauten formulier

Nu word je straks aangenomen als Incentronaut en ga je knallen bij de klant. Te gek! wel hebben we nog wat informatie van je nodig. Hiervoor willen we je vragen om een formulier te bouwen waar ook een snufje slimmigheid in zit.

● Voorletters (verplicht)
● Tussenvoegsel
● Achternaam (verplicht)
● Postcode (verplicht, validatiecheck)
● Straatnaam (wordt opgehaald via een postcode check)
● Stad (wordt opgehaald via een postcodecheck)
● Huisnummer (verplicht, alleen nummers)
● E-mail adres (verplicht, validatie check)

Bij het invoeren van een postcode en huisnummer dient er een check gemaakt te worden middels een API. Deze gaat de bijbehorende straat en stad opzoeken en automatisch aanvullen in het formulier. Een voorbeeld van een dergelijke API is ​http://photon.komoot.de/​. Je staat vrij om zelf een andere api te gebruiken.

Nadat het formulier is ingevuld en gevalideerd is kan de data weggeschreven worden naar een ​dummy URL, bijvoorbeeld: ​http://mockbin.org/​.

Er zijn geen restricties op het gebruik van libraries of frameworks, dus je kan helemaal los gaan, mocht je dit willen!

Bonus punten!
● Validatie berichten
● Laad indicator
● Eyecandy