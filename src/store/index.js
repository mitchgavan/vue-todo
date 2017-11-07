import Vue from 'vue';
import Vuex from 'vuex';
import filters from '../utils/filters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    beforeEditCache: '',
    editedTodo: null,
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
    editTodo(state, payload) {
      state.beforeEditCache = payload.todo.title;
      state.editedTodo = payload.todo;
    },
    cancelEdit(state, payload) {
      state.todos[payload.index].title = state.beforeEditCache;
      state.editedTodo = null;
    },
    updateTodo(state, payload) {
      if (!state.editedTodo) {
        return;
      }
      let newTitle = state.todos[payload.index].title;
      newTitle = newTitle.trim();
      state.editedTodo = null;
      if (!newTitle) {
        state.todos.splice(payload.index, 1);
      }
    },
    pluralize(word, count) {
      return word + (count === 1 ? '' : 's');
    },
    removeTodo(state, payload) {
      state.todos.splice(payload.index, 1);
    },
    toggleAll(state) {
      const completed = filters.active(state.todos).length > 0;
      state.todos = state.todos.map(todo =>
          Object.assign({}, todo, { completed }));
    },
    handleNewTodoChange(state, payload) {
      state.newTodo = payload.newTodo;
    },
    changeVisibility(state, payload) {
      state.visibility = payload.visibility;
    },
  },
});
