var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    this.horarios = this.horarios.filter(horario => horario != horarioReservado);    
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}


var sumarLista = function(lista){
    var totalSuma = 0;
    for (var i = 0; i < lista.length; i++) {
        totalSuma += lista[i];    
    }
    return totalSuma;
}

var promedioLista = function(lista){
    var prom = sumarLista(lista)/lista.length;
    return prom;
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {

        var promedio = promedioLista(this.calificaciones)
        return Math.round(promedio * 10) / 10;
    }

}

