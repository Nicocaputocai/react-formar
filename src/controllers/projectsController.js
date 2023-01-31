module.exports = {
    list: async(req,res) =>{
        
            try {
                return res.status(200).json({
                ok: true,
                msg: 'lista de proyectos'
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
                msg: 'proyectos guardados'
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
                msg: 'detalle del proyecto'
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
                msg: 'actualizador de proyecto'
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
                msg: 'lista de proyectos'
            })
            } catch (error) {
                res.status(error.status || 500).json({
                    ok: false,
                    msg: error.message || 'upss, hubo un error removed'
                })
            }
    },

    addColaborator: async(req,res) =>{        
            try {
                return res.status(201).json({
                ok: true,
                msg: 'colaborador agregado'
            })
            } catch (error) {
                res.status(error.status || 500).json({
                    ok: false,
                    msg: error.message || 'upss, hubo un error addcolaborator'
                })
            }


    },

    removedColarator: async(req,res) =>{        
            try {
                return res.status(200).json({
                ok: true,
                msg: 'colaborador eliminado'
            })
            } catch (error) {
                res.status(error.status || 500).json({
                    ok: false,
                    msg: error.message || 'upss, hubo un error removedColaborator'
                })
            }


    },
    
}