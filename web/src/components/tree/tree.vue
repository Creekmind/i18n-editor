<template>
  <div>
    <tree-node class="tree-root" :node="root" @nodeClick="onNodeClick">
      <template v-for="(_, name) in $slots" v-slot:[name]="slotData" >
        <slot :name="name" v-bind="slotData" />
      </template>
    </tree-node>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Node } from '@/components/tree/classes/node';
import TreeNode from '@/components/tree/tree-node.vue';

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
