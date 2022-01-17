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
                const lugarSel = lugares.find(l => l.id === id);

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', );
                console.log('Lng:', );
                console.log('Temperatura:', );
                console.log('Mínima:', );
                console.log('Máxima:', );
            break;

            case 2:
                // Historial
                console.log('Historial');
            break;
            
            case 0:
                // Salir
                process.exit();
            break;
        
        }

        if (opt !== '0') await pausa();

    } while( opt !== '0' );
    
}

main();