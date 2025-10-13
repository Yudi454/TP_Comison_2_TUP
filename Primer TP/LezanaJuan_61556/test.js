// test.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function test() {
  try {
    const res = await fetch("http://localhost:3000/usuarios");
    const data = await res.json();
    console.log("Respuesta del servidor:", data);
  } catch (error) {
    console.error("Error al conectar con el servidor:", error.message);
  }
}

test();
