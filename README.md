Trabajo Práctico Semana 2 — Tecnicatura Universitaria en Programación — Segundo Año — Comisión 2

Profesor: Chocobar Matías

🧾 Contexto del TP

En la entrega anterior cada grupo recibió un TP asignado aleatoriamente y comenzaron su desarrollo.
Para esta semana 2, los proyectos fueron intercambiados aleatoriamente entre los 17 grupos
de manera que cada grupo trabajará ahora sobre un proyecto iniciado por otro grupo.

Esto busca que aprendan a:

trabajar sobre código que no escribieron ustedes

comprender arquitectura ajena

mantener coherencia sobre código heredado

🎯 Objetivo del TP — Semana 2

Sobre el proyecto que ahora se encuentra dentro de tu carpeta de grupo, deberán:

Adaptar la arquitectura al nuevo esquema 

Implementar:

Autenticación con JWT

Hash de contraseña (bcrypt)

Nodemailer

Reset / Recovery de contraseña vía mail

Respetar estructura modular y buenas prácticas

IMPORTANTE:
Las carpetas de TP_Grupales NO están vacías. Cada carpeta contiene un proyecto ya iniciado.
Deben trabajar sobre el proyecto que ahora les corresponde, NO sobre el que hicieron antes.

👥 Roles y flujo de trabajo del grupo
ROL DEL LÍDER

Entra a su carpeta de grupo dentro de TP_Grupales/Grupo_X

Actualiza allí todo el código a la nueva arquitectura

Integra aportes del equipo

Realiza PULL REQUEST al repositorio central del profesor

ROL DE LOS INTEGRANTES

Actualizan su fork desde el repo central (upstream)

Crean rama individual con formato:
Nombre-Apellido-Legajo

Suben cambios y hacen PR al repositorio del LÍDER

🔧 Instrucciones técnicas de Git (obligatorio)
# 1) Configurar upstream al repo del profesor (solo primera vez)
git remote add upstream https://github.com/ChocobarMatias/TP_Comison_2_TUP.git

# 2) Actualizar fork antes de trabajar
git pull upstream main

# 3) Crear rama personal
git checkout -b Nombre-Apellido-Legajo

# 4) Subir cambios
git add .
git commit -m "Implementación JWT / hash / mail / estructura"
git push origin Nombre-Apellido-Legajo

# 5) Integrantes → PR al Líder
# 6) Líder → PR al repo del Profesor

📅 Fecha límite

Viernes 24/10/2025 — 23:59 hs
No hay prórrogas. No se aceptan entregas fuera de término.

✅ Criterios de aprobación

Si el grupo no entrega → TP grupal desaprobado

Si un integrante no participa con commits y PR → ese integrante queda desaprobado, aunque el grupo apruebe

Todo debe integrarse antes del deadline

Deben respetar la nueva arquitectura

🎥 Material de apoyo

En el Google Drive se encuentran subidos los videos con los nuevos temas
(JWT, hash, nodemailer, reset password, arquitectura)


# checklist-de-entrega

✔️ Checklist de entrega

 Proyecto reestructurado a nueva arquitectura

 JWT implementado correctamente

 Hash de contraseña funcionando

 Nodemailer configurado

 Reset password implementado

 PR de integrantes al Líder realizado

 PR del Líder al Repo Central enviado

 Todos los integrantes participaron con merge / commits propios

# Estructura de Proyecto Sugerida


├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │ 
│   │
│   ├── routes/
│   │   ├── index.js
│   │   
│   │
│   ├── services/
│   │   └── email.service.js
│   │
│   ├── utils/
│   │   └── hash.utils.js
│   │
│   ├── validators/
│   │   └── auth.validator.js
│   │
│   └── app.js
│
├── node_modules/
│
├── .env
├── .env.example
│
├── package-lock.json
├── package.json
│
├── .gitignore   // configuarar para ignorar node_modules y .env
│
│
├── index.js
│
└── README.md
