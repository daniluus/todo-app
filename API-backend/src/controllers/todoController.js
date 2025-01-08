import { randomUUID } from 'node:crypto'
import { sql } from '../db.js'


export class DatabasePostgres {

    async getAllTodos(search){
        let todos
                
        if(search){
            todos = await sql`SELECT * FROM tarefa WHERE titulo like ${'%' + search + '%'}`
        } else {
            todos = await sql`SELECT * FROM tarefa`
        }

        return todos
    }

    async createTodo(todo) {
        const todoId = randomUUID()
        const { titulo, descricao, status} = todo
    
        await sql`INSERT INTO tarefa (id, titulo, descricao, status) VALUES (${todoId}, ${titulo}, ${descricao}, ${status})`
    
    }

    async updateTodo(id, todo){
        const { titulo, descricao, status} = todo

        await sql`UPDATE tarefa SET titulo = ${titulo}, descricao = ${descricao}, status = ${status} WHERE id = ${id};`
    }

    async deleteTodo(id) {
        await sql`DELETE FROM tarefa WHERE id = ${id}`
    }
}


