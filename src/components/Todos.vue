<template>
  <section class="todoapp">

    <header class="header">
			<h1>todos</h1>
			<input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        :value="newTodo"
        @input="onNewTodoChange"
        @keyup.enter="addTodo"
      >
		</header>

    <section class="main">
      <input
        type="checkbox"
        class="toggle-all"
        :checked="allComplete"
        @change="toggleAll"
      >
      <ul class="todo-list">
    		<todo
          v-for="(todo, index) in filteredTodos"
          :todo="todo"
          :index="index"
          :key="todo.title + index"
        ></todo>
    	</ul>
    </section>

    <nav-bar></nav-bar>

  </section>
</template>

<script>
import {
  mapMutations,
  mapState,
  mapGetters,
} from 'vuex';
import Todo from './Todo';
import NavBar from './NavBar';

export default {
  name: 'Todos',
  components: { 'nav-bar': NavBar, Todo },
  beforeRouteUpdate(to, from, next) {
    this.changeVisibility({ visibility: to.params.filter });
    next();
  },
  computed: {
    ...mapState([
      'newTodo',
      'todos',
    ]),
    ...mapGetters([
      'filteredTodos',
      'allComplete',
    ]),
  },

  methods: {
    onNewTodoChange(e) {
      this.handleNewTodoChange({ newTodo: e.target.value });
    },
    ...mapMutations([
      'addTodo',
      'changeVisibility',
      'handleNewTodoChange',
      'toggleAll',
    ]),
  },

};
</script>
