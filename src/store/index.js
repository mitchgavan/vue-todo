import Vue from 'vue';
import Vuex from 'vuex';
import filters from '../utils/filters';
import * as types from './mutation-types';

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
    [types.ADD_TODO](state) {
      const value = state.newTodo && state.newTodo.trim();
      if (!value) {
        return;
      }
      state.todos.push({ title: value, completed: false });
      state.newTodo = '';
    },
    [types.CHANGE_VISIBILITY](state, { visibility }) {
      state.visibility = visibility;
    },
    [types.CLEAR_COMPLETED](state) {
      state.todos = filters.active(state.todos);
    },
    [types.EDIT_TODO](state, { todo, value }) {
      todo.title = value;
    },
    [types.HANDLE_NEW_TODO_CHANGE](state, { newTodo }) {
      state.newTodo = newTodo;
    },
    [types.REMOVE_TODO](state, { index }) {
      state.todos.splice(index, 1);
    },
    [types.TOGGLE_ALL](state) {
      const completed = filters.active(state.todos).length > 0;
      state.todos = state.todos.map(todo =>
          Object.assign({}, todo, { completed }));
    },
  },
});
