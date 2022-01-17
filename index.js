const {
    leerInput,
    inquirerMenu,
    pausa
} = require('./helpers/inquirer');

const main = async() => {

    let opt = 0;

    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {

            case 1:
                // Buscar ciudad
                console.log('Buscar ciudad');
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

        await pausa();

    } while( opt !== '0' );
    
}

main();