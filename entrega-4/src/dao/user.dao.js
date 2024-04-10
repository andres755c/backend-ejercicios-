import { UserManager } from "../models/userModel.js";
import CustomError from "../services/errors/customErrors.js";
import EError from "../services/errors/enums.js";
import { logger } from "../utils/logger.js";

class UserDao {
    async  create(data){
        const user = (await UserManager.create(data)).toObject()
        return user;
    }

    async readOne(data){
            const user = await UserManager.findOne(data).lean()
            if(!user) CustomError.createError({
            name: "Usuario no encontrado",
            cause: "Datos no validos",
            message: logger.error("Usuario no encontrado"),
            code: EError.INVALID_VALUE
        })
        return user
    }

    async readMany(){
        const users = await UserManager.find().lean()
        return users
    }

    async updateOne(id, data){
        const newUser = await UserManager.findByIdAndUpdate(id,
            {$set: data},
            {new: true}).lean()
            return newUser    
    }

    async deleteOne(id){
        await UserManager.findByIdAndDelete(id)
    }
}

export const userDAO = new UserDao();