<template >
  <nav>
    <router-link to="/home">На главную</router-link> |
    <router-link to="/desktop">Рабочий стол</router-link> |
    <router-link to="/auth">Авторизация</router-link>
  </nav>
  <router-view />
</template>

<script>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #2960b3;
}
</style>
