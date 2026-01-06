import {Hotel} from "../models/Hotel.js"
import {Testimonial} from "../models/Testimonial.js";

const paginaInicio = async (req, res) => {

    const promiseDB = [];
    promiseDB.push(Hotel.findAll({limit:3}));
    promiseDB.push(Testimonial.findAll({
        limit: 3,
        order: [['id', 'desc']],
    }));

    // Consultar 3 hoteles del modelo de Hotel
    try{
        const resultado = await Promise.all(promiseDB);

    res.render('inicio', {
        pagina: 'Inicio',
        clase: 'home',
        hoteles: resultado[0],
        testimonios: resultado[1],
    });
}catch(err){
    console.log(err);
    }
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros',
    });
}

const paginaHoteles = async (req, res) => {
    // Consultar en la Base de Datos
    const hoteles = await Hotel.findAll();

    res.render('hoteles', {
        pagina: 'Hoteles Disponibles',
        hoteles: hoteles,
    });
}

const paginaTestimonios = async (req, res) => {
    try{
        const testimonios = await Testimonial.findAll({
            limit: 3,
            order: [['id', 'desc']],
        });
        res.render('testimonios', {
            pagina: 'Reseñas',
            testimonios: testimonios,
        });
    } catch(error){
    console.error(error);}
}

// Muestra una pagina por su Detalle
const paginaDetallesHoteles = async (req, res) => {
    const {slug} = req.params;
    try{
        const resultado = await Hotel.findOne({where: {slug:slug}});
        res.render('hotel', {
            pagina: 'Informacion del Hotel',
            resultado: resultado,
        })
    } catch (error) {
        console.log(error);
    }
}

const guardarTestimonios = async (req, res) => {
    const {nombre, correo, mensaje} = req.body;
    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje: 'El nombre es obligatorio'});
    }
    if(correo.trim() === ''){
        errores.push({mensaje: 'El correo es obligatorio'});
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El mensaje es obligatorio'});
    }

    if(errores.length > 0){
        const testimonios = await Testimonial.findAll({
            limit: 3,
            order: [['id', 'desc']],
        });
        res.render('testimonios', {
            pagina: 'Reseñas',
            errores: errores,
            nombre: nombre,
            correo: correo,
            mensaje: mensaje,
            testimonios: testimonios,
        })
    } else{
        try{
            await Testimonial.create({nombre: nombre, correoelectronico: correo, mensaje: mensaje,});
            res.redirect('/testimonios'); // Guardo en la Base de Datos y lo envio a la misma vista
        } catch(error){
            console.log(error);
        }
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaHoteles,
    paginaTestimonios,
    paginaDetallesHoteles,
    guardarTestimonios,
}