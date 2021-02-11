<template>
  <div class="i18n-tree-node" :class="{ 'has-children': !!child.children.length }" v-for="child in node.children"
       v-bind:key="child.name">
    <span class="title">{{ child.name }}</span>
    <tree-node :node="child"></tree-node>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Node } from '@/components/tree/classes/node';

@Options({
  name : 'tree-node',
  props: {
    node: Node
  }
})
export default class ProjectForm extends Vue {
  node!: Node;
}
</script>

<style scoped lang="scss">
.i18n-tree-node {
  margin-left: 16px;

  &.has-children {
    & > .title {
      color: red;
    }
  }
}
</style>
