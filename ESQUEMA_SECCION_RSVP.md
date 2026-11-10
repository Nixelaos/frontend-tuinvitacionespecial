# 💌 Esquema y Diseño de la Sección RSVP

**Proyecto:** Frontend — Tu Invitación Especial  
**Documento:** Especificación UX/UI de la Sección de Confirmación de Asistencia (`ESQUEMA_SECCION_RSVP.md`)  
**Ubicación:** `frontend-tuinvitacionespecial/`  

---

## 🎨 1. Concepto y Enfoque Editorial

Para mantener la armonía estética y sensorial de la plataforma (animación del sobre, sello de lacre, papeles rasgados y estética editorial de boda), la sección de RSVP **no abarrota la página con un formulario largo visible de inmediato**.

Al igual que en la **sección de Regalo**, la interacción se encuentra **escondida detrás de la imagen flotante de `sobre.png`**:
1. En la página principal se visualiza el título caligráfico, el mensaje de bienvenida y el sobre artesanal (`sobre.png`) con animación de levitación suave (`animate-float-slow-rsvp`).
2. Al pulsar sobre el sobre (`sobre.png`), se despliega un **modal interactivo** (*Response Card Popover*) mediante Portal a pantalla completa con fondo desenfocado (*backdrop blur*), marco doble de papelería artesanal y botón de cierre `X`.
3. Dentro del desplegable se aloja el formulario de respuesta artesanal con tipografía con serifa, tonos marfil/arena y transiciones dinámicas.

---

## 📐 2. Wireframe Conceptual (Esquema Visual)

