<template>
  <!-- Barre de navigation et affichage via router -->
  <div class="home">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <a class="navbar-item logoSide">
        <img
          src="@/../public/images/icon-left-font-monochrome-black.svg"
          width="300"
          height="200"
          alt="Logo Groupomania"
        />
      </a>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" role="menuitem"> Accueil </a>

          <a class="navbar-item" role="menuitem"> Trombinoscope </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" role="menuitem"> Plus </a>

            <div class="navbar-dropdown">
              <a class="navbar-item" role="menuitem">
                Pourquoi un réseau social d'entreprise ?
              </a>
              <a class="navbar-item" role="menuitem">
                Suggérer une fonctionnalité</a
              >
              <hr class="navbar-divider" />
              <a class="navbar-item" role="menuitem" @click="deleteAccount()"
                >Supprimer mon compte</a
              >
              <a class="navbar-item" @click="disconnect()" role="menuitem">
                Déconnexion
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-end profileSide">
        <div class="navbar-item">
          <p class="profileText">
            <strong>{{ profile.firstname }} {{ profile.lastname }}</strong>
          </p>
        </div>
        <img
          class="profilePicture"
          :src="profile.profilepicture"
          alt="Miniature photo de profil utilisateur"
        />
      </div>
      <div class="dropdown is-hoverable">
        <div class="dropdown-trigger">
          <button
            class="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu4"
          >
            <span>{{ profile.firstname }} {{ profile.lastname }}</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="container-mob">
          <div class="dropdown-flex">
            <div class="dropdown-menu" id="dropdown-menu4" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <a class="navbar-item" role="menuitem"> Accueil </a>
                </div>
                <div class="dropdown-item">
                  <a class="navbar-item" role="menuitem"> Trombinoscope </a>
                </div>
                <div class="dropdown-item">
                  <a class="navbar-item" role="menuitem">
                    Pourquoi un réseau social d'entreprise ?
                  </a>
                </div>
                <div class="dropdown-item">
                  <a class="navbar-item" role="menuitem">
                    Suggérer une fonctionnalité</a
                  >
                </div>
                <hr class="navbar-divider" />
                <div class="dropdown-item">
                  <a
                    class="navbar-item"
                    @click="deleteAccount()"
                    role="menuitem"
                    >Supprimer mon compte</a
                  >
                </div>
                <div class="dropdown-item">
                  <a class="navbar-item" @click="disconnect()" role="menuitem">
                    Déconnexion
                  </a>
                </div>
              </div>
            </div>
          </div>
          <img
            class="profilePictureMob"
            :src="profile.profilepicture"
            alt="Utilisateur connecté"
          />
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      profile: {
        lastname: "",
        firstname: "",
        profilepicture: "",
      },
    };
  },
  mounted() {
    // Récupération des données de l'utilisateur authentifié
    if (localStorage.getItem("token")) {
      axios
        .get("http://localhost:8888/api/auth/profile", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((user) => {
          let parsedData = JSON.parse(JSON.stringify(user.data));
          this.profile.firstname = parsedData.user.firstname;
          this.profile.lastname = parsedData.user.lastname;
          this.profile.profilepicture = parsedData.user.media;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    // Déconnexion de la plateforme et renvoi vers page de connexion
    disconnect() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    // Deconnexion et suppression du compte authentifié
    deleteAccount() {
      let confirm = window.confirm(
        "Voulez-vous vraiment supprimer votre compte ?"
      );
      if (confirm) {
        axios
          .delete("http://localhost:8888/api/auth/delete", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .catch((error) => {
            console.log(error);
          });
        alert("Compte supprimé.");
        this.disconnect();
      } else {
        alert("Annulation du processus de suppression.");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0.9375rem;
  box-shadow: 0rem 0rem 0.125rem grey;
}
.dropdown-flex,
.dropdown {
  display: none;
}
.profilePicture {
  max-width: auto;
  max-height: 2.5rem;
}
.profilePictureMob {
  display: none;
}
@media only screen and (max-width: 1024px) {
  .home {
    margin: auto;
    .navbar {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0.2rem;
      .logoSide {
        width: 30%;
        text-align: left;
        img {
          margin-top: 0.8rem;
          max-width: 10rem;
          max-height: 10rem;
        }
      }
      .profileText {
        display: none;
      }
      .dropdown {
        display: flex;
        .dropdown-trigger {
          margin-top: 0.8rem;
        }
      }
      .dropdown-flex {
        margin-top: 0.8rem;
        display: flex;
      }
    }
  }
  .container-mob {
    display: flex;
  }
  .profilePictureMob {
    display: inline-block;
    margin-top: 1rem;
    margin-left: 0.8rem;
    margin-right: 1rem;
    max-height: 2rem;
    max-width: auto;
    justify-self: end;
  }
  .profilePicture {
    display: none;
  }
  .profileSide {
    display: none;
  }
}
@media only screen and (max-width: (540px)) {
  .logoSide {
    padding-right: 10.5rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    img {
      margin-left: 0.1rem;
      margin-top: 0.8rem;
    }
  }
  .navbar {
    display: block;
    padding: 0.9rem;
    justify-content: center;
  }
  .dropdown {
    margin-left: auto;
    margin-right: auto;
    align-content: center;
    width: 60%;
    padding-bottom: 0.625rem;
  }
}
</style>
