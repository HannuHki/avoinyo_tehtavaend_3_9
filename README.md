Herokun sivu:
https://hannu-avoinyo-tehtavaend-3-9.herokuapp.com/

Siinä toimii Postmanilla POST: https://hannu-avoinyo-tehtavaend-3-9.herokuapp.com/api/persons
{
	"name": "Nimi3 Nimi3",
	"number": "040-12333"
}

GET: https://hannu-avoinyo-tehtavaend-3-9.herokuapp.com/api/persons


tehtävässä 3.2 rivinvaihto tehdään antamalla: "<br>"
tehtävässä 3.3 puuttuva id palauttaa 404
tehtävässä 3.4 poistettu id palauttaa 204. Kun postmanilla annetaan DELETE id=2, person ei enää näy listalla.
tehtävässä 3.9 frontendissä on muutettu persons.js: const baseUrl = '/api/persons'
               ja App.js funktiossa useEffect(): .get('http://localhost:3001/api/persons')
               REST client pyynnöt onnistuvat: GET palauttaa nimiluettelon
               ja POST palauttaa statuksen 200 refressauksen jälkeen.
               DELETE on blocked.
