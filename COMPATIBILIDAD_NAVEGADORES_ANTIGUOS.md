# Estrategia de Compatibilidad para Navegadores y Dispositivos Móviles Antiguos

> **Proyecto:** Tu Invitación Especial  
> **Objetivo:** Garantizar que el 100% de los invitados (incluyendo usuarios con teléfonos de más de 5 años y navegadores desactualizados) puedan abrir, disfrutar y responder las invitaciones sin pantallas en blanco ni fallos visuales.

---

## 1. Por qué este requisito es crítico para el negocio

A diferencia de una aplicación SaaS o de oficina donde se puede exigir un navegador moderno, las **invitaciones de boda digitales** se distribuyen masivamente por WhatsApp a una audiencia heterogénea:
* **Familiares mayores y abuelos:** Suelen conservar dispositivos durante 5 a 8 años (iPhone 7, iPhone 8, iPhone X con iOS 14 o 15; terminales Samsung Galaxy J/A o Motorola con Android 8, 9 o 10).
* **Navegador integrado de WhatsApp (In-App WebView):** Cuando un invitado presiona el enlace en WhatsApp, la página no siempre abre en Chrome o Safari estándar, sino en un WebView del sistema operativo que suele estar más rezagado en soporte de APIs web modernas.
* **Tolerancia cero al error:** Si la pantalla se queda blanca o el sobre no abre, el invitado asume que la invitación no funciona y contacta a los novios.

Mantener **Astro v5 con Tailwind v3** es el punto de partida ideal porque evita las restricciones de CSS moderno impuestas por Tailwind v4 (que exige navegadores de 2023 en adelante).

---

## 2. Diagnóstico de los 5 Puntos Críticos y Cómo Solucionarlos

```
                     AUDIENCIA DE INVITADOS (MÓVILES ANTIGUOS)
                                        │
     ┌──────────────────┬───────────────┴───────────────┬──────────────────┐
     ▼                  ▼                               ▼                  ▼
[Videos WebM]      [Target JS]                    [Imágenes AVIF]     [Filtros SVG]
Safari iOS <15    Sintaxis nueva                  iOS <16 y Android  feTurbulence
da pantalla       provoca                         antiguo muestran   provoca lag
negra             SyntaxError                     imagen rota        en GPU móvil
     │                  │                               │                  │
     ▼                  ▼                               ▼                  ▼
Fallback MP4 /     Compilar a ES2020              Etiqueta <picture>  Bordes SVG
Poster PNG         en Vite                        con WebP / JPG     optimizados
```

---

### Punto 1: Videos `.webm` y transparencia en iPhones antiguos (iOS < 15)

* **El problema detectado:**  
  En la carpeta `public/` existen videos `.webm` utilizados para efectos visuales (como `black-liquid-reveal.webm`, `supernova.webm`, `particulas_y_luz.webm`).  
  El motor WebKit de Safari en iOS 14 y versiones previas **no tiene decodificador nativo para WebM con canal alfa (transparencia)**. En estos teléfonos, el video se muestra como un recuadro negro sólido o un icono de reproducción tachado.

* **Cómo arreglarlo:**
  1. **Doble formato `<source>`:** Proporcionar siempre un archivo `.mp4` codificado en H.264 como alternativa.
  2. **Atributos obligatorios en `<video>`:**  
     Para que iOS permita la reproducción automática silenciosa sin abrir el reproductor a pantalla completa nativo, la etiqueta debe contar con:
     `playsinline`, `webkit-playsinline`, `muted`, `autoplay`, y `loop`.
  3. **Poster de respaldo:** Añadir el atributo `poster="imagen-estatica.webp"` para que, si el dispositivo no puede reproducir el video, al menos se vea una imagen de fondo elegante y no un hueco vacío.

---

### Punto 2: Nivel de compilación de JavaScript (Vite Build Target)

* **El problema detectado:**  
  Vite por defecto genera código JavaScript apuntando a navegadores muy modernos (`es2022`). Si el código compilado incluye sintaxis moderna como el encadenamiento opcional (`objeto?.propiedad`) o el operador de coalescencia nula (`variable ?? valor`), los navegadores antiguos no la reconocen y lanzan un error irrecuperable:  
  `SyntaxError: Unexpected token '?'`  
  Esto detiene la ejecución del script y provoca la temida **pantalla en blanco**.

