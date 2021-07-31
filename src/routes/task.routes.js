//se van a definir las operaciones a travez de las url que vamos a dar en nuestro servidor
//es decir vamos a crear una url para agregar una tarea, otra para eliminar una tarea y otra para modificar una tarea

const express = require ('express'); //requiero express para crear rutas
const router = express.Router(); //este metodo me va a devolver un objeto en el cual vamos a poder ingresar rutas
const Task = require('../models/task'); //guardamos el modelo para hacer consultas a la base de datos

router.get('/', async (req,res)=>{
    const tasks = await Task.find(); //consulta para buscar en la base de datos las tareas y las guarda en una variable 
    console.log(tasks);
    res.json(tasks);
}); //sirve para definir rutas de mi servidor en este caso la ruta inicial

router.get('/:id', async(req, res)=>{
    const task = await Task.findById(req.params.id);
    res.json(task);
}); //sirve para buscar una tarea en particular

router.post('/', async(req, res)=>{
    const {title, description} = req.body;
    const task = new Task({title, description});
    await task.save();
    res.json('tarea guardada');

}); //sirve para guardar la tarea en la base de datos

router.put('/:id', async(req, res) =>{
    const {title, description} = req.body;
    const newtask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newtask);
    res.json('tarea Actualizada');
}); //sirve para actualizar una tarea

router.delete('/:id', async(req, res) =>{
    await Task.findByIdAndRemove(req.params.id);
    res.json('tarea Eliminada');
}); //sirve para eliminar una tarea


module.exports = router; //exportar las rutas