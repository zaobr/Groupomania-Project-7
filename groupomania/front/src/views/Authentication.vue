<template>
  <!-- Base structurelle de la partie authentification via router -->
  <div class="authentification">
    <section class="section">
      <img
        src="@/../public/images/icon-left-font-monochrome-black.svg"
        alt="Groupomania Logo"
        class="logo"
      />
    </section>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Authentication",
  components: {},
};
</script>

<style lang="scss" scoped>
.logo {
  width: 15.625rem;
  height: 5rem;
  margin: auto;
}
.section {
  width: 31rem;
  padding-bottom: 1.25rem;
  margin: auto;
}
</style>
