// test_post.js
fetch("http://localhost:3000/usuarios", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    nombre: "Carlos",
    email: "carlos@email.com"
  })
})
  .then((res) => res.json())
  .then((data) => console.log("Respuesta del servidor:", data))
  .catch((err) => console.error("Error al hacer POST:", err));
