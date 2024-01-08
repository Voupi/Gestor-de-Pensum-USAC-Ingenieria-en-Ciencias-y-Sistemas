class Cursos{
    _pensum = [];
    _creditos = 0;
    _cursosAprobados = []
    _cursosPendientes = []
    _cursosDesbloqueados = []
    cargarArchivo(data = []) {
        this._pensum = data
        let countCurso = 0
        this._pensum.forEach(curso => {
            if (curso.Estado_del_Curso == 'Aprobado') {
                this._cursosAprobados.push(curso)
                this._creditos += curso.Creditos;
            }
            else{
                this._cursosPendientes.push(curso)
                curso.Estado_del_Curso = 'Pendiente'
            }
            curso.index = countCurso;
            countCurso ++;
            const cadenaPrerequisito = curso.Prerequisito;//Convierte el text a un array de codigos
            let listPrerequisito = []
            if (cadenaPrerequisito) { //Si no hay nada en la cadenaprerequisito, entonces no se ejecuta
                let codigotemp=""
                for (let index = 0; index < cadenaPrerequisito.length; index++) {
                    if (cadenaPrerequisito[index]==",") {
                        listPrerequisito.push(codigotemp)
                        codigotemp = ""
                    }
                    else {
                        codigotemp+=cadenaPrerequisito[index];
                    }
                }
                listPrerequisito.push(codigotemp) //Añade lo que encontró después de la última ','
            }
            curso.Prerequisito = listPrerequisito; //Ya guarda convertido el array
        })
        this.calcularCursosDesbloqueados();
    }
    calcularCursosDesbloqueados(){
        this._cursosPendientes.forEach(cursoPendiente => {
            if (cursoPendiente.CreditosMinimos < this._creditos) {//Mira que se cumpla con los créditos
                const cadenaPrerequisito = cursoPendiente.Prerequisito;
                if (!cadenaPrerequisito) {    //Añade directamente al lista de desbloqueados si no tiene ningún prerequisito
                    this._cursosDesbloqueados.push(cursoPendiente)
                    this._pensum[cursoPendiente.index].Estado_del_Curso = 'Desbloqueado';
                }
                else {
                    if (this.validarPrerequisitos(cursoPendiente.Prerequisito) && cursoPendiente.Prerequisito.length != 0) {
                        this._cursosDesbloqueados.push(cursoPendiente);
                        this._pensum[cursoPendiente.index].Estado_del_Curso = 'Desbloqueado';
                    }
                }
            }
        })

    }
    aprobarCursosPendientes(codigosCursos = []){
        codigosCursos.forEach(codigo => {
            this._pensum[codigo].Estado_del_Curso = 'Aprobado';
            this._creditos+=this._pensum[codigo].Creditos;
            //this.consologCurso(this._pensum[codigo])
        })
        this.actualizarEstadosCursos(); //Actualiza los ultimos cambios en todos los arrays
        this.calcularCursosDesbloqueados();
    }
    actualizarEstadosCursos(){
        this._cursosAprobados = []
        this._cursosPendientes = []
        this._cursosDesbloqueados = []
        this._pensum.forEach(curso => {
            if (curso.Estado_del_Curso == 'Aprobado'){
                this._cursosAprobados.push(curso);
            }
            else if (curso.Estado_del_Curso == 'Pendiente'){
                this._cursosPendientes.push(curso);
            }
            else if (curso.Estado_del_Curso == 'Desbloqueado'){
                this._cursosDesbloqueados.push(curso);
            }
        })
    }
    listarCursosPendientesObligatorios(){
        console.log('Listado de Cursos Pendientes Necesarios')
        let tempCreditos = 0
        let countCursos = 0
        this._cursosPendientes.forEach(curso => {
            if (curso.Obligatorio == "*") {
                this.consologCurso(curso)
                tempCreditos += curso.Creditos;
                countCursos++;
            }    
        })
        console.log(`Total de cursos pendientes ${countCursos}, créditos a obtener: ${tempCreditos}`)
    }
    listarCursosPendientes(){//Lista los curso que debe cursar, solo obligatorios
        console.log('Listado de Cursos Pendientes')
        this._cursosPendientes.forEach(curso => {
                this.consologCurso(curso)
            })
    }
    listarCursosAprobados(){
        console.log('Listado de Cursos Aprobados')
        this._cursosAprobados.forEach(curso => {
                this.consologCurso(curso)
            })
        console.log('Créditos Obtenidos = '+this._creditos)
    }
    listarCursosDesbloqueados(){//Lista los curso que debe cursar, solo obligatorios
        console.log('Listado de Cursos Desbloqueados Obligatorios')
        this._cursosDesbloqueados.forEach(curso => {
                if (curso.Obligatorio == "*") {
                    this.consologCurso(curso)
                }
            })
    }
    validarPrerequisitos (listPrerequisito = []){
        //let encontrado = true
        for (let i = 0; i < listPrerequisito.length; i++) {
            if (!this.encontrarCursoAprobado(listPrerequisito[i])) {//Es para que si encuentra uno que un curso que no esté aprobado returno que el curso no puede ser desbloqueado
                return false; //Retorna si no encuentra el curso
            }
        }
        return true
    }
    encontrarCursoAprobado(codigoCurso = 0){
        for (let i = 0; i < this._cursosAprobados.length; i++) {
            if (this._cursosAprobados[i].Codigo_Curso ==codigoCurso) {
                return true;
            }
        }
        return false
    }
    consologCurso(curso = {}){
        console.log(`${curso.Codigo_Curso}  ${curso.Nombre_Curso}`)
    }
}
module.exports = Cursos;