<template>

  <h3 class="titulo">Criar Todos</h3>
  <!-- Formulário para adicionar uma tarefa -->
  <q-card>
      <q-card-section>
          <q-input
              v-model="titulo"
              label="Título da Tarefa"
              filled
          >
          </q-input>
          <q-input
              v-model="descricao"
              label="Descrição da Tarefa"
              type="textarea"
              filled
          >
          </q-input>
          <q-select
              v-model="status"
              :options="statusOp"
              label="Status"
              filled
          >
          </q-select>
          <q-btn @click="submitData"
              label="Adicionar Tarefa"
          />                
      </q-card-section>
  </q-card>

  <!-- Lista de tarefas -->
   <q-list bordered class="rounded">
      <q-item v-for="todo in data" :key="todo.id" class="item">
          <q-item-section>
              <div v-if="todo.isEditing">
                  <q-input
                      v-model="todo.titulo"
                      label="Editar Título"
                      filled
                      class="q-mb-sm"
                  />
                  <q-input
                      v-model="todo.descricao"
                      label="Editar Descrição"
                      type="textarea"
                      filled
                      class="q-mb-sm"
                  />
                  <q-select
                      v-model="todo.status"
                      :options="statusOp"
                      label="Editar Status"
                      filled
                      class="q-mb-sm"
                  />

                  <q-btn @click="handleClick(todo, todo.id)"
                      label="Salvar" color="green"/>
              </div>

              <!-- Exibição -->
              <div v-else>

                  <h6>{{ todo.titulo }}</h6>
                  <p>{{ todo.descricao }}</p>
                  <span>{{ todo.data_criacao }}</span>
                  <q-badge
                      :color="getStatusColor(todo.status)"
                      class="q-mb-sm"
                  >
                      {{ todo.status }}
                  </q-badge> 
               
              </div>
          </q-item-section>

          <q-item-section side>
            <q-btn
              icon="edit"
              flat
              color="blue"
              @click="editTodo(todo)"
              v-if="!todo.isEditing"
            />
            <q-btn
              icon="delete"
              flat
              color="red"
              @click="deleteTodo(todo.id)"
            />
          </q-item-section>
      </q-item>
   </q-list>

</template>

<script>
import axios from 'axios';

export default{
  data(){
      return {
          data: null,
          err: null,
          titulo: '',
          descricao: '',
          status: '',
          responseMessage: null,
          statusOp: ["pendente", "em andamento", "concluída"],
          formData: {
              titulo: '',
              descricao: '',
              status: ''
          }
          
      }
  },
  methods: {
      async fetchData(){
          try{
              // Fazendo uma requisição GET para o backend
              const response = await axios.get('http://localhost:3000/todos/listar')
              this.data = response.data
          } catch(err) {
              this.err = err.message
          }
      },
      async submitData(){
          try {
              // Fazendo uma requisição POST para o backend
              const response = await axios.post('http://localhost:3000/todos/cadastro', {
                  titulo: this.titulo,
                  descricao: this.descricao,
                  status: this.status
              });

              this.responseMessage = response.data.message; // Mensagem de sucesso ou resposta
          } catch(err){
              console.error('Erro ao enviar dados:', err);
              
          }
      },
      async updateData(id){
          try{
              // Fazendo a requisição PUT para o backend com o ID específico
              const response = await axios.put(`http://localhost:3000/todos/${id}`, {
                  titulo: this.titulo,
                  descricao: this.descricao,
                  status: this.status
              });

              this.responseMessage = response.data.message;                

          } catch(err){
              console.error('Erro ao atualizar os dados:', err);                
          }
      },
      async deleteTodo(id){
          try {
              // Fazendo a requisição DELETE para o backend
              const response = await axios.delete(`http://localhost:3000/todos/${id}`);

              this.responseMessage = response.data.message; // Mensagem de sucesso ou resposta
          } catch(err){
              console.error('Erro ao deletar o registro:', err);
              this.responseMessage = 'Erro ao deletar o registro. Verifique o ID e tente novamente.';
          }
      },
      editTodo (todo) {
          todo.isEditing = true;
      },
      saveEdit (todo) {
          todo.isEditing = false;
      },
      getStatusColor(status) {
          switch (status) {
              case "pendente":
              return "orange";
              case "em andamento":
              return "blue";
              case "concluída":
              return "green";
              default:
              return "grey";
          }
      },
      handleClick(todo, id){
          this.saveEdit(todo)
          this.updateData(id)
      }

  },
  mounted() {
      this.fetchData()
  }
}

</script>

<style>
.titulo{
  padding: 10px 20px;
  font-weight: bold;
}

.item{
  border-radius: 8px;
  margin: 20px 10px;
  max-width: 400px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.item {
  background-color: #FFFAEC;
}

.item h6{
  background-color: #344CB7;
  padding: 10px;
  color: #fff;
  border-radius: 4px;
}

.item p {
  background-color: #F5ECD5;
  border-radius: 4px;
  padding: 10px;
  margin-top: 4px;
  height: 80px;
}

.item span {
  margin-right: 20px;
}

</style>