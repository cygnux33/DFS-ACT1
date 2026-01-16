														// Línea 1: app.js — JavaScript para mejorar UX del formulario y guardar datos
														// Línea 2: Este JS NO usa servidor; guarda mensajes en LocalStorage del navegador
														// Línea 3: Línea en blanco para legibilidad

														// Línea 5: Definimos una clave única para almacenar mensajes en LocalStorage
const STORAGE_KEY = "luzyenfoque_mensajes"; 				// Línea 6: Identificador del almacenamiento

														// Línea 8: Función para leer los mensajes guardados (si existen)
function cargarMensajes() { 							// Línea 9: Inicia función
  const raw = localStorage.getItem(STORAGE_KEY); 		// Línea 10: Lee JSON (string) desde LocalStorage
  if (!raw) {											// Línea 11: Si no hay datos
    return []; 											// Línea 12: Devuelve arreglo vacío
  } 													// Línea 13: Fin if
  return JSON.parse(raw); 								// Línea 14: Convierte a arreglo de objetos
} 														// Línea 15: Fin función

														// Línea 17: Función para guardar el arreglo completo de mensajes
function guardarMensajes(mensajes) { 					// Línea 18: Inicia función
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mensajes)); // Línea 19: Serializa y guarda
} 														// Línea 20: Fin función

														// Línea 22: Función para registrar fecha/hora en formato ISO
function ahoraISO() { 									// Línea 23: Inicia función
  return new Date().toISOString(); 						// Línea 24: Fecha/hora estándar
} 														// Línea 25: Fin función

														// Línea 27: Esperamos a que el DOM esté listo antes de buscar elementos
document.addEventListener("DOMContentLoaded", () => { 	// Línea 28: Evento DOMContentLoaded
  const form = document.getElementById("contactForm"); 	// Línea 29: Obtiene formulario
  const alertEl = document.getElementById("formAlert"); // Línea 30: Obtiene contenedor de estado

														// Línea 32: Si no existe el formulario (otra página), terminamos
  if (!form) { 											// Línea 33: Validación de existencia
    return; 											// Línea 34: Sale del callback
  } 													// Línea 35: Fin if

														// Línea 37: Interceptamos submit para guardar localmente
  form.addEventListener("submit", (e) => { 				// Línea 38: Listener del submit
    e.preventDefault(); 								// Línea 39: Evita recarga del navegador

														// Línea 41: Capturamos valores de los campos por name=...
    const nombre = form.nombre.value.trim(); 			// Línea 42: Nombre
    const email = form.email.value.trim(); 				// Línea 43: Email
    const mensaje = form.mensaje.value.trim(); 			// Línea 44: Mensaje

														// Línea 46: Validación mínima extra (además de required en HTML)
    if (nombre.length < 3 || mensaje.length < 10) { 	// Línea 47: Regla simple
      alertEl.textContent = "Revisa: nombre (mín. 3) y mensaje (mín. 10)."; // Línea 48: Feedback
      return; 											// Línea 49: No continúa
    } 													// Línea 50: Fin validación

														// Línea 52: Creamos el registro a guardar
    const nuevo = { 									// Línea 53: Objeto
      fecha: ahoraISO(), 								// Línea 54: Fecha ISO
      nombre: nombre, 									// Línea 55: Guarda nombre
      email: email, 									// Línea 56: Guarda email
      mensaje: mensaje 									// Línea 57: Guarda mensaje
    }; 													// Línea 58: Fin objeto

														// Línea 60: Leemos el arreglo, agregamos y guardamos
    const mensajes = cargarMensajes(); 					// Línea 61: Mensajes actuales
    mensajes.unshift(nuevo); 							// Línea 62: Inserta al inicio
    guardarMensajes(mensajes); 							// Línea 63: Guarda en LocalStorage

														// Línea 65: Notificamos éxito
    alertEl.textContent = "Mensaje guardado localmente (LocalStorage). Gracias por contactarnos."; // Línea 66: Mensaje de estado

														// Línea 68: Limpiamos el formulario
    form.reset(); 										// Línea 69: Resetea inputs
  }); 													// Línea 70: Fin listener
}); 													// Línea 71: Fin DOMContentLoaded