<template>
  <div class="home">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img
            src="@/../public/images/icon-left-font-monochrome-black.svg"
            width="300"
            height="200"
            alt="Logo"
          />
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item"> Accueil </a>

          <a class="navbar-item"> Trombinoscope </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> Plus </a>

            <div class="navbar-dropdown">
              <a class="navbar-item"> Les associations </a>
              <a class="navbar-item"> Nos partenaires </a>
              <a class="navbar-item"> Pourquoi un réseau social d'entreprise ? </a>
              <hr class="navbar-divider" />
              <a class="navbar-item"> Suggérer une nouvelle fonctionnalité </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss" scoped>

.navbar{
    padding: 15px;
    box-shadow: 0px 0px 2px grey;
}
</style>
