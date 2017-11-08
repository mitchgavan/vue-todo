<template>
  <li
    class="todo"
    :class="{completed: todo.completed, editing: this.editing}"
  >
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        v-model="todo.completed"
      >
      <label @dblclick="editing = true">{{todo.title}}</label>
      <button
        class="destroy"
        @click="REMOVE_TODO({ index })"
      ></button>
    </div>
    <input
      class="edit"
      type="text"
      v-show="editing"
      v-focus="editing"
      :value="todo.title"
      @blur="updateTodo"
      @keyup.esc="cancelEdit"
      @keyup.enter="updateTodo"
    >
  </li>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { EDIT_TODO, REMOVE_TODO } from '../store/mutation-types';

  export default {
    name: 'Todo',
    props: ['todo', 'index'],
    data() {
      return {
        editing: false,
      };
    },
    methods: {
      ...mapMutations([
        EDIT_TODO,
        REMOVE_TODO,
      ]),
      updateTodo(e) {
        const value = e.target.value.trim();
        if (!value) {
          this[REMOVE_TODO]({ index: this.index });
          return;
        }
        this[EDIT_TODO]({ todo: this.todo, value });
        this.editing = false;
      },
      cancelEdit(e) {
        e.target.value = this.todo.title;
        this.editing = false;
      },
    },
    directives: {
      focus(el, { value }, { context }) {
        if (value) {
          context.$nextTick(() => {
            el.focus();
          });
        }
      },
    },
  };
</script>
