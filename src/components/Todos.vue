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
      <ul class="todo-list">
    		<li
          class="todo"
          :class="{completed: todo.completed}"
          v-for="todo in filteredTodos"
        >
    			<div class="view">
    				<input
              class="toggle"
              type="checkbox"
              v-model="todo.completed"
            >
    				<label>{{todo.title}}</label>
    				<button class="destroy"></button>
    			</div>
    			<input class="edit" type="text">
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
			<button class="clear-completed">
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
      visibility: 'all',
      newTodo: '',
      todos: [],
    };
  },

  beforeRouteUpdate(to, from, next) {
    this.visibility = to.params.filter;
    next();
  },

  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    activeTodosCount() {
      return filters.active(this.todos).length;
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
    pluralize(word, count) {
      return word + (count === 1 ? '' : 's');
    },
  },

};
</script>

<style scoped>

</style>
