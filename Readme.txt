German:
Willkommen auf YouTrip! Folgend eine kurze Anleitung zur Applikation:

- Bitte erstelle eine Postgres Datenbank mit dem Namen youtrip und passe ggfs. in den application.properties den Username und das Passwort an.
- Lade die Datei "database.sql" in Postgress. Die Datei liegt in dem Git Ordner.
- Ergänze in die Test Configurations unter VM arguments folgendes: -Dspring.profiles.active=dev
- Trage in die Runtime Configurations folgendes ein: -Dspring.profiles.active=ci
- Starte das Programm

- Gehe auf http://localhost:4200/. Hier kanst du nach einer Stadt suchen, in welcher du Aktivitäten finden möchtest.
- Sobald du eine Stadt ausgewählt hast, erhältst du eine Liste von Aktivitäten
- Die Liste kannst du dann nach 4 verschiedenen Kriterien sortieren
- Wenn du dir alle Restaurants, alle Hotels, alle Museen oder alle sonstigen anschauen möchtest, kannst du die Navbar oben benutzen.
- Möchtest du nach bestimmten Aktivitäten in einer Stadt suchen, kannst du links die Menübar nutzen.
- Du hast auch die Möglichkeit nach Aktivitäten mit einem bestimmten Rating in den Städten zu suchen
- Über den Button "Aktivität hinzufügen" kannst du als Nutzer weitere Aktivitäten hinzufügen.
- Sobald Aktivitäten hinzugefügt sind, kannst du auf diese klicken und es öffnet sich eine Detailseite. Hier sind alle Details zur Aktivität zu finden und es ermöglicht dem Nutzer Ratings abzugeben
- Auf der Detailseite befindet sich weiterhin ein Button "Admin-Mode". Wenn man diesen klickt, ist es möglich, Ativitäten zu editieren oder zu löschen sowie Ratings zu bearbeiten/löschen.

English:
Welcome to YouTrip! Here is a short guide to the application:

- Please create a postgres database named youtrip and adjust the username and password in the application.properties.
- Load the file "database.sql" into Postgres. The file is located in the Git folder.
- Add the following to the Test Configurations under VM arguments: -Dspring.profiles.active=dev
- Enter the following in the Runtime Configurations: -Dspring.profiles.active=ci
- Start the program

- Go to http://localhost:4200/. Here you can search for a city where you want to find activities.
- Once you have selected a city, you will receive a list of activities
- You can then sort the list according to 4 different criteria
- If you want to see all the restaurants, all the hotels, all the museums or all the others, you can use the navigation bar above.
- If you want to search for specific activities in a city, you can use the menu bar on the left.
- You also have the possibility to search for activities with a certain rating in the cities
- With the button "Add activity" you can add further activities as a user.
- As soon as activities are added, you can click on them and a detail page will open. Here you can find all details about the activity and it allows the user to give ratings
- On the detail page there is still a button "Admin-Mode". If you click on this button, it is possible to edit or delete activities and to edit/delete ratings.
- If you want to add or edit cities, you can do so via "Admin" on the navigation bar.