<template>
  <div id="app">
    <div class="container">
      <vredactor/>
    </div>
  </div>
</template>

<script>
import vredactor from './components/v-redactor'
export default {
  name: 'App',
  components: {
    vredactor
  }
}
</script>

<style>
  body{
    background-color: rgb(30,30,30);
  }
  .container{
  padding:5% 0 0 0;
  }
  @media (max-width: 575px) {
    .container{
      padding: 5% 0 0 0 !important;
    }
    .tool-bar{
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
</style>
