const User = require('../models/User')
const createError = require('http-errors')
const errorResponse = require('../helpers/errorResponse')
const gerenerateToken = require('../helpers/generateToken')
const { token } = require('morgan')
const generateToken = require('../helpers/generateToken')
const {confirmRegister, forgotPassword} = require('../helpers/sendMails')

module.exports ={
    register : async (req,res) =>{
        
        try {

            const {name,email,password} = req.body;
            // const name = req.body.name;
            // const email = req.body.email
            // const password = req.body.password

            if([name,email,password].includes("")){
                throw createError(400,"Todos los campos son obligatorios")
            };

            let user = await User.findOne({
                email
            })

            if(user){
                throw createError(400,"Este email ya se encuentra registrado")
            }
            const token = generateToken()
            user = new User(req.body)
            user.token = token

            const userStore = await user.save()

            confirmRegister({
                name: userStore.name,
                email: userStore.email,
                token: userStore.token
            })
            return res.status(201).json({
                ok : true,
                msg :'Usuario Registrado',
                data: userStore

            })
            
        }
        catch(error) {
            return errorResponse(res,error, "REGISTER")
        }

        },
            login: async (req,res) =>{

                const {email,password} = req.body;


                try {
                    if([email,password].includes("")){
                        throw createError(400,"Todos los campos son obligatorios")
                    };
                    const user = await User.findOne({
                        email
                    })
                    if(!user){
                        throw createError(403,"Credenciales inválidas")
                    }

                    if(!user.checked){
                        throw createError(403,"Cuenta sin confirmar")
                    }

                    if (!await user.checkedPassword(password)) {
                        throw createError(403,"Credenciales inválidas")
                    }

                    return res.status(200).json({
                        ok: true,
                        msg: 'usuario logueado',
                        user : {
                            nombre : user.name,
                            _id : user._id,
                        },
                        token : generateToken({
                            id: user._id
                        })
                        
                    })
                    } catch (error) {
                        return errorResponse(res,error, "LOGIN")
                    }

    },
        checked:async (req,res) =>{
            const {token} = req.query
            try {

                if(!token){
                    throw createError(400,"Token inexistente");
                };

                const user = await User.findOne({
                     token
                 })

                 if(!user){
                    throw createError(400,"Token inexistente");
                };
                
                user.checked = true;
                user.token = "";

                await user.save()

                return res.status(201).json({
                ok: true,
                msg: 'Su registro fue completado exitosamente'
            })
            } catch (error) {
                return errorResponse(res,error, "CHECKED")
            }

    },
        sendToken:async (req,res) =>{
            const {email} = req.body;



            try {
                let user = await User.findOne({
                    email
                })
                
                if(!user) throw createError(400,"Su correo no está registrado");

                const token = generateToken()

                user.token = token
                await user.save()

                await forgotPassword({
                    name: user.name,
                    email: user.email,
                    token: user.token
                })

                return res.status(200).json({
                ok: true,
                msg: 'Revise su correo para reestablecer su contraseña'
            })
            } catch (error) {
                res.status(error.status || 500).json({
                    ok: false,
                    msg: error.message || 'upss, hubo un error en sendToken'
                })
            }

    },
        verifyToken:async (req,res) =>{
                
            try {
                const {token} = req.query;

                if(!token) throw createError(400,'no hay token')

                const user = await User.findOne({
                    token
                })

                if(!user) throw createError(400,'token inválido');

                return res.status(200).json({
                ok: true,
                msg: 'token verificado'
            });
            } catch (error) {
                res.status(error.status || 500).json({
                    ok: false,
                    msg: error.message || 'upss, hubo un error en verifyToken'
                });
            };

    },
    changePassword:async (req,res) =>{
                
        try {
            const {token} = req.query;
            const {password} = req.body;

            if(!password) throw createError(400,'no escribió ninguna contraseña');

            const user = await User.findOne({
                token
            });

            if(!user) throw createError(400, "El token es inválido")

            user.password = password;
            user.token= "";
            await user.save()
            if(!user) throw createError(400,'token inválido');

            return res.status(200).json({
            ok: true,
            msg: 'Contraseña actualizada'
        });
        } catch (error) {
            res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'upss, hubo un error en changePassword'
            });
        };

},
}