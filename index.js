console.log("Inicio de programa");

const args = process.argv.slice(2);

async function obtenerProductos(url) {
    try {
        const response = await fetch(`https://6ac4673d54a61668c5f57ff4.mockapi.io/${url}`);
        if (!response.ok) {
            console.log("Error en el servidor o respuesta no valida");
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error de conexion:", error.message);
    }
}

async function eliminarProducto(producto) {
    try {
        const response = await fetch(`https://6ac4673d54a61668c5f57ff4.mockapi.io/${producto}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            console.log("Error en el servidor al intentar eliminar");
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error de conexion:", error.message);
    }
}

async function crearProducto(producto) {
    try {
        const response = await fetch("https://6ac4673d54a61668c5f57ff4.mockapi.io/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            console.log("Id del producto creado: ", data.id);
        } else {
            console.log("No se pudo crear el producto en la API");
        }
    } catch (error) {
        console.log("Error de conexion:", error.message);
    }
}

switch (args[0]) {
    case "GET":
        console.log(args[0]);
        if (args[1] && args[1].startsWith("products")) {
            const resultado = await obtenerProductos(args[1]);
            if (resultado) {
                console.log(resultado);
            }
        } else {
            console.log("Comando incorrecto");
        }
        break;

    case "POST":
        console.log(args[0]);
        if (args[1] === "products" && args[2] && args[3] && args[4]) {
            const nuevoProducto = {
                title: args[2],
                price: args[3],
                category: args[4]
            };
            await crearProducto(nuevoProducto);
            console.log("Producto creado");
        } else {
            console.log("Comando incompleto o incorrecto");
        }
        break;

    case "DELETE":
        console.log(args[0]);
        if (args[1] && args[1].startsWith("products/") && args[1].length > 9) {
            const resultado = await eliminarProducto(args[1]);
            if (resultado) {
                console.log("Producto eliminado ", resultado);
            }
        } else {
            console.log("Comando incompleto o incorrecto");
        }
        break;

    default:
        console.log("Comando incorrecto");
}