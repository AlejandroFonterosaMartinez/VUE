const express = require('express');
const router = express.Router();

const Tarea = require('../models/Tareas');

router.get('/', async (req,res) => {
   const tareas = await Tarea.find();
   res.json(tareas);
});

router.post('/', async (req, res) =>{
   const tarea = new Tarea(req.body);
   await tarea.save();
   console.log(tarea);
   res.json(
       {
          status: 'Tarea Creada'
       });
});

router.put('/:id', async (req, res) =>{
   await Tarea.findByIdAndUpdate(req.params.id, req.body);
   res.json({
       status: 'Tarea Modificada'
   });
});

router.delete('/:id', async(req, res) => {
   await Tarea.findByIdAndRemove(req.params.id);
   res.json({
       status: 'Tarea Eliminada'
   });
});

router.get('/:id', async(req, res) =>{
    const tarea = await Tarea.findById(req.params.id);
    res.json(tarea);
});



module.exports = router;