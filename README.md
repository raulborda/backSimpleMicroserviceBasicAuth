# Microservicio de Suma con Autenticación

Este proyecto es un servicio API REST simple que realiza la suma de dos números aleatorios obtenidos de otro servicio. El acceso a la API está protegido con autenticación básica HTTP.

## Características

* Endpoint REST para sumar dos números aleatorios
* Autenticación básica HTTP para proteger el acceso
* Comunicación con otro servicio para obtener los números aleatorios
* Configuración mediante variables de entorno

## Requisitos previos

* Node.js (versión recomendada: 14.x o superior)
* NPM o Yarn
* Servicio de números aleatorios corriendo en el puerto 3002

## Instalación

1. Clonar este repositorio:
   ```
   git clone <url-del-repositorio>
   cd <nombre-del-directorio>
   ```
2. Instalar las dependencias:
   ```
   npm install
   ```
3. Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   PORT=3000
   ```

## Dependencias

* express: Framework web para Node.js
* axios: Cliente HTTP para realizar peticiones a otros servicios
* dotenv: Para cargar variables de entorno desde un archivo .env

## Uso

1. Iniciar el servicio:
   ```
   npm start
   ```
2. El servidor se ejecutará en `http://localhost:5000`
3. Para acceder al endpoint de suma, utilizar las siguientes credenciales:
   * Usuario: raul
   * Contraseña: 1234

### Ejemplo de solicitud con curl

```bash
curl -X GET http://localhost:3000/sum -u raul:1234
```

### Respuesta esperada

```json
{
  "suma": 15  // El valor dependerá de los números aleatorios generados
}
```

## Estructura del proyecto

* `index.js`: Punto de entrada de la aplicación que configura el servidor Express, middleware de autenticación y rutas
* `.env`: Archivo para configurar variables de entorno (no incluido en el repositorio)

## Servicios externos

Este servicio depende de otro servicio que proporciona números aleatorios, que debe estar ejecutándose en:

```
http://localhost:3002/random
```

El formato esperado de respuesta es:

```json
{
  "num1": 7,
  "num2": 8
}
```
