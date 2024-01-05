const {leerExcel} = require('./helpers/lector')

const { inquirerMenu,
    Confirmacion,
    leerInput,
    listadoTareasBorrar,
    confirmarAccion,
    listadoTareasCompletar
} = require('./helpers/inquirer');

const Cursos = require('./models/cursos')

const main = async() => {
    let Option = 0;
    const cursos = new Cursos();
    cursos.cargarArchivo(leerExcel());
    do {
        Option = await inquirerMenu()
        switch (Option) {
            case 0:break;
            case 1: //Listar Cursos Aprobados
                cursos.listarCursosAprobados();
                break;
            
            case 2: //Listar Cursos Desbloqueados
                cursos.listarCursosDesbloqueados();
            break;
            case 3: //Listar Cursos Desbloqueados
                cursos.listarCursosPendientes();
            break;
            case 4: //Listar Cursos Desbloqueados
                cursos.listarCursosPendientesObligatorios();
            break;
            default:
                /*for (let index = 0; index < 10; index++) {
                    //const element = array[index];
                    console.log(cursos._pensum[index])
                }*/
                break;
        }
        await Confirmacion();
    } while (Option != 0);
}
main()