<template>
  <!-- Page par défaut lors d'erreur de saisie ou chemin introuvable -->
  <div>
    <a class="navbar-item">
      <img
        src="@/../public/images/icon-left-font-monochrome-black.svg"
        width="300"
        height="100"
        alt="Logo"
      />
    </a>
    <span>
      404 | Not Found
      <br />
      Cette page n'existe pas.
    </span>
    <br />
    <br />
    <a @click="toLogin">Revenir à l'écran de connexion</a>
  </div>
</template>

<script>
export default {
  name: "404",
  components: {},
  methods: {
    // Renvoi vers la page de connexion
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  font-weight: bold;
}
</style>
