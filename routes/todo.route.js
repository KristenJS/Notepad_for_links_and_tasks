import { Router } from 'express';
import Todo from "../models/Todo.js";
import { auth } from "../middleware/auth.middleware.js";

const router4 = new Router();

router4.post('/add', auth, async(req, res) => { //??
  try {
    const {text, userId} = req.body
    const todo = await new Todo({
      owner: userId,
      text,
      completed: false,
      important: false
    })
    
    await todo.save()
    res.json(todo)
  } catch(e) {
    res.status(500).json({ message: 'Smth went wrong' })
  }
});

router4.get('/', auth, async(req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user.userId}) 
    res.json(todos)
  } catch(e) {
    res.status(500).json({ message: 'Smth went wrong' })
  }
});

router4.delete('/delete/:id', auth, async(req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id}) 
    res.json(todo)
  } catch(e) {
    res.status(500).json({ message: 'Smth went wrong' })
  }
});

router4.put('/completed/:id', auth, async(req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id}) 
    todo.completed = !todo.completed
    await todo.save()
    res.json(todo)
  } catch(e) {
    res.status(500).json({ message: 'Smth went wrong' })
  }
});

router4.put('/important/:id', auth, async(req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id}) 
    todo.important = !todo.important
    await todo.save()
    res.json(todo)
  } catch(e) {
    res.status(500).json({ message: 'Smth went wrong' })
  }
});

export default router4;