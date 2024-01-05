class Cursos{
    _pensum = []
    cargarArchivo(data = []) {
            this._pensum = data
    }
    listarCursosAprobados(){
        let cursosAprobados = "";
        let creditos = 0;
        this._pensum.forEach(curso => {
            if (curso.Estado_del_Curso == 'Aprobado') {
                cursosAprobados += JSON.stringify(curso) + '\n';
                creditos += curso.Creditos;
            }
        })
        console.log('Listado de Cursos Aprobados')
        console.log(cursosAprobados)
        console.log('Créditos Obtenidos ='+creditos)
    }
}
module.exports = Cursos;