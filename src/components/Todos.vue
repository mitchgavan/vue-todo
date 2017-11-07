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
        @input="handleNewTodoChange"
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
import {
  mapMutations,
  mapState,
  mapGetters,
} from 'vuex';
import Todo from './Todo';

export default {
  name: 'Todos',
  components: { Todo },

  beforeRouteUpdate(to, from, next) {
    this.$store.commit(
      'changeVisibility',
      { visibility: to.params.filter },
    );
    next();
  },

  computed: {
    ...mapState([
      'newTodo',
      'todos',
      'visibility',
    ]),
    ...mapGetters([
      'activeTodosCount',
      'completedTodosCount',
      'filteredTodos',
      'allComplete',
    ]),
  },

  methods: {
    handleNewTodoChange(e) {
      this.$store.commit(
        'handleNewTodoChange',
        { newTodo: e.target.value },
      );
    },
    ...mapMutations([
      'addTodo',
      'clearCompleted',
      'pluralize',
      'changeVisibility',
      'toggleAll',
    ]),
  },

};
</script>

<style scoped>

</style>
