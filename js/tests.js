var expect = chai.expect; 

describe('Realiza las reservas ', function(){
    it('Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.', function(){
        var testRestaurante = new Restaurant(1, "Prueba", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        var horarioEsperado = testRestaurante.horarios.slice(1,3);
        testRestaurante.reservarHorario("13:00");
        expect(testRestaurante.horarios).eql(horarioEsperado);        
    }
    )
    it('Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.',function(){
        var testRestaurante = new Restaurant(1, "Prueba", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        var horarioEsperado = testRestaurante.horarios;
        testRestaurante.reservarHorario("20:00");
        expect(testRestaurante.horarios).eql(horarioEsperado);
    });
    it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.', function(){
        var testRestaurante = new Restaurant(1, "Prueba", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        var horarioEsperado = testRestaurante.horarios;
        testRestaurante.reservarHorario();
        expect(testRestaurante.horarios).eql(horarioEsperado);
    })
})

describe('Testeo obtener puntuacion ', function(){
    it('Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente', function(){
        var testRestaurante = new Restaurant(1, "Prueba", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        var puntuacionEsperada = 0;
        for (var i = 0; i< testRestaurante.calificaciones.length; i++) {
            puntuacionEsperada += testRestaurante.calificaciones[i];       
        }
        puntuacionEsperada /= testRestaurante.calificaciones.length;
        expect(testRestaurante.obtenerPuntuacion()).to.equal(puntuacionEsperada);        
    });
    it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.', function(){
        var testRestaurante = new Restaurant(1, "Prueba", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg",[]);
        expect(testRestaurante.obtenerPuntuacion()).to.equal(0);
    })

})

describe('Testeo calificar ', function(){
    it('Una calificacion entre 1 y 10 se añade a la lista de calificaciones', function(){
        var testRestaurante = new Restaurant(1, "Prueba", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        var calificacionEsperada = testRestaurante.calificaciones;
        calificacionEsperada.push(8);
        testRestaurante.calificar(8);
        expect(testRestaurante.calificaciones).eql(calificacionEsperada);        
    });
    it('Una calificacion mayor de 10 no cambia la lista de calificaciones', function(){
        var testRestaurante = new Restaurant(1, "Prueba", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        var calificacionEsperada = testRestaurante.calificaciones;
        testRestaurante.calificar(11);
        expect(testRestaurante.calificaciones).eql(calificacionEsperada);        
    });
    it('Una calificacion vacia no cambia la lista de calificaciones', function(){
        var testRestaurante = new Restaurant(1, "Prueba", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        var calificacionEsperada = testRestaurante.calificaciones;
        testRestaurante.calificar()
        expect(testRestaurante.calificaciones).eql(calificacionEsperada);        
    });


})

var testListadoDeRestaurantes = [
    new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
    new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
    new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9])
]


describe('Testeo buscarRestaurante() ', function(){
    it('Busqueda de restaurante con Id 1, devuelve el restaurante 1', function(){
        var listado = new Listado(testListadoDeRestaurantes);  
        expect(listado.buscarRestaurante(1)).eql(testListadoDeRestaurantes[0]);        
    });
    it('Busqueda de restaurante con id que no existe, devuelve el restaurante no existe', function(){
        var listado = new Listado(testListadoDeRestaurantes);  
        expect(listado.buscarRestaurante(5)).to.equal("No se ha encontrado ningún restaurant");        
    });
})

describe('Testeo obtenerRestaurante() ', function(){
    it('obtener restaurantes sin ningun filtro, devuelve un array vacio', function(){
        var listado = new Listado(testListadoDeRestaurantes);
        expect(listado.obtenerRestaurantes()).eql([]);        
    });
    it('obtener restaurantes con filtro  (rubro,null,null) devuelve el objeto adeacuado de  la lista (en una lista)', function(){
        var listado = new Listado(testListadoDeRestaurantes);
        var filtroRubroTest="Asiática";
        restaurantesFiltradosTest = listado.restaurantes.filter(restaurant => restaurant.rubro == filtroRubroTest)
        expect(listado.obtenerRestaurantes(filtroRubroTest,null,null)).eql(restaurantesFiltradosTest);        
    });

    it('obtener restaurantes con filtro  (null,ciudad,null) devuelve el objeto adeacuado de  la lista (en una lista)', function(){
        var listado = new Listado(testListadoDeRestaurantes);
        var filtroCiudadTest="New York";
        restaurantesFiltradosTest = listado.restaurantes.filter(restaurant => restaurant.ubicacion == filtroCiudadTest)
        expect(listado.obtenerRestaurantes(null,filtroCiudadTest,null)).eql(restaurantesFiltradosTest);        
    });

    it('obtener restaurantes con filtro  (null,null,horario) devuelve el objeto adeacuado de  la lista (en una lista)', function(){
        var listado = new Listado(testListadoDeRestaurantes);
        var filtroHorarioTest="New York";
        restaurantesFiltradosTest = listado.restaurantes.filter(function(res) {
            return res.horarios.some(horario => horario == filtroHorarioTest);
        })
        expect(listado.obtenerRestaurantes(null,null,filtroHorarioTest)).eql(restaurantesFiltradosTest);        
    });

    it('obtener restaurantes con filtro  (null,null,null) devuelve el atributo restaurantes del listado', function(){
        var listado = new Listado(testListadoDeRestaurantes);
        expect(listado.obtenerRestaurantes(null,null,null)).eql(listado.restaurantes);        
    });

})