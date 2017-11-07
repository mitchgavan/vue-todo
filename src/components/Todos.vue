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
    				<label @dblclick="editTodo({ todo: todo })">{{todo.title}}</label>
    				<button
              class="destroy"
              @click="removeTodo(index)"
            ></button>
    			</div>
    			<input
            class="edit"
            type="text"
            v-model="todo.title"
            v-todo-focus="todo == editedTodo"
            @blur="updateTodo({ index: index })"
            @keyup.esc="cancelEdit({ index: index })"
            @keyup.enter="updateTodo({ index: index })"
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
import {
  mapMutations,
  mapState,
  mapGetters,
} from 'vuex';

export default {
  name: 'Todos',

  beforeRouteUpdate(to, from, next) {
    this.$store.commit('changeVisibility', to.params.filter);
    next();
  },

  computed: {
    ...mapState([
      'beforeEditCache',
      'editedTodo',
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
      this.$store.commit('handleNewTodoChange', e.target.value);
    },
    ...mapMutations([
      'addTodo',
      'clearCompleted',
      'editTodo',
      'cancelEdit',
      'updateTodo',
      'pluralize',
      'removeTodo',
      'changeVisibility',
      'toggleAll',
    ]),
  },

  directives: {
    todoFocus(el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },

};
</script>

<style scoped>

</style>
