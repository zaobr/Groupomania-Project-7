<template>
  <!-- Formulaire d'inscription -->
  <div class="signup">
    <h1>
      Bienvenue, sur la plateforme dédiée aux collaborateurs de Groupomania.
    </h1>
    <form enctype="multipart/form-data" method="post">
      <div class="field">
        <label class="label" for="lastname">Nom</label>
        <p class="control has-icons-left">
          <input
            id="lastname"
            class="input"
            type="lastname"
            placeholder="Nom"
            v-model="user.lastname"
            @keyup="lastnameError = false"
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-person"></i>
          </span>
        </p>
        <span
          v-if="lastnameError"
          class="icon-text has-text-danger error-message"
        >
          <span class="icon">
            <i class="fas fa-xmark"></i>
          </span>
          <span>Veuillez renseigner votre Nom</span>
        </span>
      </div>
      <div class="field">
        <label class="label" for="firstname">Prénom</label>
        <p class="control has-icons-left">
          <input
            class="input"
            id="firstname"
            type="firstname"
            placeholder="Prénom"
            v-model="user.firstname"
            @keyup="firstnameError = false"
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-person"></i>
          </span>
        </p>
        <span
          v-if="firstnameError"
          class="icon-text has-text-danger error-message"
        >
          <span class="icon">
            <i class="fas fa-xmark"></i>
          </span>
          <span>Veuillez renseigner votre Prénom</span>
        </span>
      </div>
      <div class="field">
        <label class="label" for="email">E-mail</label>
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="email"
            id="email"
            placeholder="E-mail"
            v-model="user.email"
            @keyup="emailError = false"
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span v-if="emailReg.test(user.email)" class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
        <span v-if="emailError" class="icon-text has-text-danger error-message">
          <span class="icon">
            <i class="fas fa-xmark"></i>
          </span>
          <span>Adresse email fournie invalide</span>
        </span>
      </div>
      <div class="field">
        <label class="label" for="password">Mot de passe</label>
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="password"
            id="password"
            placeholder="Password"
            v-model="user.password"
            @keyup="passwordError = false"
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
          <span
            v-if="passwordReg.test(user.password)"
            class="icon is-small is-right"
          >
            <i class="fas fa-check"></i>
          </span>
        </p>
        <p class="help">
          Doit contenir entre 8 et 20 caractéres, commencer par une lettre et
          contenir au moins un chiffre.
        </p>
        <span
          v-if="passwordError"
          class="icon-text has-text-danger error-message"
        >
          <span class="icon">
            <i class="fas fa-xmark"></i>
          </span>
          <span>Format du mot de passe incorrect</span>
        </span>
      </div>
      <div class="field">
        <span class="label">Importez une photo de profil</span>
        <div class="file has-name">
          <label class="file-label" for="picture">
            <input
              class="file-input"
              id="picture"
              type="file"
              name="media"
              @change="getMedia($event), (mediaError = null)"
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                <p class="uploadlabel">Importer une image…</p>
              </span>
            </span>
            <span v-if="user.media.name" class="file-name">
              {{ user.media.name }}
            </span>
          </label>
        </div>
        <p class="help">Format accepté: JPG/JPEG, PNG.</p>
        <span v-if="mediaError" class="icon-text has-text-danger error-message">
          <span class="icon">
            <i class="fas fa-xmark"></i>
          </span>
          <span>Format de l'image invalide ou aucune image importée</span>
        </span>
      </div>
      <section class="container">
        <button
          class="button is-dark"
          type="submit"
          @click.prevent="checkInput(user), signUser()"
        >
          Inscription
        </button>
      </section>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  components: {},
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        media: "",
      },
      emailReg:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
      passwordReg: /^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/,
      passwordError: false,
      emailError: false,
      firstnameError: false,
      lastnameError: false,
      mediaError: false,
    };
  },
  computed: {},
  methods: {
    // Véririfation des entrées avant envoi du formulaire
    checkInput(str) {
      !str.firstname
        ? (this.firstnameError = true)
        : (this.firstnameError = false);
      !str.lastname
        ? (this.lastnameError = true)
        : (this.lastnameError = false);
      !str.media ? (this.mediaError = true) : (this.mediaError = false);
    },
    // Recupération du fichier uploadé
    getMedia(event) {
      this.user.media = event.target.files[0];
      console.log(this.user.media);
    },
    // Envoi des données d'inscription utilisateur vers API
    signUser() {
      if (
        this.passwordReg.test(this.user.password) &&
        this.emailReg.test(this.user.email)
      ) {
        this.passwordError = false;
        this.emailError = false;

        let userForm = new FormData();
        userForm.append("image", this.user.media);
        userForm.append("firstname", this.user.firstname);
        userForm.append("lastname", this.user.lastname);
        userForm.append("email", this.user.email);
        userForm.append("password", this.user.password);

        axios
          .post("http://localhost:8888/api/auth/signup/", userForm, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((user) => {
            console.log(user.data);
            this.$router.push("/login");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        if (!this.emailReg.test(this.user.email)) {
          this.emailError = true;
        }
        if (!this.passwordReg.test(this.user.password)) {
          this.passwordError = true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.signup {
  width: 31rem;
  padding-left: 0.9375rem;
  padding-right: 0.625rem;
  margin: auto;
  h1 {
    font-weight: 600;
  }
  button {
    margin-bottom: 0.625rem;
  }
  label {
    text-align: left;
  }
  .field {
    width: 100%;
    line-height: 0.875rem;
    margin: 1.25rem auto 1.875rem auto;
    text-align: left;
    position: relative;
    input::placeholder {
      font-size: 0.8125rem;
    }
  }
  .fa-check {
    color: green;
  }
  .help {
    text-align: left;
  }
  .error-message {
    font-size: 0.8125rem;
    position: absolute;
    left: 0;
  }
}
</style>
