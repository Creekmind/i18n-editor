<template>
  <div class="i18n-tree-node" :class="{ 'has-children': hasChildren(), 'active': node.active }"
       @mouseover.stop="onMouseOver" @mouseout.stop="onMouseOut" @click.stop="onClick()" v-if="node">
    <div class="hover" :style="{ width: treeWidth + 'px' }" v-if="hover"></div>
    <span class="title">
      <slot :node="node" :data="node.data">
        {{ node.name }}
      </slot>
    </span>

    <div class="i18n-tree-node-child" v-for="child in node.children" :key="child.name">
      <tree-node :node="child" :treeWidth="treeWidth" @nodeClick="onClick($event)">
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </tree-node>
    </div>
  </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Node } from '@/components/tree/classes/node';

@Options({
  name : 'tree-node',
  props: {
    node     : Node,
    treeWidth: Number
  },
  emits: [
    'nodeClick'
  ]
})
export default class TreeNode extends Vue {
  node!: Node;
  hover = false;
  treeWidth = 0;

  onMouseOver() {
    if (this.hasChildren()) {
      return;
    }
    this.hover = true;
  }

  onMouseOut() {
    this.hover = false;
  }

  onClick(node = this.node) {
    if (this.hasChildren(node)) {
      return;
    }
    this.$emit('nodeClick', node);
  }

  private hasChildren(node = this.node): boolean {
    return !!node.children.length;
  }
}
</script>

<style scoped lang="scss">
@import "src/scss/components/variables";

.i18n-tree-node {
  font-size: 14px;
  cursor: pointer;
  padding-left: 16px;

  &.has-children {
    cursor: default;
  }

  &:not(.has-children) {
    padding: 4px 0px 4px 16px;
  }

  &.tree-root {
    padding-left: 0px;
    position: relative;

    & > .title {
      display: none;
      padding: 4px;
    }

    & > .i18n-tree-node-child > .i18n-tree-node {
      padding-left: 0px;

      .title {

      }
    }
  }

  &.active {
    & > .title {
      font-weight: bold;
    }
  }

  .hover {
    pointer-events: none;
    background-color: #cccbcb42;
    position: absolute;
    height: 16px;
    left: 0;
  }
}
</style>
