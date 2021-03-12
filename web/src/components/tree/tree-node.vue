<template>
  <div class="i18n-tree-node" @mouseover.stop="onMouseOver" @mouseout.stop="onMouseOut" @click.stop="onClick()" v-if="node">
    <div class="hover" v-if="hover"></div>
    <span class="title">{{ node.name }}</span>

    <div :class="{ 'has-children': !!child.children.length }" v-for="child in node.children" :key="child.name">
      <tree-node :node="child" @nodeClick="onClick($event)"></tree-node>
    </div>
  </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Node } from '@/components/tree/classes/node';

@Options({
  name : 'tree-node',
  props: {
    node: Node
  },
  emits: [
    'nodeClick'
  ]
})
export default class ProjectForm extends Vue {
  node!: Node;
  hover = false;

  onMouseOver() {
    this.hover = true;
  }

  onMouseOut() {
    this.hover = false;
  }

  onClick(node = this.node) {
    this.$emit('nodeClick', node)
  }
}
</script>

<style scoped lang="scss">
  @import "src/scss/components/variables";

.i18n-tree-node {
  margin-left: 16px;
  cursor: pointer;
  position: relative;

  &.has-children {
    & > .title {
      color: red;
    }
  }

  .hover {
    pointer-events: none;
    background-color: #cccbcb42;
    position: absolute;
    height: 16px;
    width: 100%;
  }
}
</style>
