German:
Willkommen auf YouTrip! Folgend eine kurze Anleitung zur Applikation:

- Bitte erstelle eine Postgres Datenbank mit dem Namen youtrip und passe ggfs. in den application.properties den Username und das Passwort an.
- Lade die Datei "database.sql" in Postgress. Die Datei liegt in dem Git Ordner.
- Erg�nze in die Test Configurations unter VM arguments folgendes: -Dspring.profiles.active=dev
- Trage in die Runtime Configurations folgendes ein: -Dspring.profiles.active=ci
- Starte das Programm

- Gehe auf http://localhost:4200/. Hier kanst du nach einer Stadt suchen, in welcher du Aktivit�ten finden m�chtest.
- Sobald du eine Stadt ausgew�hlt hast, erh�ltst du eine Liste von Aktivit�ten
- Die Liste kannst du dann nach 4 verschiedenen Kriterien sortieren
- Wenn du dir alle Restaurants, alle Hotels, alle Museen oder alle sonstigen anschauen m�chtest, kannst du die Navbar oben benutzen.
- M�chtest du nach bestimmten Aktivit�ten in einer Stadt suchen, kannst du links die Men�bar nutzen.
- Du hast auch die M�glichkeit nach Aktivit�ten mit einem bestimmten Rating in den St�dten zu suchen
- �ber den Button "Aktivit�t hinzuf�gen" kannst du als Nutzer weitere Aktivit�ten hinzuf�gen.
- Sobald Aktivit�ten hinzugef�gt sind, kannst du auf diese klicken und es �ffnet sich eine Detailseite. Hier sind alle Details zur Aktivit�t zu finden und es erm�glicht dem Nutzer Ratings abzugeben
- Auf der Detailseite befindet sich weiterhin ein Button "Admin-Mode". Wenn man diesen klickt, ist es m�glich, Ativit�ten zu editieren oder zu l�schen sowie Ratings zu bearbeiten/l�schen.

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