```
┌─────────────────────────────────────────────────────────────┐
│                 [ TornPaperDivider - Top ]                  │
│                                                             │
│                         R. S. V. P.                         │
│                 CONFIRMACIÓN DE ASISTENCIA                  │
│                                                             │
│        "Querida Familia García, queremos celebrar           │
│           este momento tan especial junto a ustedes"        │
│                                                             │
│      ┌────────────────────────────────────────────────┐     │
│      │  PASES RESERVADOS EN SU HONOR: [ 2 PERSONAS ]  │     │
│      └────────────────────────────────────────────────┘     │
│                                                             │
│   1. ¿NOS ACOMPAÑAS?                                        │
│      ┌───────────────────────┐   ┌───────────────────────┐  │
│      │  ✨ ¡Sí, ahí estaré!  │   │  💌 No podré asistir  │  │
│      │      (Seleccionado)   │   │                       │  │
│      └───────────────────────┘   └───────────────────────┘  │
│                                                             │
│   2. CANTIDAD DE ASISTENTES (Solo si asiste)                │
│      [ - ]       2 personas       [ + ]  (Máximo 2)         │
│                                                             │
│   3. PREFERENCIAS DE MENÚ / RESTRICCIONES ALIMENTARIAS      │
│      [✓ Estándar]  [  Vegetariano]  [  Vegano]              │
│      [  Celíaco / Sin Gluten]      [  Menú Infantil]        │
│      [ Campo opcional: ¿Alguna alergia severa o condición? ]│
│                                                             │
│   4. LA CHISPA FESTIVA (Conexión Emocional)                 │
│      "¿Qué canción te saca a bailar sí o sí?"               │
│      [ Nombre de canción y artista                        ] │
│                                                             │
│   5. MENSAJE PARA LOS NOVIOS                                │
│      [ Escribe una dedicatoria o deseo para la pareja...  ] │
│                                                             │
│      ┌────────────────────────────────────────────────┐     │
│      │             CONFIRMAR ASISTENCIA               │     │
│      │         (Botón Principal en Relieve)           │     │
│      └────────────────────────────────────────────────┘     │
│                                                             │
│      Fecha límite para responder: 25 de Octubre de 2026     │
│                                                             │
│                [ TornPaperDivider - Bottom ]                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 3. Desglose Módulo por Módulo

### Módulo 1: Encabezado y Saludo Personalizado
* **Propósito:** Brindar calidez y reconocimiento inmediato al invitado.
* **Elementos:**
  * Subtítulo en mayúsculas espaciadas (*letter-spacing*): `R.S.V.P.`
  * Título caligráfico o serifa: `Confirmación de Asistencia`.
  * **Nombre dinámico:** Extraído mediante el token de la URL (`"Querida Familia García..."` o `"Estimada Valentina..."`).
  * **Insignia de pases asignados:** Un recuadro destacado y sutil con los cupos máximos permitidos por los novios. Evita la incomodidad de personas no convocadas.

### Módulo 2: Decisión Principal (Bifurcación Sí / No)
* **Propósito:** Captura de intención en 1 segundo con botones táctiles grandes.
* **Comportamiento dinámico:**
  * **Opción "¡Sí, ahí estaré!":** Despliega con animación suave los módulos 3, 4 y 5 (asistentes, menú y música).
  * **Opción "No podré asistir":** Oculta los campos de menú y canción, mostrando un mensaje cálido: *«Lamentamos mucho que no puedas acompañarnos, ¡te tendremos presente en el corazón!»* y deja únicamente el campo de dedicatoria opcional.

### Módulo 3: Selector de Pases Confirmados
* **Propósito:** Ajustar el aforo real de la familia o pareja.
* **Comportamiento:**
  * Selector numérico táctil `[ - ] [ cantidad ] [ + ]`.
  * La cantidad mínima es 1 y el tope máximo es el número de pases asignados al grupo familiar.

### Módulo 4: Menú y Restricciones Alimentarias
* **Propósito:** Recoger datos críticos para el banquetero sin formularios invasivos.
* **Formato:**
  * Pastillas interactivas (*chips*) seleccionables con un toque:
    * `Estándar` (opción predeterminada).
    * `Vegetariano`.
    * `Vegano`.
    * `Celíaco / Libre de Gluten`.
    * `Menú Infantil`.
  * Campo de texto breve opcional para alertas de alergias severas (ej. maní, mariscos, lactosa).

### Módulo 5: El Toque Emocional (Canción y Dedicatoria)
* **Propósito:** Involucrar al invitado con la celebración antes del evento.
* **Elementos:**
  * **Canción para el DJ:** Campo de texto con sugerencia musical.
  * **Dedicatoria:** Área de texto elegante para dejar buenos deseos en el libro digital de visitas.

### Módulo 6: Botón de Confirmación
* **Propósito:** Acción final clara y memorable.
* **Diseño:** Botón central con sombra suave, tonos dorados/tierra acordes a la paleta de la boda y micro-interacción al hacer clic.

---

## ✨ 4. Pantalla de Éxito (Estado Post-Confirmación)

Al confirmarse la asistencia, la tarjeta de respuesta se transforma sutilmente a un **Estado de Agradecimiento**:

1. **Mensaje de Éxito:**  
   *"¡Gracias Valentina! Tu confirmación ha quedado registrada con éxito. Nos vemos el 14 de Noviembre."*
2. **Acción de Utilidad: Botón "Guardar en Calendario":**  
   Permite al invitado añadir el evento directamente a **Google Calendar** o **Apple Calendar** con la fecha, hora y ubicación ya configuradas.
3. **Margen de Modificación:**  
   Un enlace discreto al pie: *"¿Cambio de planes? Puedes modificar tu respuesta hasta el 25 de Octubre"*.

---

## 🎨 5. Guía de Estilo y Coherencia Visual

* **Tipografías:**
  * Títulos: Serifa elegante (`Playfair Display`, `Cormorant Garamond` o la serifa configurada en el proyecto).
  * Textos y etiquetas: Sans-serif limpia (`Inter` o `Montserrat`) para garantizar legibilidad en pantallas móviles.
* **Paleta de Colores (Ejemplo Plantilla Playa):**
  * Fondo de la tarjeta: Tono marfil/algodón (`#FCF9F3`).
  * Bordes y líneas divisorias: Tono arena/lino suave (`#E2D2C2`).
  * Textos principales: Tono tierra oscuro (`#2F2420`).
  * Botón de acción: Tono dorado costero o acento del evento (`#B8864E`).
