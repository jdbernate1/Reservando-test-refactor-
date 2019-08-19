var Reserva = function (horario, cantPersonas, precioxPersona, codDescuento){
    this.horario = horario;
    this.cantidadPersonas = cantPersonas;
    this.precioXpersona = precioxPersona;
    this.codigoDescuento = codDescuento;  
}


Reserva.prototype.calcularPrecioBase = function(){
    return this.cantidadPersonas * this.precioXpersona;
}

Reserva.prototype.calcularAdicionales = function(){
    var hora = this.horario.getHours();
    var dia = this.horario.getDay();
    var precioBase = this.calcularPrecioBase();
    var adicional = 0;

    if((hora>=13 && hora<=14) || (hora>=20 && hora<=21)){
        adicional += precioBase*0.05;
    }

    if(dia == 0 || dia >= 5){
        adicional += precioBase*0.1;
    }
    return adicional;
}


Reserva.prototype.calcularDescuentos = function () {
    var tipoDescuento = this.codigoDescuento;
    var descuento = 0;
    var precioBase = this.calcularPrecioBase()
    if(this.cantidadPersonas>=4 &&  this.cantidadPersonas<=6){
        descuento= precioBase*0.05;
    } if(this.cantidadPersonas>=7 &&  this.cantidadPersonas<=8){
        descuento =precioBase*0.1;
    } if(this.cantidadPersonas>8){
        descuento=precioBase*0.15;
    }

    if(tipoDescuento === 'DES15'){
        descuento += precioBase*0.15;
    } if (tipoDescuento ==='DES200'){
        descuento += 200;
    } if(tipoDescuento ==='DES1'){
        descuento += this.precioXpersona;
    }
    return descuento
    
}

Reserva.prototype.calcularPrecioFinal = function() {
    return this.calcularPrecioBase() + this.calcularAdicionales() - this.calcularDescuentos();
}

        