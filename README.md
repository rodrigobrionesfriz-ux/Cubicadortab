# Cubicador de Melamina

App web para cubicar tableros de melamina: optimiza los cortes respetando la **veta**, descuenta el **espesor de la sierra (kerf)**, calcula **tapacantos en metros** y entrega la **secuencia real de corte** para la sierra. Sin instalación: es HTML + JavaScript puro, se publica gratis en GitHub Pages.

## Qué hace

- Tablero configurable: largo, ancho, espesor, kerf, refile de borde y precio.
- Veta del tablero (X o Y) y por pieza: **fija** (no rota) o **libre** (puede girar 90°).
- Optimización: prueba 16 estrategias distintas (guillotina con 3 criterios de ajuste × 5 ordenamientos, más empaque por niveles) y se queda con la mejor. Todos los cortes son ejecutables en sierra de panel.
- Dos caminos, a elección: cargar las piezas a mano, o **diseñar el mueble** (ancho, alto, fondo, repisas, puertas, cajones, zócalo) y que la app genere la lista de cortes. Lo generado se puede editar pieza por pieza.
- Tres tipos de armado (costados por fuera, piso y techo por fuera, o mixto), que cambian cómo se reparten las medidas.
- Vista isométrica del mueble armado, deducida de los nombres de las piezas (costado, piso, techo, repisa, puerta, cajón, fondo, zócalo), con el rol de cada pieza corregible a mano.
- Tapacantos: cantos por borde, metros netos, metros con merma y costo.
- Post-proceso: secuencia paso a paso de cortes con la medida exacta en cada eje, numerada sobre el plano.
- Color sólido o foto del tablero como textura, dibujada continua sobre la plancha.
- Exportación a CSV e impresión / PDF.
- Proyectos guardados en Firebase (o en el navegador si no configuras Firebase).

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La aplicación completa. |
| `firebase-config.js` | Credenciales de Firebase. Ya configurado con el proyecto `cubicadortab`. |
| `firestore.rules` | Reglas de seguridad para pegar en la consola de Firebase. |

## Estado de esta copia

- [x] Credenciales de Firebase cargadas (proyecto `cubicadortab`)
- [ ] Autenticación anónima habilitada en la consola
- [ ] Reglas de `firestore.rules` publicadas
- [ ] Dominio `TU-USUARIO.github.io` autorizado en Authentication → Settings

Los tres pendientes se hacen una sola vez en la consola de Firebase. Están detallados en la sección 3.

---

## 1. Probarlo sin Firebase

Abre `index.html` con doble clic. Funciona todo; los proyectos se guardan en el navegador (`localStorage`) y el indicador arriba a la derecha dirá **Modo local**.

---

## 2. Publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub, por ejemplo `cubicador`.
2. Sube los tres archivos (`index.html`, `firebase-config.js`, `firestore.rules`) a la raíz del repositorio.
3. En el repo: **Settings → Pages**.
4. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`. Guarda.
5. Espera 1–2 minutos. Tu app queda en:

   `https://TU-USUARIO.github.io/cubicador/`

---

## 3. Conectar Firebase (guardar en la nube)

### 3.1 Crear el proyecto

