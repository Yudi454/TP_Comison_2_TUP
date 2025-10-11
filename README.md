📘 Guía Oficial – Entrega de TP Semanal (Programación 4 – UTN FRT)
💻 Trabajo colaborativo en GitHub con repositorio por grupo
🧭 Estructura del Repositorio

El repositorio base del profesor contiene una carpeta raíz llamada:

📂 Trabajos_Grupales/


Dentro de ella, cada grupo tiene su propia carpeta asignada:

Trabajos_Grupales/
├─ Grupo_1/
├─ Grupo_2/
├─ Grupo_3/
├─ Grupo_4/
└─ Grupo_5/
.
.
.
.├─ Grupo_N/

📌 Cada grupo deberá trabajar únicamente dentro de su carpeta.
El resto de las carpetas no deben ser modificadas.

🎯 Objetivo General

El objetivo es evaluar:

✅ Trabajo en equipo.
✅ Organización del código por grupo.
✅ Participación individual mediante ramas y commits.
✅ Conocimiento técnico (Node + MySQL + Express).

🚀 Pasos para la entrega
1️⃣ Fork del repositorio base

Cada grupo debe hacer un Fork del repositorio del profesor:

👉 https://github.com/ChocobarMatias/TP_Comision_2_TUP

Solo un integrante del grupo (el líder) realiza el fork inicial.
Los demás integrantes trabajarán como colaboradores dentro de ese fork.

📘 Agregar Colaboradores al Fork (Importante)

El líder del grupo debe agregar a todos los integrantes como colaboradores para que puedan clonar, crear ramas y subir sus cambios.

🔹 Pasos:

Ingresar al fork del grupo.

Ir a Settings → Collaborators → Add people.

Escribir el usuario de GitHub de cada integrante y presionar Add collaborator.

Cada integrante recibirá una invitación que debe aceptar.

💡 Una vez aceptada la invitación, todos los integrantes tendrán permisos de escritura sobre el mismo repositorio del grupo.

2️⃣ Clonar el fork del grupo

Cada integrante debe clonar el repositorio del líder de su grupo, no el del profesor:

git clone https://github.com/<usuario_del_lider>/TP_Comision_2_TUP.git
cd TP_Comision_2_TUP

3️⃣ Ubicación del trabajo del grupo

Dentro de la carpeta 📂 Trabajos_Grupales, el grupo debe trabajar solo dentro de su carpeta asignada.
Por ejemplo:

📂 Trabajos_Grupales/
└─ 📂 Grupo_1/
     ├─ index.js
     ├─ config/
     │   └─ DB.js
     ├─ controllers/
     ├─ routes/
     └─ package.json


💡 Todo el desarrollo del sistema (backend monolítico) se debe realizar dentro de la carpeta correspondiente al grupo asignado.

4️⃣ Creación de ramas personales (por integrante)

Cada integrante del grupo debe crear su propia rama dentro del fork con su nombre o legajo.
Ejemplo:

git checkout -b cardozo_martin
git add .
git commit -m "Agrego controlador de productos - Martin"
git push origin cardozo_martin


📘 Regla:
Cada alumno trabaja en su rama y luego se integran todos en la rama grupal (por ejemplo grupo1).

5️⃣ Integración del trabajo grupal

El líder del grupo será responsable de integrar las ramas individuales dentro de la carpeta del grupo.

Ejemplo:

git checkout grupo1
git merge cardozo_martin
git merge bazan_matias
git merge herrera_karen

6️⃣ Pull Request (PR) de entrega

Una vez terminado el trabajo, el líder del grupo debe realizar un Pull Request (PR) desde su fork hacia el repositorio del profesor.

🔹 Instrucciones:

Base repository: ChocobarMatias/TP_Comision_2_TUP

Base branch: main

Head repository: <usuario_del_grupo>/TP_Comision_2_TUP

Compare branch: grupo1 (o la rama principal del grupo)

🔹 Título del PR:
Entrega TP1 - Grupo 1 - Legajo líder 61658

🔹 Descripción del PR:
Integrantes:
- Cardozo Martín (61658)
- Bazan Matías (61152)
- Herrera Karen (61151)
- Navarro Lautaro (61160)

🧮 Forma de Evaluación
Criterio	Descripción	Resultado
✅ Carpeta del grupo creada correctamente	El grupo trabajó dentro de su carpeta asignada	AP
✅ Ramas personales creadas	Cada integrante subió su rama con commits propios	AP
✅ PR grupal realizado	Se envió un Pull Request al repo del profesor	AP
⚠️ Faltan ramas personales	Algún integrante no participó	OB
❌ Sin PR o sin carpeta del grupo	No se considera entrega	DS
🧩 Ejemplo visual
TP_Comision_2_TUP/
└─ 📂 Trabajos_Grupales/
   ├─ 📂 Grupo_1/
   │   ├─ index.js
   │   ├─ config/DB.js
   │   ├─ controllers/
   │   └─ routes/
   ├─ 📂 Grupo_2/
   ├─ 📂 Grupo_3/
   └─ 📂 Grupo_4/


Cada grupo trabaja solo en su carpeta y cada alumno en su rama.

🧠 Evaluación Automática

El sistema del profesor (GitHub Actions) se ejecutará automáticamente al llegar la fecha límite:

🕒 15 de octubre de 2025 a las 23:59 (hora Argentina)

Se validará:

Que exista la carpeta del grupo.

Que haya un Pull Request del grupo.

Que existan ramas individuales de cada integrante.

Que el sistema compile y cumpla la estructura mínima.

Los resultados aparecerán automáticamente en el README del repo base, por ejemplo:

Grupo	Integrantes	Estado	Observaciones
Grupo 1	4	AP	Cumple estructura
Grupo 2	3	OB	Falta rama de un integrante
Grupo 3	4	DS	No presentó PR
📘 Resumen para los alumnos
Acción requerida	Responsable	Evaluación
Hacer fork del repo base	Líder del grupo	Obligatorio
Agregar colaboradores	Líder del grupo	Obligatorio
Crear ramas individuales	Cada integrante	AP
Trabajar dentro de su carpeta del grupo	Todos los integrantes	AP
Crear PR grupal	Líder	AP
No tener rama personal	Alumno	DS (No entregó)
No tener carpeta de grupo o PR	Grupo	DS (No entregó)
💬 Consejos finales

Cada commit debe tener mensaje claro y legible.

Usar nombres de ramas sin espacios (nombre_apellido).

Evitar subir node_modules (usar .gitignore).

Verificar que el proyecto compile antes del PR.

Respetar la estructura de carpetas asignada.

Aceptar las invitaciones de colaborador antes de comenzar a trabajar.


GRUPOS	      Semana 1

Grupo N° 1 -	TP 6
   
Grupo N° 2 -	TP 7

Grupo N° 3 -	TP 8

Grupo N° 4 -	TP 9

Grupo N° 5 -	TP 10

Grupo N° 6 -	TP 1

Grupo N° 7 -	TP 2

Grupo N° 8 -	TP 3

Grupo N° 9 -	TP 4

Grupo N° 10 -	TP 5

Grupo N° 11 -	TP 6

Grupo N° 12 -	TP 9

Grupo N° 13 -	TP 8

Grupo N° 14 -	TP 5

Grupo N° 15 -	TP 7

Grupo N° 16 -	TP 2

Grupo N° 17 -	TP 1
