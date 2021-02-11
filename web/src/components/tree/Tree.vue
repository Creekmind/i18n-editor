<template>
  <div>
    <div v-for="node in children" v-bind:key="node.name">
      {{ node.name }}

      <tree-node :node="node">

      </tree-node>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TreeNode from '@/components/tree/TreeNode.vue';
import { Node } from '@/components/tree/classes/node';

@Options({
  name      : 'i18n-project-form',
  props     : {
    id: String
  },
  components: {
    'tree-node': TreeNode
  }
})
export default class Tree extends Vue {
  children = [
    new Node('1', [
      new Node('1.1', [
        new Node('1.1.1'),
        new Node('1.1.2'),
        new Node('1.1.3'),
        new Node('1.1.4')

      ]),
      new Node('1.2', [
        new Node('1.2.1'),
        new Node('1.2.2'),
        new Node('1.2.3')
      ]),
      new Node('1.3')
    ]),
    new Node('2'),
    new Node('3')
  ];
}
</script>

<style scoped lang="scss">

</style>
