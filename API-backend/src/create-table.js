import { sql } from './db.js'


sql `
    CREATE TABLE Tarefa (
    id text PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP,
    status VARCHAR(50)
);
`
.then(() => {
    console.log('Tabela criada!');
    
})

