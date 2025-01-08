import express from "express"
import { DatabasePostgres } from './controllers/todoController.js'

const router = express.Router()

const database = new DatabasePostgres

router.post('/cadastro', async (req, res) => {
    const {titulo, descricao, status} = req.body

    await database.createTodo ({
        titulo: titulo,
        descricao: descricao,
        status: status
    })

    return res.status(201).send({ message: "Todo adiciona a lista com sucesso!"})
})

router.get('/listar', async (req, res) => {
    
    const search = req.query.search


        const todos = await database.getAllTodos()

        return res.status(201).json(todos)
        

})

router.put('/:id', async (req, res) => {
    const todoId = req.params.id

    const {titulo, descricao, status} = req.body
    
    await database.updateTodo(todoId, {
        titulo: titulo,
        descricao: descricao,
        status: status
    })

    return res.status(204).send()
})

router.delete('/:id', async (req, res) => {
    const todoId = req.params.id
    
    await database.deleteTodo(todoId)

    return res.status(204).send({ message: "Video deletado com sucesso!"})
})

export default router