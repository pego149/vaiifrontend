<template>
    <div class="log">
    </div>
</template>

<script>
  export default {
    name: "Logout",
    created() {
      this.$store.dispatch('logoutUser')
      this.$router.push({name: 'home'})
    }
  }
</script>

<style scoped>

</style>
