// ---------------------------------------------------------------------------
// Credenciales de Firebase — proyecto: cubicadortab
//
// Si la app muestra un error tipo "auth/api-key-not-valid", vuelve a la consola
// (Configuración del proyecto -> Tus apps -> opción "Config"), copia el bloque
// con Ctrl+C y pégalo aquí encima: basta un carácter distinto para que falle.
//
// Estas claves NO son secretas: viajan al navegador de cualquier visitante.
// Lo que protege tus datos son las reglas de firestore.rules.
// ---------------------------------------------------------------------------

export const firebaseConfig = {
  apiKey: "AIzaSyBWS7ro49sFay7zlfFNO0hb0yqGfi4CW9c",
  authDomain: "cubicadortab.firebaseapp.com",
  projectId: "cubicadortab",
  storageBucket: "cubicadortab.firebasestorage.app",
  messagingSenderId: "564538038833",
  appId: "1:564538038833:web:84c18eb5dec42c74fe5310"
};

// Nombre de la colección donde se guardan los proyectos.
export const COLECCION = "proyectos";
