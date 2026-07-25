# TikTok Trivia Live Server

Servidor para juego de preguntas en vivo conectado con TikTok LIVE y una aplicación Android.

## Funciones

- Conexión con TikTok LIVE.
- Lectura de comentarios del chat.
- Validación automática de respuestas.
- Sistema de puntos.
- Ranking TOP 10.
- Partidas de 10 preguntas.
- Comunicación en tiempo real con Android mediante WebSocket.

---

## Configuración

Archivo:

config.js

Ejemplo:

```javascript
export const CONFIG = {

    tiktokUser:"jandopk2",

    port:3000,

    roundQuestions:10

};

Instalación
Instalar dependencias:
npm install
Iniciar servidor:
npm start
Conexión Android
La aplicación se conecta mediante:
ws://SERVIDOR:3000
En servidor público:
wss://SERVIDOR
Flujo
TikTok LIVE
↓
Conector TikTok
↓
Motor Trivia
↓
WebSocket
↓
APK Android
Usuario configurado
TikTok LIVE:
jandopk2
