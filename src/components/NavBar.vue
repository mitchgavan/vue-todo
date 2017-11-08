<template>
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
      @click="CLEAR_COMPLETED"
    >
      Clear completed
    </button>
  </footer>
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapGetters,
  } from 'vuex';
  import { CLEAR_COMPLETED } from '../store/mutation-types';
  import pluralize from '../mixins/pluralize';

  export default {
    name: 'nav-bar',
    mixins: [pluralize],
    computed: {
      ...mapState([
        'visibility',
      ]),
      ...mapGetters([
        'activeTodosCount',
        'completedTodosCount',
      ]),
    },
    methods: {
      ...mapMutations([
        CLEAR_COMPLETED,
      ]),
    },

  };
</script>
