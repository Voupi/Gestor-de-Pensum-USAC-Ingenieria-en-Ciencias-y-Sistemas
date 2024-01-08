const {leerExcel} = require('./helpers/lector')

const { inquirerMenu,
    Confirmacion,
    leerInput,
    listadoTareasBorrar,
    confirmarAccion,
    listadoTareasCompletar
} = require('./helpers/inquirer');

const Cursos = require('./models/cursos');
const { down } = require('inquirer/lib/utils/readline');

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
            case 5: //Listar Cursos Desbloqueados
                let tempCursosDesbloqueadosObligatorios = []
                cursos._cursosDesbloqueados.forEach( curso => {
                    if (curso.Obligatorio == "*") {
                        tempCursosDesbloqueadosObligatorios.push(curso)
                    }
                })
                const codigosCursos = await listadoTareasCompletar(tempCursosDesbloqueadosObligatorios)
                console.log(codigosCursos)
                cursos.aprobarCursosPendientes(codigosCursos);
            break;
            case 6: //Hacer una linea del tiempo de cursos por periodo de tiempo
                countPeriodo = 1;
                let indexCursos, countCursos;
                do {
                    indexCursos = [];
                    countCursos = 0;
                    //console.log(indexCursos.length + 'Tamaño del array')
                    console.log('\n Periodo de Tiempo número: '+countPeriodo +'\n')
                    cursos.listarCursosDesbloqueados();
                    cursos._cursosDesbloqueados.forEach( curso => {
                        if (curso.Obligatorio == "*") {
                            indexCursos.push(curso.index);
                            countCursos++
                        }
                    })
                    console.log('\n Total de Cursos: '+countCursos)
                    cursos.aprobarCursosPendientes(indexCursos);
                    countPeriodo++
                } while (indexCursos.length != 0 && countPeriodo < 15);
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