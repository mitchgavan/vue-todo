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
        @click="removeTodo({ index })"
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
        'editTodo',
        'removeTodo',
      ]),
      updateTodo(e) {
        const value = e.target.value.trim();
        if (!value) {
          this.removeTodo(this.index);
        }
        this.editTodo({ todo: this.todo, value });
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
