
const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');


exports.consultasHomePageController = async (req,res) => {

    //ARREGLO DE PROMISES
    const promises = [];
    const viajes = await Viaje.findAll({ limit: 3 });
    const testimoniales = await Testimonial.findAll({ limit: 3 }) ;

    //pasar el promise y ejecutarlo
    const resultado = Promise.all(promises);
    
    res.render('index',{
            pagina : 'Inicio',
            clase: 'home',
            viajes ,
            testimoniales 
    });
    
}