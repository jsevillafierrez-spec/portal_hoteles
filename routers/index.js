import express from 'express';
import {paginaInicio, paginaNosotros, paginaTestimonios, paginaHoteles, paginaDetallesHoteles, guardarTestimonios} from "../controllers/paginaController.js";

const router = express.Router();


// req lo que enviamos / res lo que nos responde
router.get('/', paginaInicio);
router.get('/testimonios', paginaTestimonios);
router.get('/nosotros', paginaNosotros);
router.get('/hoteles', paginaHoteles);

// Los dos puntos es como un comodin y no repetir las paginas
router.get('/hoteles/:slug', paginaDetallesHoteles);

router.post('/testimonios', guardarTestimonios)
export default router;