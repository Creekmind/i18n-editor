<template>
  <div>
    <router-view />
  </div>
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

</style>
