import { userRepository } from "../repository/userRepository.js"
import { comparePass, hashear } from "../utils/criptografia.js"

class UserService{
    async createUser(data){
        return await userRepository.createUser(data)
    }

    async getUser(id){
        return await userRepository.getUser(id)
    }

    async getAllUsers(){
        return await userRepository.getAllUsers()
    }

    async updateUser(id, data){
        return await userRepository.updateUser(id, data)
    }

    async deleteUser(id){
        return await userRepository.deleteUser(id)
    }
};

class AuthService{
    async authenticateUser (email, password) {
        let datosDelUsuario
        const usuario = await userRepository.getUser({ email })
            if (!usuario) {
                throw new Error('el usuario no se pudo encontrar')
            }
            if (!comparePass(password, usuario['password'])) {
                throw new Error('ambas contraseñas no coinciden')
            }
                datosDelUsuario = {
                    email: usuario['email'],
                    name: usuario['name'],
                    lastname: usuario['lastname'],
                    rol: usuario['rol'],
                    cart: usuario['cart'],
                }
            if (!datosDelUsuario) {
                throw new Error('el usuario no se pudo encontrar')
                }
            return datosDelUsuario
        }

async registerUser(reqBody) {
    reqBody.password = hashear(reqBody.password)
    const creado = await userRepository.createUser(reqBody)
    const datosDelUsuario = {
        email: creado.email,
        name: creado.name,
        lastname: creado.lastname,
        rol: creado.rol
    }

    return datosDelUsuario
    }

    async resetearContrasenia (email, password) {
    const newPassword = hashear(password)
    const actualizado = await userRepository.updateUser(
        { email },
        { $set: { password: newPassword } },
        { new: true }
    )
    if (!actualizado) {
        throw new Error('el usuario no se pudo encontrar')
    }

    return {
        email: actualizado['email'],
        name: actualizado['name'],
        lastname: actualizado['lastname'],
        rol: actualizado['rol'],
        }
    }
}

export const userService = new UserService();
export const authService = new AuthService();