1. Entra a [console.firebase.google.com](https://console.firebase.google.com) y haz clic en **Agregar proyecto**.
2. Ponle un nombre (por ejemplo `cubicador`). Google Analytics no es necesario: puedes desactivarlo.

> **Atajo:** en vez de buscar en los menús, usa los enlaces directos de más abajo. El `_` de la URL significa "mi proyecto": si tienes uno solo, entra directo; si tienes varios, te pide elegir.

### 3.2 Activar el acceso anónimo

1. Ve a **https://console.firebase.google.com/project/_/authentication/providers**
   (o menú lateral → **Authentication → Comenzar**).
2. En la lista de proveedores elige **Anónimo** → interruptor **Habilitar** → **Guardar**.

### 3.3 Crear la base de datos

1. Ve a **https://console.firebase.google.com/project/_/firestore**
   (o menú lateral → **Bases de datos y almacenamiento → Firestore**).
2. Botón **Crear base de datos**.
3. Si te pregunta por la edición, elige **Standard**. Es la del plan gratuito.
4. **Ubicación**: elige la más cercana, por ejemplo `southamerica-east1` (São Paulo). Ojo: **no se puede cambiar después**.
5. **Modo de inicio de las reglas**: marca **Modo de prueba**. Es lo que permite que la app escriba desde el navegador mientras configuras; en el paso siguiente lo reemplazas por las reglas seguras.
6. **Crear**. Demora unos segundos y quedas en la pantalla de datos, vacía. Es lo normal: las colecciones se crean solas cuando guardas el primer proyecto desde la app.

### 3.4 Aplicar las reglas de seguridad

1. Ve a **https://console.firebase.google.com/project/_/firestore/rules**
   (o la pestaña **Reglas** dentro de Firestore).
2. Borra lo que haya y pega el contenido completo de `firestore.rules`.
3. **Publicar**.

> Sin este paso cualquiera podría leer o borrar los proyectos de todos. No te lo saltes.

### 3.5 Copiar las credenciales — ya hecho

Si usas el `firebase-config.js` de este repo, sáltate este paso: ya tiene las credenciales del proyecto `cubicadortab`. Solo repítelo si creas otro proyecto de Firebase o si la app muestra `auth/api-key-not-valid`.

1. Ve a **https://console.firebase.google.com/project/_/settings/general**
   (o ícono de engranaje → **Configuración del proyecto**).
2. Abajo, en **Tus apps**, haz clic en el ícono **`</>`** (Web) y registra la app con cualquier apodo. No marques Firebase Hosting.
3. Firebase te muestra un bloque `const firebaseConfig = { ... }`. Copia esos valores dentro de `firebase-config.js`:

```js
export const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "cubicador-1234.firebaseapp.com",
  projectId: "cubicador-1234",
  storageBucket: "cubicador-1234.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

4. Sube el archivo modificado a GitHub.

> Estas claves **no son secretas**: viajan al navegador de cualquier visitante. Lo que protege los datos son las reglas del paso 3.4.

### 3.6 Autorizar tu dominio de GitHub Pages

1. Ve a **https://console.firebase.google.com/project/_/authentication/settings**
   (o **Authentication → Settings → Dominios autorizados**).
2. **Agregar dominio** → escribe `TU-USUARIO.github.io` (solo el dominio, sin `https://` ni el nombre del repo).

Sin esto el login anónimo falla y la app cae a modo local (`auth/unauthorized-domain`).

Recarga la página: arriba a la derecha debe decir **Nube · xxxxxx**.

---

## Cómo funciona el guardado

- Al abrir la app, Firebase crea una **sesión anónima** para ese navegador y todos los proyectos quedan asociados a ese ID.
- Se guardan en la colección `proyectos`, un documento por proyecto: `{ uid, nombre, actualizado, data }`.

### Biblioteca compartida

La lista de proyectos muestra **todos** los proyectos de todos los usuarios:

- Los tuyos aparecen marcados **· mío**; los demás, con el inicio del ID de su autor (**· de a1b2**).
- Cualquiera puede abrir cualquier proyecto y usarlo como punto de partida.
- **Guardar** solo sobrescribe proyectos propios. Si el nombre pertenece a otra persona, la app avisa y guarda una copia tuya.
- **Borrar** solo funciona sobre los propios; las reglas de Firestore lo impiden aunque se intente por otra vía.

Ten presente que la página es pública: cualquiera que tenga el enlace verá los proyectos guardados. No pongas datos de clientes ahí.
- La imagen de textura se reduce a 900 px y se comprime en JPEG antes de guardarse, para respetar el límite de 1 MB por documento de Firestore.

**Importante:** una sesión anónima no se puede recuperar. Si borras los datos del sitio, usas modo incógnito o cambias de equipo, Firebase crea un ID nuevo y no verás los proyectos anteriores. Para llevarte un proyecto a otro computador usa **Exportar** (descarga un `.json`) e **Importar**.

Si más adelante quieres que los proyectos te sigan entre dispositivos, hay que cambiar el acceso anónimo por inicio de sesión con Google (`signInWithPopup` + `GoogleAuthProvider`); las reglas de seguridad ya sirven tal como están.

## Costos

Todo esto entra en el plan gratuito **Spark** de Firebase: no se necesita tarjeta. Los límites diarios (decenas de miles de lecturas y escrituras) están muy por encima del uso de un taller. Firebase Storage no se usa justamente para evitar el plan de pago.

## Uso de la app

1. Define el tablero: medidas, kerf de la sierra y refile.
2. Carga las piezas: ancho × alto, cantidad, si la veta es fija y cuántos cantos lleva por lado.
3. **Cubicar y optimizar**.
4. Revisa el plano, la lista de cortes y la secuencia de sierra. Imprime o exporta a CSV.

Convención de medidas: el **Ancho** de cada pieza corre en el sentido de la veta. `C ↔` son los cantos en los bordes horizontales (los que miden el Ancho) y `C ↕` los de los bordes verticales.
