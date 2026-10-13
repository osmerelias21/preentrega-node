const BASE_URL = "https://6aceb5c8f338359cf1c3a1dc.mockapi.io";

console.log("--- Gestor CLI de Productos ---");

const inputArgs = process.argv.slice(2);
const accion = inputArgs[0];


async function listarProductos(endpoint) {
    try {
       const respuesta = await fetch(`${BASE_URL}/${endpoint}`);
        if (!respuesta.ok) {
            console.log("Error: No se pudo obtener la información de la API.");
            return;
        }
        const datos = await respuesta.json();
        return datos;
    } catch (err) {
        console.log("Error de red o conexión:", err.message);
    }
}


async function borrarProducto(endpoint) {
    try {
       const respuesta = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "DELETE"
        });
        if (!respuesta.ok) {
            console.log("Error: No se pudo eliminar el recurso solicitado.");
            return;
        }
        const datos = await respuesta.json();
        return datos;
    } catch (err) {
        console.log("Error de red o conexión:", err.message);
    }
}


async function guardarProducto(item) {
    try {
        const respuesta = await fetch(`${BASE_URL}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        });
        
        if (respuesta.ok) {
            const datos = await respuesta.json();
            console.log("Respuesta de la API:", datos);
            console.log("ID asignado:", datos.id);
        } else {
            console.log("Error: No se pudo guardar el registro en la API.");
        }
    } catch (err) {
        console.log("Error de red o conexión:", err.message);
    }
}


switch (accion) {
    case "GET":
        console.log("Ejecutando consulta GET...");
        if (inputArgs[1] && inputArgs[1].startsWith("products")) {
            const respuesta = await listarProductos(inputArgs[1]);
            if (respuesta) {
                console.log(respuesta);
            }
        } else {
            console.log("Error: Formato de comando inválido.");
        }
        break;

    case "POST":
        console.log("Ejecutando alta POST...");
        if (inputArgs[1] === "products" && inputArgs[2] && inputArgs[3] && inputArgs[4]) {
            const itemNuevo = {
                title: inputArgs[2],
                price: inputArgs[3],
                category: inputArgs[4]
            };
            await guardarProducto(itemNuevo);
            console.log("¡Producto registrado con éxito!");
        } else {
            console.log("Error: Faltan argumentos para registrar el producto.");
        }
        break;

    case "DELETE":
        console.log("Ejecutando baja DELETE...");
        if (inputArgs[1] && inputArgs[1].startsWith("products/") && inputArgs[1].length > 9) {
            const borrado = await borrarProducto(inputArgs[1]);
            if (borrado) {
                console.log("Confirmación de borrado:", borrado);
            }
        } else {
            console.log("Error: Especificá el ID a eliminar (ejemplo: products/1).");
        }
        break;

    default:
        console.log("Operación no reconocida. Usá GET, POST o DELETE.");
}