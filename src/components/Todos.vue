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
          v-for="todo in todos"
        >
    			<div class="view">
    				<input class="toggle" type="checkbox">
    				<label>{{todo}}</label>
    				<button class="destroy"></button>
    			</div>
    			<input class="edit" type="text">
    		</li>
    	</ul>
    </section>

    <footer class="footer">
			<span class="todo-count">
				<strong></strong>1 item left
			</span>
			<ul class="filters">
				<li><a href="#/all">All</a></li>
				<li><a href="#/active">Active</a></li>
				<li><a href="#/completed">Completed</a></li>
			</ul>
			<button class="clear-completed">
				Clear completed
			</button>
		</footer>

  </section>
</template>

<script>
export default {
  name: 'Todos',
  data() {
    return {
      isActive: false,
      newTodo: '',
      todos: [],
    };
  },
  methods: {
    addTodo() {
      this.todos.push(this.newTodo);
      this.newTodo = '';
    },
  },
};
</script>

<style scoped>

</style>
