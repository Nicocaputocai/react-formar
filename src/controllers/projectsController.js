const createError = require("http-errors")
const Project = require("../models/Project")
const ObjectId = require("mongoose").Types.ObjectId

module.exports = {
    list: async(req,res) =>{
        
            try {
                //Con el Where filtro solo los proyectos que coinciden con el id de created by
                const projects = await Project.find().where('createdBy').equals(req.user)
                return res.status(200).json({
                ok: true,
                msg: 'lista de proyectos',
                projects
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
                const {name, description, client} = req.body; 
                if([name, description, client].includes("") || !name || !description || !client ) throw createError(400,"Todos los campos son obligatorios");
                if(!req.user) throw createError(401,"Error de autenticación");

                const project = new Project(req.body);


                project.createdBy = req.user._id
                // console.log(project);
                const projectStore = await project.save()

                return res.status(201).json({
                ok: true,
                msg: 'proyectos guardados',
                project: projectStore
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
                const {id} = req.params
                if(!ObjectId.isValid(id)) throw createError(400, "no es un id valido")
                const project = await Project.findById(id)
                if(!project) throw createError(404,"Proyecto inexistente");
                if((req.user._id.toString()) != project.createdBy.toString()) throw createError(401,"Error de autenticación");

                return res.status(200).json({
                ok: true,
                msg: 'detalle del proyecto',
                project
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
                const {id} = req.params

                if(!ObjectId.isValid(id)) throw createError(400, "no es un id valido")
                
                const project = await Project.findById(id)
                const {name,description, client, dataExpire} = req.body
                if(!project) throw createError(404,"Proyecto inexistente");

                if((req.user._id.toString()) != project.createdBy.toString()) throw createError(401,"Error de autenticación");

                project.name = name || project.name
                project.description = description || project.description
                project.client = client || project.client
                project.dataExpire = dataExpire || project.dataExpire

                const projectUpdated = await project.save()

                return res.status(200).json({
                ok: true,
                msg: 'actualizador de proyecto',
                project: projectUpdated
            })
            } catch (error) {
                res.status(error.status || 500).json({
                    ok: false,
                    msg: error.message || 'upss, hubo un error updated'
                })
            }


    },

    removed: async(req,res) =>{       
        const {id} = req.params

        if(!ObjectId.isValid(id)) throw createError(400, "no es un id valido")
        
        const project = await Project.findById(id)

        if(!project) throw createError(404,"Proyecto inexistente");

        await project.deleteOne()

        if((req.user._id.toString()) != project.createdBy.toString()) throw createError(401,"Error de autenticación");
            try {
                return res.status(200).json({
                ok: true,
                msg: 'Proyecto eliminado'

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