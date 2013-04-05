Der TableHelper:

Das Model ist ganz praktisch wenn ich mir aus Daten eine Tabelle zusammen basteln will.
Einfach nur die Daten darstellen, wäre ja zu einfach. Was ich hier aber will ist zusätzliche Optionionen den Daten hinzu
zu fügen. Dann soll eine weiter Spalte entstehen, in der ich die Optionen hinterlege. Diese Spalte bekommt die Überschrift 
Options. dort soll dann zusätzlich noch ein Create-Button erscheinen - wenn gewünscht.
So lassen sich dann dann ziemlich einfach sog. CRUD Aktionen Darstellen. Was man dann nur noch benötigt sind einfache Methoden
für das Erstellen, Bearbeiten, Löschen oder Aktivieren des Items.

Wichtig: Dieses Modul erstellt keinen HTML-Code, sondern nur ein schönes Array, dass ich dann einfach in nem Jade-Template 
rendern kann.

So wird das Modul eingebunden:

Helper als Modul einbinden (hier am Bsp von node.js)

```
    var helper = require("helper");
```
Das Module Helper habe ich zuvor local meiner Application hinzugefügt

Dann die Tabelle erstellen, im Grunde ist der helper eine Factory:

```
 var table = new (helper.table);
```

und nun muss nur noch die create-Methode aufgerufen werden, der man die gewünschten Optionen übergibt. Diese gibt einem dann das "schöne" Array zurück.

```
    var result = table.create({
        "head" : ["Name","Anschrift",...],
        "option" : {
            "create"    : true, //Wenn ich einen Create-Button haben will, erscheint nur Tabellen-kopf
            "delete"    : true, //Wenn ich einen delete-Button haben will
            "edit"      : true, //Wenn ich einen edit-Button haben will
            "active"    : true, //Wenn ich einen Activierungs-Button haben will
        }
        "data"  :   [
            {
                "_id"       : "132414", //Wichtige Referenz für die Datenbank oder ähnliches
                "_active"   : 0,        //oder 1, wenn active, muss nur übergeben werden, wenn Aktivierungs-Button gewollt ist
                "row"       :[Max,Maxstraße 5 12345 Maxstad]
            },
            {
                ...
            }
        ]
    });
 ```

Den Test dafür findet ihr unter: https://github.com/ElectricMaxxx/shoppingList/blob/master/test/helperTable_test.js

