const axios = require('axios');

const obtenerDatosEnEspañol = async (event) => {
    try {
        // Obtener el número de personaje de la URL
        const peopleNumber = event.pathParameters.peopleNumber;
        
        // Construir la URL de SWAPI usando el número de personaje
        const swapiUrl = `https://swapi.py4e.com/api/people/${peopleNumber}/`;
        
        // Realizar la solicitud a SWAPI
        const respuesta = await axios.get(swapiUrl);
        const datos = respuesta.data;
        
        // Mapeo de nombres de atributos del inglés al español
        const mapeo = {
            "name": "nombre",
            "height": "altura",
            "mass": "masa",
            "hair_color": "color_del_cabello",
            "skin_color": "color_de_piel",
            "eye_color": "color_de_ojos",
            "birth_year": "año_de_nacimiento",
            "gender": "género",
            "homeworld": "planeta_natal",
            "films": "películas",
            "species": "especies",
            "vehicles": "vehículos",
            "starships": "naves_estelares",
            "created": "creado",
            "edited": "editado",
            "url": "enlace"
        };
        
        // Mapear nombres de atributos
        const datosEnEspañol = {};
        for (const key in datos) {
            if (key in mapeo) {
                datosEnEspañol[mapeo[key]] = datos[key];
            } else {
                datosEnEspañol[key] = datos[key];
            }
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify(datosEnEspañol)
        };
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

module.exports = {
    obtenerDatosEnEspañol,
};
