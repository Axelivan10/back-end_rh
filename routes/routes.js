import express from "express";
import { userController } from '../controllers/user.controllers.js'
import { colaboradorController } from "../controllers/colaborador.controllers.js";

import { validateToken } from "../middlewares/accessToken.middleware.js";
 import { uploadImage } from '../middlewares/multer.middleware.js';

export class Routes {
    /**
     * @param app
     */
    initRoutes(app = express.application) {
        app.get('/', (req, res) => {
            res.send('hola mundo');
        });

/*USER ROUTES*/
            /* CREAR - LISTAR - MOSTRAR1 - ACTUALIZAR - BORRAR*/


        app.route('/user', userController.create).post([], userController.create);
        app.route('/user', userController.find).get([validateToken.validateJWT], userController.find);
        app.route('/user/:id', userController.findid).get([], userController.findid);
        app.route('/user/:id', userController.update).put([], userController.update);
        app.route('/user/:id', userController.delete).delete([validateToken.validateJWT], userController.delete);

        app.post('/login', userController.login);


/*COLABORADOR ROUTES*/

    // //multer
        app.post('/colaborador/:id/avatar', uploadImage, colaboradorController.uploadColaboradorAvatar);
            
        app.route('/colaborador', colaboradorController.create).post([], colaboradorController.create);
        app.route('/colaborador', colaboradorController.find).get([], colaboradorController.find);
        app.route('/colaborador/:id', colaboradorController.findid).get([], colaboradorController.findid);
        app.route('/colaborador/:id', colaboradorController.update).put([], colaboradorController.update);
        app.route('/colaborador/:id', colaboradorController.delete).delete([], colaboradorController.delete);











    }
}