<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{$store.state.count}}</div>
    <button @click="$store.state.count = $store.state.count + 1">Кнопка</button>
  </div>
</template>


<script>
export default {
  name: 'AboutView',
}
</script>