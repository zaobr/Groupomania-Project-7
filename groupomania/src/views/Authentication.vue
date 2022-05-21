<template>
  <div class="authentification">
    <section class="section">
      <img
        src="@/../public/images/icon-left-font-monochrome-black.svg"
        alt="Logo"
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
  width: 250px;
  height: 80px;
}
</style>
