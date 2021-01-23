<template>
  <div v-bind:title="title" @click="onClick">{{ header }}</div>

  <h2>Tasks</h2>

  <div v-for="task in tasks" :key="task">
    <div @click="onTaskClick($event, task)">{{ task }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {}
})
export default class Home extends Vue {
  header = "i18editor"
  title = "helper"
  tasks = [
    'js #1',
    'js #2',
    'typescript',
    'scss',
    'angular #1',
    'angular #2'
  ]

  created() {
    console.log('created');
  }

  mounted() {
    console.log('mounted');
  }

  beforeDestroy() {
    console.log('beforeDestroy');
  }

  onClick($event: MouseEvent) {
    console.log($event);
  }

  onTaskClick($event: MouseEvent, task: string) {
    console.log($event, task);
  }
}
</script>
