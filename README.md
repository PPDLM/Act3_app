# Actividad 3: React Native + Firebase

App en Expo (React Native) que lee la colección `products` de Cloud Firestore,
la muestra en un `FlatList` y, al tocar un elemento, abre una vista de detalle
que consulta ese documento por su ID con `getDoc`.

## Pasos

1. En <https://console.firebase.google.com> crea un proyecto, agrega una **App web** (`</>`) y copia su configuración.
2. En **Firestore Database** crea la base de datos en **modo de prueba**.
3. `cp .env.example .env` y pega los valores de la configuración.
4. `npm run seed` → agrega 5 documentos (name, category, price, stock, description).
5. `npx expo start` y abre la app en Expo Go, un emulador (`a`) o web (`w`).

## Estructura

- `src/firebaseConfig.js` – inicializa Firebase y exporta `db`.
- `src/screens/ListScreen.js` – `getDocs` + `FlatList`.
- `src/screens/DetailScreen.js` – `doc` + `getDoc` con el ID recibido; muestra todos los campos.
- `scripts/seed.mjs` – carga los 5 documentos de ejemplo.
