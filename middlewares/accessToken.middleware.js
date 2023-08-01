import fs from 'fs';
import jwt from 'jsonwebtoken';

export class validateToken {

    static validateJWT(request, response, next){
        const token = request.get('Authorization');
        
        let public_key = null;
        
        if (process.env.MODE != 'dev'){
            
            public_key = fs.readFileSync(process.env.PUBLIC_KEY, 'utf8')
        } else {
            public_key = fs.readFileSync('./keys/public.pem','utf8')
            
        }
        try{
            let decoded = jwt.verify(token, public_key);
            
        } catch(e) {
            return response.status(403).json({
                ok: false,
                errors: [{ message: 'Existe el siguiente problema con la cabecera' + e }]
            });
        }

        next();
    }

    /**
    * @param request
    * @param response
    * @param next
    */
   static middlewareRunning(request, response, next) {
    console.log('middleware running');
    next();
   }
}