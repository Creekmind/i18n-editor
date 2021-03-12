<template>
  <div>
    <tree-node :node="root" @nodeClick="onNodeClick"></tree-node>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TreeNode from '@/components/tree/tree-node.vue';
import { Node } from '@/components/tree/classes/node';

@Options({
  name      : 'i18n-project-form',
  props     : {
    id: String,
    root: Node
  },
  components: {
    'tree-node': TreeNode
  },
  emits: [
    'nodeClick'
  ]
})
export default class Tree extends Vue {
  root = null;

  onNodeClick(node: Node) {
    this.$emit('nodeClick', node);
  }
}
</script>

<style scoped lang="scss">

</style>
