const inquirer = require('inquirer');
require('colors');
const menuQuestions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: '1.'.yellow+' Crear Tarea'
            },
            {
                value: '2',
                name: '2.'.yellow+' Listar Tareas'
            },
            {
                value: '3',
                name: '3.'.yellow+' Listar Tareas Completadas'
            },
            {
                value: '4',
                name: '4.'.yellow+' Listar Tareas Pendientes'
            },
            {
                value: '5',
                name: '5.'.yellow+' Completar Tarea(s)'
            },
            {
                value: '6',
                name: '6.'.yellow+' Borrar Tarea'
            },
            {
                value: '7',
                name: '7.'.yellow+' Salir'
            }
        ]
    }
];
const pausa = [
    {
        type: 'input',
        message: 'Presione cualquier tecla para continuar',
        name: 'No-name'
    }
]

const inquirerMenu = async() => {
    //console.clear();
    console.log('======================='.green);
    console.log('Seleccione un opción'.white);
    console.log('=======================\n'.green);
    const {option} = await inquirer.prompt(menuQuestions); //se desestructura opcion para que solo mande el valor, no el objeto
    return option;
}

const Confirmacion = async() => {
    console.log('\n');
    await inquirer.prompt(pausa);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate (value){
                if (value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]
    const {descripcion}  = await inquirer.prompt(question);
    return descripcion;
}
const listadoTareasBorrar = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${(i+2)+'.'}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`
        }
    })
    choices.unshift({//Añade un dato al inicio del choices
        value: '1',
        name: '1.'.green + ' Cancelar'
    });
    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(question);
    return id;
}

const listadoTareasCompletar = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${(i+1)}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(question);
    return ids;
}

const confirmarAccion = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}
module.exports = {
    inquirerMenu,
    Confirmacion,
    leerInput,
    listadoTareasBorrar,
    confirmarAccion,
    listadoTareasCompletar
}