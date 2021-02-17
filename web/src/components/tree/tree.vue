<template>
  <div>
    <tree-node :node="tree" @nodeClick="onNodeClick"></tree-node>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TreeNode from '@/components/tree/tree-node.vue';
import { Node } from '@/components/tree/classes/node';

@Options({
  name      : 'i18n-project-form',
  props     : {
    id: String
  },
  components: {
    'tree-node': TreeNode
  },
  emits: [
    'nodeClick'
  ]
})
export default class Tree extends Vue {
  tree = new Node('', [
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
  ]);

  onNodeClick(node: Node) {
    this.$emit('nodeClick', node);
  }
}
</script>

<style scoped lang="scss">

</style>
