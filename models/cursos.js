class Cursos{
    _pensum = [];
    _creditos = 0;
    _cursosAprobados = []
    _cursosPendientes = []
    _cursosDesbloqueados = []
    cargarArchivo(data = []) {
            this._pensum = data
            this._pensum.forEach(curso => {
                if (curso.Estado_del_Curso == 'Aprobado') {
                    this._cursosAprobados.push(curso)
                    this._creditos += curso.Creditos;
                }
                else{
                    this._cursosPendientes.push(curso)
                }
            })

            this._cursosPendientes.forEach(cursoPendiente => {
                if (cursoPendiente.CreditosMinimos < this._creditos) {//Mira que se cumpla con los créditos
                    //console.log(JSON.stringify(cursoPendiente))
                    //const cadenaPrerequisito = JSON.stringify(cursoPendiente.Prerequisito)
                    const cadenaPrerequisito = cursoPendiente.Prerequisito;
                    if (!cadenaPrerequisito) {
                        this._cursosDesbloqueados.push(cursoPendiente)
                    }
                    else {
                        //console.log(cadenaPrerequisito + "Es la cadena cadenaPrerequisitol Prerequisito");
                        //let listPrerequisito = cadenaPrerequisito.split(',');
                        let listPrerequisito = []
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
                        listPrerequisito.push(codigotemp)
                        //console.log(listPrerequisito + "Es el array del prerequisito")
                        if (this.validarPrerequisitos(listPrerequisito) && listPrerequisito.length != 0) {
                            this._cursosDesbloqueados.push(cursoPendiente)
                        }
                    }
                }
            })
    }
    listarCursosPendientesObligatorios(){
        console.log('Listado de Cursos Pendientes Necesarios')
        this._cursosPendientes.forEach(curso => {
            if (curso.Obligatorio == "*") {
                this.consologCurso(curso)
            }    
            })
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
        /*
        listPrerequisito.forEach(codigoPrerequisito =>{
            if (!this.encontrarCursoAprobado(codigoPrerequisito)) {
                encontrado = false; //Retorna si no encuentra el curso
                break etiquetaForEach;
            }
        })
        return encontrado; //Si encontró que todos los prerequisitos están, entonces el curso está desbloqueado
        */
    }
    encontrarCursoAprobado(codigoCurso = 0){
        for (let i = 0; i < this._cursosAprobados.length; i++) {
            if (this._cursosAprobados[i].Codigo_Curso ==codigoCurso) {
                return true;
            }
        }
        return false //Si no encontró nada lo retorna
        /*let encontrado = false;
        this._cursosAprobados.forEach(curso => {
            if (curso.Codigo_Curso == codigoCurso) {
                encontrado = true
                return
            }
        })
        return encontrado;*/
    }
    consologCurso(curso = {}){
        console.log(`${curso.Codigo_Curso}  ${curso.Nombre_Curso}`)
    }
}
module.exports = Cursos;