require('dotenv').config()

const {
    leerInput,
    inquirerMenu,
    pausa,
    listarLugares
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() => {

    let opt = 0;
    const busquedas  = new Busquedas();

    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {

            case 1:
                // Buscar ciudad
                const termino = await leerInput('Ciudad: ');
                lugares = await busquedas.ciudad(termino);

                const id = await listarLugares(lugares);
                if(id === 0) continue;

                const lugarSel = lugares.find(l => l.id === id);

                // Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);

                // Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre.green);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                console.log('Cómo está el clima:', clima.desc.green);
            break;

            case 2:
                // Historial
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i+1}.`.green;
                    console.log(idx, lugar);
                });
            break;
            
            case 0:
                // Salir
                console.clear();
                process.exit();
            break;
        
        }

        if (opt !== '0') await pausa();

    } while( opt !== '0' );
    
}

main();