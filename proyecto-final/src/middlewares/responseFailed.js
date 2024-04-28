export function responseFailed(req, res, next) {
    res['failedPost'] = function (payload){
        res
            .status(401)
            .json({
                status: 'error', 
                payload,
                message: 'login fallado'
            })
        }
    res['failedGet'] = function (payload){
        res
            .status(400)
            .json({
                status: 'error', 
                payload,
                message: 'Aun no se inicio sesion '
            })
        } 
    res['failedTicket'] = function (message) {
        res
            .status(500)
            .json({
                status: 'error',
                message: message || 'Error con relacion con el ticket'
            });
        };    
    res['failedDelete'] = function (){
        res
            .status(500)
            .json({
                status: 'logout error', 
                body: "error"
            })
        }
    res['failedValidation'] = function (message) {
        res
            .status(422)
            .json({
                status: 'error',
                message: message || 'Error de validación de entrada'
            });
        };
    res['unauthorized'] = function (message) {
        res
            .status(401)
            .json({
                status: 'error',
                message: message || 'No autorizado'
            });
        };
    res['forbidden'] = function (message) {
        res
            .status(403)
            .json({
                status: 'error',
                message: message || 'Acceso prohibido'
            });
        };
    res['serverError'] = function (message) {
        res
            .status(500)
            .json({
                status: 'error',
                message: message || 'Error interno del servidor'
            });
        };
    res['failedCreateSession'] = function () {
        res
            .status(500)
            .json({
                status: 'error',
                message: 'Error al crear la sesión en la base de datos'
            });
        };

    res['failedFindSession'] = function () {
        res
            .status(500)
            .json({
                status: 'error',
                message: 'Error al buscar la sesión en la base de datos'
            });
        };

    res['failedDeleteSession'] = function () {
        res
            .status(500)
            .json({
                status: 'error',
                message: 'Error al eliminar la sesión de la base de datos'
            });
        }; 
    res['failedLogin'] = function () {
        res
            .status(401)
            .json({
                status: 'error',
                message: 'Error al iniciar sesión'
            });
        };
    next()
}