* **Cómo arreglarlo:**
  1. En `astro.config.mjs`, dentro del bloque `vite.build`, definir un `target` más conservador:
     * Apuntar a `['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']`.
  2. De forma opcional, si se requiere soporte para versiones aún más viejas (iOS 12 o 13), se puede incorporar el plugin oficial `@vitejs/plugin-legacy`.

---

### Punto 3: Imágenes en formato `.avif` (`comprometidos.avif`)

* **El problema detectado:**  
  El formato AVIF ofrece una compresión sobresaliente, pero solo es soportado de forma nativa a partir de iOS 16 (finales de 2022) y Android 12. En iPhones anteriores a 2022, la imagen `comprometidos.avif` simplemente no se carga.

* **Cómo arreglarlo:**
  * En lugar de enlazar directamente el archivo `.avif`, utilizar la estructura `<picture>` de HTML:
    1. `<source srcset="imagen.avif" type="image/avif">` (para navegadores modernos que ahorran datos).
    2. `<source srcset="imagen.webp" type="image/webp">` (soportado por prácticamente el 98% de dispositivos).
    3. `<img src="imagen.jpg" ...>` (fallback universal para cualquier navegador antiguo).

---

### Punto 4: Prefijos automáticos CSS (Autoprefixer) y `backdrop-filter`

* **El problema detectado:**  
  El diseño utiliza el efecto de vidrio esmerilado translúcido (*frosted glass*) en barras de navegación, modales y tarjetas flotantes. Safari móvil exige el prefijo propietario `-webkit-backdrop-filter`. Si este prefijo falta, la barra o tarjeta queda completamente transparente o invisible contra el fondo.

* **Cómo arreglarlo:**
  1. Asegurar que PostCSS tenga activo `autoprefixer` en el pipeline de Tailwind v3.
  2. En el archivo CSS o clases de Tailwind, declarar siempre un color de fondo sólido o semitransparente de respaldo antes del filtro:
     * Si el navegador no soporta el desenfoque, aplicará un fondo suave marfil/champán (`#FAF7F2` al 95%), manteniendo los textos perfectamente legibles.

---

### Punto 5: Rendimiento del filtro SVG de papel rasgado (`feTurbulence`)

* **El problema detectado:**  
  El efecto artesanal de borde de papel rasgado se genera en tiempo real mediante filtros matemáticos SVG (`feTurbulence` y `feDisplacementMap`).  
  En teléfonos antiguos con poca GPU o batería baja, procesar estos filtros mientras el usuario hace scroll puede causar caídas de fotogramas (tirones o *lag* severo).

* **Cómo arreglarlo:**
  1. Limitar la resolución y los ciclos del filtro (`numOctaves="1"` en lugar de `3` o `4`).
  2. Implementar `@media (prefers-reduced-motion: reduce)` para omitir animaciones complejas en dispositivos que soliciten ahorro de recursos.
  3. Tener un divisor de papel rasterizado en SVG plano o WebP como alternativa estática para dispositivos de baja potencia.

---

## 3. Matriz de Prioridad de Implementación

| Área | Impacto en el Usuario | Dificultad | Prioridad |
|---|---|---|---|
| **Vite JS Target (ES2020 / Safari 14)** | Evita pantalla en blanco en teléfonos viejos | Muy baja (configuración) | **Alta** |
| **Fallback en videos WebM (MP4 + playsinline)** | Evita cajas negras en iPhone 7/8/X | Media | **Alta** |
| **Fallback en imágenes AVIF (`<picture>`)** | Evita imágenes rotas | Baja | **Media** |
| **Prefijos `-webkit-backdrop-filter`** | Asegura legibilidad de modales y barras | Baja (PostCSS) | **Media** |
| **Optimización de SVG `feTurbulence`** | Scroll fluido en Androids económicos | Media | **Media** |

---

## 4. Conclusión

Al migrar a **Astro v5 manteniendo Tailwind v3**, el núcleo de estilos y estructura ya queda protegido para la web antigua. Aplicando los ajustes de esta guía, la plataforma se convierte en una experiencia no solo visualmente atractiva, sino técnicamente resiliente y universal para cualquier invitado a la boda.
