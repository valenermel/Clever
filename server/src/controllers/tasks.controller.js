import Task from '../models/task.model.js'

//modelo crud
export const getTasks = async (req,res) => {
    const tasks = await Task.find({
        user: req.user.id //esto es para q solo traiga las tareas del usuario que las pidio
    }).populate('user')
    res.json(tasks)
}

export const createTask = async (req,res) => {
    const {title,description,date} = req.body
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id //funciona gracias a q pasa por el authRequired y este guarda el user (req.user)
    })
    const taskSaved = await newTask.save()
    res.json(taskSaved)
}

export const getTask = async (req,res) => {
    const task = await Task.findById(req.params.id).populate('user') //el populate es para que se guarde todos los datos del usuario, no solo su id
    if (!task) return res.status(404).json({message:"Task not found"})
    res.json(task)
}

export const deleteTask = async (req,res) => {
    const task = await Task.findByIdAndDelete(req.params.id) //el req params id es el id que obtiene de /api/tasks/:id
    if (!task) return res.status(404).json({message:"Task not found"})
    res.json(task)
}

export const updateTask = async (req,res) => {
    const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true}) //el new true se usa ya que mongoose por defecto te devulve el dato antes de ser actualizado, al poner new te devuelve el dato ya actualizado
    if (!task) return res.status(404).json({message:"Task not found"})
    res.json(task)
}