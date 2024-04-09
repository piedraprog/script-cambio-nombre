const fs = require('fs');
const path = require('path');

// Ruta de la carpeta donde se encuentran los archivos Markdown
const carpetaDocumentos = 'C:/Users/Windows 11/Documents/MEGA/obsidian/Personal/Notas diarias';

// Función para cambiar el nombre de los archivos
function cambiarNombreArchivos() {
    fs.readdir(carpetaDocumentos, (err, archivos) => {
        if (err) {
            console.error('Error al leer la carpeta:', err);
            return;
        }

        archivos.forEach(archivo => {
            const nombreAnterior = path.join(carpetaDocumentos, archivo);
            const fecha = extraerFechaDesdeNombre(archivo);
            if (fecha) {
                const nuevoNombre = `${fecha.getFullYear()}-${formatoNumero(fecha.getMonth() + 1)}-${formatoNumero(fecha.getDate())}.md`;
                const nombreNuevo = path.join(carpetaDocumentos, nuevoNombre);
                fs.rename(nombreAnterior, nombreNuevo, err => {
                    if (err) {
                        console.error(`Error al renombrar ${archivo}:`, err);
                    } else {
                        console.log(`${archivo} renombrado a ${nuevoNombre}`);
                    }
                });
            } else {
                console.warn(`El archivo ${archivo} no sigue el formato de fecha esperado.`);
            }
        });
    });
}

// Función para extraer la fecha del nombre del archivo
function extraerFechaDesdeNombre(nombreArchivo) {
    const patronFecha = /^(\d{2})-(\d{2})-(\d{4})\.md$/;
    const coincidencias = nombreArchivo.match(patronFecha);
    if (coincidencias) {
        const dia = parseInt(coincidencias[1]);
        const mes = parseInt(coincidencias[2]) - 1; // Los meses en JavaScript son de 0 a 11
        const año = parseInt(coincidencias[3]);
        return new Date(año, mes, dia);
    } else {
        return null;
    }
}

// Función para dar formato a números de un solo dígito con cero a la izquierda
function formatoNumero(numero) {
    return numero.toString().padStart(2, '0');
}

// Llamar a la función para cambiar los nombres de los archivos
cambiarNombreArchivos();