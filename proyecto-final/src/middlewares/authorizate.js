import { responseFailed } from './responseFailed.js';

export function soloUsuariosLogueadosApi(req, res, next) {
    if (!req.isAuthenticated()) {
    return responseFailed.failedGet();
    }
    next();
}

export function soloUsuariosLogueadosWeb(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
        }
    next();
}

export function soloAdministrador(req, res, next) {
    if (req.user.rol !== "admin") {
    return res.send("solo administrador");
    }
    next();
}

export function soloUsuario(req, res, next) {
    if(req.user.rol !== "user"){
    return res.send("solo usuario");
    }
    next();
    };

    export function isAdmin(username, password) {
    return username === 'administrador@email.com' && password === 'administratorPro'
    }