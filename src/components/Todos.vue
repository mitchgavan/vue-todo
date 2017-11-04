<template>
  <section class="todoapp">

    <header class="header">
			<h1>todos</h1>
			<input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="addTodo"
      >
		</header>

    <section class="main">
      <input
        type="checkbox"
        class="toggle-all"
        v-model="allComplete"
      >
      <ul class="todo-list">
    		<li
          class="todo"
          :class="{completed: todo.completed, editing: editedTodo == todo}"
          v-for="(todo, index) in filteredTodos"
        >
    			<div class="view">
    				<input
              class="toggle"
              type="checkbox"
              v-model="todo.completed"
            >
    				<label @dblclick="editTodo(todo)">{{todo.title}}</label>
    				<button
              class="destroy"
              @click="removeTodo(index)"
            ></button>
    			</div>
    			<input
            class="edit"
            type="text"
            v-model="todo.title"
            @blur="updateTodo(index)"
            @keyup.esc="cancelEdit(index)"
            @keyup.enter="updateTodo(index)"
          >
    		</li>
    	</ul>
    </section>

    <footer class="footer">
			<span class="todo-count">
				{{activeTodosCount}} {{pluralize('item', activeTodosCount)}} left
			</span>
			<ul class="filters">
				<li>
          <router-link
            to="/all"
            :class="{selected: visibility == 'all'}"
          >
            All
          </router-link>
        </li>
				<li>
          <router-link
            to="/active"
            :class="{selected: visibility == 'active'}"
          >
            Active
          </router-link>
        </li>
				<li>
          <router-link
            to="/completed"
            :class="{selected: visibility == 'completed'}"
          >
            Completed
          </router-link>
        </li>
			</ul>
			<button
        class="clear-completed"
        v-show="completedTodosCount > 0"
        @click="clearCompleted"
      >
				Clear completed
			</button>
		</footer>

  </section>
</template>

<script>
import filters from '../utils/filters';

export default {
  name: 'Todos',

  data() {
    return {
      beforeEditCache: '',
      editedTodo: null,
      newTodo: '',
      todos: [],
      visibility: 'all',
    };
  },

  beforeRouteUpdate(to, from, next) {
    this.visibility = to.params.filter;
    next();
  },

  computed: {
    activeTodosCount() {
      return filters.active(this.todos).length;
    },
    allComplete: {
      get() {
        return this.activeTodosCount === 0;
      },
      set(value) {
        this.todos = this.todos.map(todo =>
          Object.assign({}, todo, { completed: value }));
      },
    },
    completedTodosCount() {
      return filters.completed(this.todos).length;
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
  },

  methods: {
    addTodo() {
      const value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({ title: value, completed: false });
      this.newTodo = '';
    },
    clearCompleted() {
      this.todos = filters.active(this.todos);
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },
    cancelEdit(index) {
      this.todos[index].title = this.beforeEditCache;
      this.editedTodo = null;
    },
    updateTodo(index) {
      if (!this.editedTodo) {
        return;
      }
      let newTitle = this.todos[index].title;
      newTitle = newTitle.trim();
      this.editedTodo = null;

      if (!newTitle) {
        this.removeTodo(index);
      }
    },
    pluralize(word, count) {
      return word + (count === 1 ? '' : 's');
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleAll() {
      const completed = filters.active(this.todos).length > 0;
      this.todos = this.todos.map(todo =>
          Object.assign({}, todo, { completed }));
    },
  },

  directives: {
    'todo-focus': {
      // todo
    },
  },

};
</script>

<style scoped>

</style>
