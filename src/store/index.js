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
    changeVisibility(state, { visibility }) {
      state.visibility = visibility;
    },
    clearCompleted(state) {
      state.todos = filters.active(state.todos);
    },
    editTodo(state, { todo, value }) {
      todo.title = value;
    },
    handleNewTodoChange(state, { newTodo }) {
      state.newTodo = newTodo;
    },
    removeTodo(state, { index }) {
      state.todos.splice(index, 1);
    },
    toggleAll(state) {
      const completed = filters.active(state.todos).length > 0;
      state.todos = state.todos.map(todo =>
          Object.assign({}, todo, { completed }));
    },
  },
});
