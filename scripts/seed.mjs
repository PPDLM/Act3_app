// Agrega 5 documentos a la colección "products" en Cloud Firestore.
// Uso: node --env-file=.env scripts/seed.mjs
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const app = initializeApp({
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
});
const db = getFirestore(app);

const products = [
  { name: 'Laptop', category: 'Electrónica', price: 15999, stock: 8, description: 'Laptop de 14" con 16 GB de RAM' },
  { name: 'Audífonos', category: 'Electrónica', price: 1299, stock: 25, description: 'Inalámbricos con cancelación de ruido' },
  { name: 'Cafetera', category: 'Hogar', price: 899, stock: 12, description: 'Cafetera de goteo para 12 tazas' },
  { name: 'Mochila', category: 'Accesorios', price: 649, stock: 30, description: 'Mochila impermeable de 25 L' },
  { name: 'Libro de JavaScript', category: 'Libros', price: 459, stock: 15, description: 'Guía práctica de JavaScript moderno' },
];

for (const p of products) {
  const ref = await addDoc(collection(db, 'products'), p);
  console.log(`Agregado ${p.name} -> ${ref.id}`);
}
process.exit(0);
