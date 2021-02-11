<template>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ProjectList from '@/components/ProjectList.vue';

@Options({
  components: {
    'i18n-project-list': ProjectList
  }
})
export default class Application extends Vue {

}

</script>

<style lang="scss">

@import '~@cds/city/css/bundles/default.min.css'; // load base font
@import 'scss/theme.scss';

body, html, #app {
  height: 100%;
  margin: 0;
}

body {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

#app {
  overflow: auto;
}

</style>
