const { leerExcel } = require('./helpers/lector')

const { inquirerMenu,
    Confirmacion,
    leerInput,
    listadoTareasBorrar,
    confirmarAccion,
    listadoTareasCompletar
} = require('./helpers/inquirer');

const Cursos = require('./models/cursos');

const main = async () => {
    let Option = 0;
    const cursos = new Cursos();
    cursos.cargarArchivo(leerExcel());
    do {
        Option = await inquirerMenu()
        switch (Option) {
            case 0: break;
            case 1: //Listar Cursos Aprobados
                cursos.listarCursosAprobados();
                break;
            case 2: //Listar Cursos Desbloqueados
                cursos.listarCursosDesbloqueados();
                break;
            case 3: //Listar Cursos Pendientes
                cursos.listarCursosPendientes();
                break;
            case 4: //Listar Cursos Desbloqueados
                cursos.listarCursosPendientesObligatorios();
                break;
            case 5: //Aprobar Cursos Desbloqueados
                let tempCursosDesbloqueadosObligatorios = []
                cursos._cursosDesbloqueados.forEach(curso => {
                    if (curso.Obligatorio == "*") {
                        tempCursosDesbloqueadosObligatorios.push(curso)
                    }
                })
                const codigosCursos = await listadoTareasCompletar(tempCursosDesbloqueadosObligatorios)
                cursos.aprobarCursosPendientes(codigosCursos);
                break;
            case 6: //Hacer una linea del tiempo de cursos por periodo de tiempo
                countPeriodo = 1;
                countVacaciones = 0.0;
                let indexCursos, countCursos;
                do {
                    indexCursos = [];
                    countCursos = 0;/*
                    if (countPeriodo == 2 || countPeriodo == 5 || countPeriodo == 4 || countPeriodo == 3) {
                            let tempCursosDesbloqueadosObligatorios = []
                            cursos._cursosDesbloqueados.forEach( curso => {
                            if (curso.Obligatorio == "*") {
                                tempCursosDesbloqueadosObligatorios.push(curso)
                            }
                        })
                        const indexCursosTemp = await listadoTareasCompletar(tempCursosDesbloqueadosObligatorios)
                        cursos.aprobarCursosPendientes(indexCursosTemp);
                        console.log(`\n Periodo de Tiempo número: ${countVacaciones = countPeriodo-0.5}`)
                        console.log(`Llevas un total de ${cursos._creditos} créditos`)
                    }*/
                    cursos._cursosDesbloqueados.forEach(curso => {
                        if (curso.Obligatorio == "*") {
                            indexCursos.push(curso.index);
                            countCursos++;
                        }
                    })
                    if (indexCursos.length != 0) {
                        console.log('\n Periodo de Tiempo número: ' + countPeriodo + '')
                        console.log(`Llevas un total de ${cursos._creditos} créditos`)
                        console.log(' Total de Cursos: ' + countCursos)
                        cursos.listarCursosDesbloqueados();
                        cursos.aprobarCursosPendientes(indexCursos);
                        console.log('_________________________________________________\n')
                    }
                    countPeriodo++;
                } while (indexCursos.length != 0);
                break;
            
            case 7: //Ver lo que desbloquea de un curso
                const codigoCurso = await leerInput("Ingrese el códido del curso a evaluar");
                cursos.ramaCurso(codigoCurso);
            break;
                default:
                break;
        }
        await Confirmacion();
    } while (Option != 0);
}
main()