# proyecto-web2
Repositorio para el desarrollo del proyecto integrador, aplicaicón tipo slack, de la materia "Programación de aplicaciones de escritorio"

## Autores: 
Carlos Eduardo Garay Olmos, Martín Santiago Herrera Soto

## Descripción
El siguiente proyecto es una aplicación estilo discord o slack desarrollada con Angular y Node.js. Tiene la capacidad de agregar amigos y mandar mensajes a estos,crear grupos y canales de texto para mandar mensajes entre los integrantes de estos. 

## Dependencias 
### Backend:
- dotenv para usar variables de entorno para el puerto y liga a la base de datos en Atlas
- express para manejar las rutas
- mongoose para la conexión con la base de datos 
- swagger para la documentación de los enpoints del API

### Frontend:
- Utiliza el framework de angular
- Se agregó angular material para el diseño de los componentes de las páginas

## Comandos
### Backend
- Ejecutar en la terminal desde Backend> 
- npm install 
- npm start 
- Se puede ver la documentación del api con la url localhost:3000/swagger, es necesario especificar este puerto y la liga a la base de datos en el archivo .env


### Frontend
- Ejecutar en la terminal desde proyecto-front>
- npm install
- ng serve
- El proyecto se despliega en localhost:4200