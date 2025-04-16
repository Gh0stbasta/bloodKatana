playername in dashborad initialisiert
der muss noch im localstorage gespeichert werden
damit er nachher in arena.js rausgeholt und zum connecten für den room verwendet werden kann.
zum connecten muss roomnumber, playername und chosencharacer (was jetzt ne nummber ist) gesendet werden.

dann kann man mit socket emit startgame anfangen
wo zeitgleich das arena setup stattfinden muss

dann müssen die socket onPlayerTurn initialisiert werden
hier muss dann zeitgleich ein arenaupdate stattfinden

mit jedem turn muss aber serverseitig auch die win condition abgefragt werden
