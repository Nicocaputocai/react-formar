module.exports = {
    profile: async(req,res) =>{        
            try {
                return res.status(200).json({
                ok: true,
                msg: 'perfil de usuario',
                user: req.user
            })
            } catch (error) {
                res.status(error.status || 500).json({
                    ok: false,
                    msg: error.message || 'upss, hubo un error profile'
                })
            }

    }
}