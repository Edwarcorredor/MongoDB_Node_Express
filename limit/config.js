import { rateLimit } from "express-rate-limit";

export let limitGet = () => {
    return rateLimit({
        windowMs : 30*1000,
        max: 5,
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req, res) =>{
            if(req.headers["content-length"]>120){
                res.status(413).send({
                    status:413,
                    message: "Tamaño incorrecto"
                })
                return true;
            }
        },
        message: {
            status:429,
            message: "Acceso denegado"
        }
    });
}