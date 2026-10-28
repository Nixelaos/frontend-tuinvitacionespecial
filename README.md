# 💌 Tu Invitación Especial — Plataforma de Invitaciones Digitales de Boda

[![Astro](https://img.shields.io/badge/Astro-4.16-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
> **Resumen en 60 segundos:**  
> **Tu Invitación Especial** es una solución Fullstack para crear, personalizar y distribuir invitaciones digitales de boda de estética editorial y artesanal. Sustituye la costosa papelería tradicional y los fríos PDFs estáticos por experiencias interactivas ricas en animaciones sensoriales (desatado de cinta de seda, apertura de sobre interactivo, efectos supernova y bordes de papel rasgado SVG), integrando confirmación inteligente de asistencia (RSVP) directo a WhatsApp y mesa de regalos interactiva sincronizada.

---

## ⚡ 1. Qué hace el proyecto y qué problema resuelve

### 🛑 El Problema
1. **Costos elevados y baja adaptabilidad de la papelería física:** Las invitaciones tradicionales de imprenta demandan altos costos de diseño, impresión y logística. Además, ante cualquier cambio de horario o locación, reimprimir es inviable.
2. **Frialdad de las alternativas digitales convencionales:** Enviar un archivo PDF o una imagen estática por mensajería resulta impersonal, no luce bien en dispositivos móviles y carece de emoción para un evento trascendental.
3. **Fricción en la confirmación de asistencia (RSVP) y regalos:** Gestionar listas de confirmados, pases asignados, restricciones alimentarias y cuentas bancarias en planillas dispersas genera pérdida de información y estrés para los novios.

### 💡 La Solución
**Tu Invitación Especial** proporciona una plataforma web integral que combina el refinamiento de la papelería de autor con tecnología web interactiva de alto rendimiento:

- **Experiencias Sensoriales Web:** Apertura simulada de sobres, desatado de cintas de seda, animaciones con físicas suaves, música de fondo integrada y contornos orgánicos de papel artesanal rasgado mediante filtros matemáticos SVG (`feTurbulence`).
- **Confirmación RSVP sin fricción:** Los invitados confirman asistencia, número de acompañantes y alergias con un clic, generando mensajes estructurados automáticos a los números de WhatsApp de los novios (canal con >95% de tasa de apertura).
- **Mesa de Regalos & Wishlist Interactiva:** Catálogo de experiencias o productos con opción de reserva en tiempo real por parte de los invitados y gestión para los novios.
- **Cotizador & Configurador en Vivo:** Permite a las parejas presupuestar planes (Esencial, Delux, Artesanal), complementos (entrega exprés 24h, versión bilingüe, ilustración en acuarela) y reservar con 50% de anticipo.
- **Simulador Multi-Dispositivo:** Visualización en vivo en marcos de Smartphone, Tablet y Pantalla Completa con cambio dinámico de paletas cromáticas en tiempo real.

---

## 🏗️ 2. Stack y Arquitectura

El proyecto adopta una **arquitectura desacoplada (Decoupled / Headless)** diseñada con el patrón **Islands Architecture** (Astro) y una filosofía **Offline-First / Resilient Fallback** para garantizar máxima disponibilidad sin puntos únicos de fallo.

```
                      ┌──────────────────────────────────────────┐
                      │            CLIENTE / NAVEGADOR           │
                      └────────────────────┬─────────────────────┘
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    ▼                                             ▼
       ┌────────────────────────┐                    ┌────────────────────────┐
       │   Astro Static Pages   │                    │ React Dynamic Islands  │
       │ (Hero, Catálogo, SEO)  │                    │ (Sobres, RSVP, Regalos)│
       └────────────────────────┘                    └───────────┬────────────┘
                                                                 │
                                          ┌──────────────────────┴──────────────────────┐
                                          │ Fallback Híbrido Resiliente                 │
                                          ▼                                             ▼
                             ┌────────────────────────┐                    ┌────────────────────────┐
                             │  Backend REST API      │                    │  Local Storage Sync    │
                             │  (Node.js / Express)   │                    │  (Modo Offline/Static) │
                             └───────────┬────────────┘                    └────────────────────────┘
                                         │
                                         ▼
                             ┌────────────────────────┐
                             │ Base de Datos / Estado │
                             │ (PostgreSQL / SQLite)  │
                             └────────────────────────┘
```

### Tecnologías Principales

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Framework Base** | **Astro 4** | Cero JavaScript por defecto en páginas de marketing; carga ultrarrápida y SEO óptimo. |
| **Componentes UI** | **React 18** | Manejo de estado dinámico complejo en simuladores, apertura de sobres e interactividad. |
| **Estilos** | **Tailwind CSS 3.4** | Sistema de diseño editorial: tonos marfil, salvia, lino, terracota y tipografías serifa. |
| **Gráficos & Texturas** | **SVG Turbulence & Clip Paths** | Simulación de bordes deshilachados y rasgados sin sobrecargar la red con imágenes pesadas. |
| **Backend API** | **Node.js ESM** | Microservicio REST modular para gestión de catálogo de regalos y persistencia de reservas. |
| **Lenguaje** | **TypeScript 5.7** | Tipado estático estricto en modelos de datos, invitaciones, itinerarios y cotizaciones. |
| **Iconografía** | **Lucide React & React Icons** | Iconografía semántica optimizada para eventos (iglesia, recepción, música, WhatsApp). |

### Decisiones Técnicas Clave

1. **¿Por qué Astro + React (Islands Architecture)?**  
   Una invitación de boda es visitada por cientos de invitados desde smartphones con conexiones móviles variables. Utilizar un SPA completo (como Next.js o CRA) penaliza el tiempo de carga con bundles innecesarios. Astro pre-renderiza el HTML estático en el servidor/build y activa React únicamente en las "islas" interactivas (el reproductor, el sobre, el RSVP o el cotizador), logrando un **First Contentful Paint (FCP) inferior a 0.8s**.

2. **¿Por qué Filtros de Turbulencia SVG para el Papel Rasgado?**  
   En lugar de recurrir a PNGs transparentes de alto peso que se pixelan en pantallas Retina, se programaron polígonos irregulares y primitivas SVG (`feTurbulence`, `feDisplacementMap`). Esto permite que los bordes rasgados se rendericen vectorialmente en tiempo real, pesen menos de 1 KB y se adapten a cualquier dimensión de contenedor.

3. **¿Por qué Arquitectura Resiliente Offline-First en el Frontend?**  
   El módulo de regalos y confirmaciones (`src/config/api.ts` y `WeddingGiftRegistryApp.tsx`) detecta si la variable `PUBLIC_API_URL` está activa. Si el backend está en reposo o el proyecto se ejecuta en un CDN estático, commuta automáticamente a `localStorage`. **La interfaz nunca se rompe ni muestra estados de error al usuario final.**

4. **¿Por qué WhatsApp como canal de RSVP principal?**  
   Obligar a familiares y amigos mayores a registrarse con usuario y contraseña o lidiar con correos que caen en spam reduce drásticamente la tasa de respuesta. Conectar el formulario interactivo directamente a la API de WhatsApp de los novios asegura confirmaciones inmediatas, seguras y humanizadas.

---

## 📡 3. Modelo de Datos y Endpoints (Backend API)

Cuando el backend está activo (`node backend/server.mjs`), expone los siguientes endpoints REST:

| Método | Endpoint | Descripción | Body / Parámetros |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/gifts` | Lista todos los regalos de la mesa de bodas. | - |
| `POST` | `/api/gifts` | Crea un nuevo ítem en la lista de regalos. | `{ title, price, category, imageUrl, quantity }` |
| `PUT` | `/api/gifts/:id` | Actualiza un ítem existente. | `{ title, price, description, ... }` |
| `DELETE`| `/api/gifts/:id` | Elimina un ítem del registro. | - |
| `POST` | `/api/gifts/:id/reserve` | Registra la reserva de un regalo por un invitado. | `{ guestName, passes, message }` |

---

## 🚀 4. Cómo ejecutar el proyecto localmente

### Prerrequisitos
- **Node.js** `>= 18.14.1` (comprueba con `node -v`)
- **npm** `>= 9.0.0` (o `pnpm` / `yarn`)
- **Git**

### Paso a Paso

#### 1. Clonar el repositorio
```bash
git clone https://github.com/Nixelaos/frontend-tuinvitacionespecial.git
cd frontend-tuinvitacionespecial
```

#### 2. Configurar Variables de Entorno
Copia la plantilla de entorno:
```bash
cp .env.example .env
```
*(Opcional)* Si deseas conectar el frontend con tu instancia de backend:
```env
PUBLIC_API_URL=http://localhost:4000/api/gifts
```
> **Nota:** Si dejas la variable vacía o comentada, la app funcionará de inmediato con el motor local mockeado en memoria / `localStorage`.

#### 3. Instalar Dependencias
```bash
npm install
```

#### 4. Levantar el Entorno de Desarrollo
```bash
# Iniciar Frontend (Astro Dev Server en http://localhost:4321)
npm run dev
```

*(Opcional)* Si deseas ejecutar el servidor Backend en paralelo:
```bash
npm run backend
```

#### 5. Construir para Producción
```bash
npm run build
npm run preview
```
El build optimizado estático se generará en la carpeta `dist/`.

---

## 📂 5. Estructura del Proyecto

```text
├── frontend-tuinvitacionespecial/
│   ├── public/                    # Favicon, assets de video/canvas y robots.txt
│   ├── src/
│   │   ├── components/            # Islas interactivas en React
│   │   │   ├── BeachWeddingInvitation.tsx         # Modelo Playa con efecto supernova
│   │   │   ├── MintHeartsWeddingInvitation.tsx    # Modelo Marfil & Menta con 5 paletas
│   │   │   ├── FrayedHandmadePaperInvitation.tsx  # Modelo Papel Rasgado Deshilachado SVG
│   │   │   ├── TornPaperWeddingInvitation.tsx     # Modelo Cinta de Seda & Papel Rasgado
│   │   │   ├── CatalogExplorer.tsx                # Filtro dinámico por categorías
│   │   │   ├── HeroRealInvitation.tsx             # Mockup Smartphone interactivo del Hero
│   │   │   ├── OrderQuoteSection.tsx              # Cotizador dinámico con cálculo en CLP
│   │   │   ├── WeddingGiftRegistryApp.tsx         # Mesa de regalos interactiva
│   │   │   ├── PricingSection.tsx                 # Planes y precios
│   │   │   └── Navbar.tsx / Footer.tsx            # Navegación y pie de página editorial
│   │   ├── data/
│   │   │   └── weddingData.ts     # Data centralizada (plantillas, precios, FAQs, novios)
│   │   ├── layouts/
│   │   │   └── Layout.astro       # Shell global, fuentes serif y metadatos SEO
│   │   ├── pages/
│   │   │   ├── index.astro        # Landing page principal
│   │   │   └── disenos/           # Vistas dedicadas de cada diseño de invitación
│   │   │       ├── [slug].astro
│   │   │       ├── invitacion-marfil-menta.astro
│   │   │       ├── invitacion-papel-artesanal.astro
│   │   │       ├── invitacion-playa-supernova.astro
│   │   │       └── papel-artesanal-deshilachado.astro
│   │   ├── styles/
│   │   │   └── global.css         # Clases base, animaciones y scroll suave
│   │   └── types/
│   │       └── wedding.ts         # Contratos TypeScript (Template, Plan, Evento, RSVP)
│   ├── astro.config.mjs           # Integración Astro + React + Tailwind
│   ├── tailwind.config.mjs        # Paletas de color personalizadas (Ivory, Champagne, Sage, Gold)
│   ├── vercel.json                # Configuración de headers y caché para despliegue en Vercel
│   └── package.json
└── README.md                      # Documentación del proyecto
```

---

## 🎨 6. Diseños y Modelos Incluidos

1. **Papel Artesanal & Bordes Deshilachados:** Estética rústica, paleta marfil crudo y verde oliva, con contornos rasgados por software mediante filtros vectoriales SVG.
2. **Cinta de Seda & Bordes Rasgados:** Apertura cinemática desatando un lazo de seda, tarjetas con relieve y confirmación de asistencia con pases asignados.
3. **Marfil & Menta Pura:** Selector dinámico en vivo de 5 paletas de color botánicas y sobre sensorial con lacre digital.
4. **Playa & Brisa Supernova:** Animación con canvas de brillo supernova, efecto airbrush y paleta cálida de puesta de sol.

---

## 🌐 7. Despliegue en Producción

El proyecto está preconfigurado para desplegarse sin fricción en plataformas modernas:

- **Vercel:** Despliegue automático conectado al repositorio con el preset de `Astro`. La configuración de headers de seguridad y enrutamiento ya se encuentra en `vercel.json`.
- **Render / Railway (Backend):** Puedes alojar el microservicio de Node.js en Render o Railway y configurar `PUBLIC_API_URL` en las variables de entorno de Vercel.

---

## 📄 8. Licencia

Distribuido bajo la licencia **MIT**. Consulta `LICENSE` para más información.

---

<p align="center">
  Hecho con dedicación para transformar cada matrimonio en un recuerdo digital inolvidable. 🥂💍
</p>
