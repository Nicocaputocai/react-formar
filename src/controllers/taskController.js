module.exports = {
    list: async(req,res) =>{
        
            try {
                return res.status(200).json({
                ok: true,
                msg: 'lista de tareas'
            })
            } catch (error) {
                res.status(error.status || 500).json({
                    ok: false,
                    msg: error.message || 'upss, hubo un error list'
                })
            }
    },

    store: async(req,res) =>{        
            try {
                return res.status(201).json({
                ok: true,
                msg: 'tarea guardada'
            })
            } catch (error) {
                res.status(error.status || 500).json({
                    ok: false,
                    msg: error.message || 'upss, hubo un error store'
                })
            }
    },

    detail: async(req,res) =>{    
            try {
                return res.status(200).json({
                ok: true,
                msg: 'detalle de tarea'
            })
            } catch (error) {
                res.status(error.status || 500).json({
                    ok: false,
                    msg: error.message || 'upss, hubo un error detail'
                })
            }
    },

    updated: async(req,res) =>{
            try {
                return res.status(200).json({
                ok: true,
                msg: 'actualizador de tarea'
            })
            } catch (error) {
                res.status(error.status || 500).json({
                    ok: false,
                    msg: error.message || 'upss, hubo un error updated'
                })
            }


    },

    removed: async(req,res) =>{        
            try {
                return res.status(200).json({
                ok: true,
                msg: 'tarea eliminada'
            })
            } catch (error) {
                res.status(error.status || 500).json({
                    ok: false,
                    msg: error.message || 'upss, hubo un error removed'
                })
            }
    },

    changeState: async(req,res) =>{        
            try {
                return res.status(201).json({
                ok: true,
                msg: 'estado cambiado'
            })
            } catch (error) {
                res.status(error.status || 500).json({
                    ok: false,
                    msg: error.message || 'upss, hubo un error changeState'
                })
            }


    },
}