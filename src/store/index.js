import Vue from 'vue';
import Vuex from 'vuex';
import filters from '../utils/filters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newTodo: '',
    todos: [],
    visibility: 'all',
  },

  getters: {
    activeTodosCount: state => filters.active(state.todos).length,
    completedTodosCount: state => filters.completed(state.todos).length,
    filteredTodos: state => filters[state.visibility](state.todos),
    allComplete: (state, getters) => getters.activeTodosCount === 0,
  },

  mutations: {
    addTodo(state) {
      const value = state.newTodo && state.newTodo.trim();
      if (!value) {
        return;
      }
      state.todos.push({ title: value, completed: false });
      state.newTodo = '';
    },
    clearCompleted(state) {
      state.todos = filters.active(state.todos);
    },
    editTodo(state, todo) {
      state.beforeEditCache = todo.title;
      state.editedTodo = todo;
    },
    cancelEdit(state, index) {
      state.todos[index].title = state.beforeEditCache;
      state.editedTodo = null;
    },
    updateTodo(state, index) {
      if (!state.editedTodo) {
        return;
      }
      let newTitle = state.todos[index].title;
      newTitle = newTitle.trim();
      this.editedTodo = null;
      if (!newTitle) {
        state.removeTodo(index);
      }
    },
    pluralize(word, count) {
      return word + (count === 1 ? '' : 's');
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1);
    },
    toggleAll(state) {
      const completed = filters.active(state.todos).length > 0;
      state.todos = state.todos.map(todo =>
          Object.assign({}, todo, { completed }));
    },
    handleNewTodoChange(state, message) {
      state.newTodo = message;
    },
  },
});
