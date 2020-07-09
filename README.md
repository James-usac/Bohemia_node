# Bohemia_node

Es un proyector que trabaje con nodejs , mongodb y express.
Utilizando pruebas unitarias con Jasmine.

Express generator // nos da una estructura
`npm install express-generator -g`

Pasemos a crear nuestro primer proyecto:
 **express name --view=tipo de vistas**
 
`express red-bicicletas --view=pug`

instalar nodemon como desarrollo
`npm install nodemon --save-dev`

Para descargar la plantilla.
https://startbootstrap.com/

pasar html a pug
https://html-to-pug.com/

Para correr proyecto con nodemon
`npm run devstart`

Para colocar los mapas le doy 
https://leafletjs.com/

Para el mapa usamos openstreetmap  que es open source 

`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`

Pueden usar el de wikipedia
`https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png`

## Semana 2

Utilización de Jasmine para las pruebas unitarias

Para agregarlo a nuestro proyecto como dependencia del ambiente de desarrollo, únicamente debemos:

Primero, instalarlo globalmente para poder ejecutarlo directamente desde la terminal.
` npm install –g jasmine`

Luego, lo agregamos como dependencia desarrollo.
` npm install --save-dev jasmine`

Luego, debemos inicializar el módulo haciendo:
` node node_modules/Jasmine/bin/Jasmine init `
Y finalmente, agregamos una tarea en el package.json, en la sección de scripts:

`"scripts": {"test": jasmine}`

Para correr la pruebas usamos el comando 
`npm test`
