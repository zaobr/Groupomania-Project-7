<template>
  <!-- Formulaire de connexion -->
  <div class="login">
    <h1>Ravi de vous revoir, collaborateur.</h1>
    <form class="login-form">
      <div class="field">
        <label class="label" for="email">E-mail</label>
        <p class="control has-icons-left has-icons-right">
          <input
            id="email"
            class="input"
            type="email"
            placeholder="E-mail"
            v-model="user.email"
            @keyup="(emailError = false), (emailMessage = null)"
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
          <span>Veuillez entrer une adresse email valide</span>
        </span>
        <span
          v-if="emailMessage"
          class="icon-text has-text-danger error-message"
        >
          <span class="icon">
            <i class="fas fa-xmark"></i>
          </span>
          <span>{{ emailMessage }}</span>
        </span>
      </div>
      <div class="field">
        <label class="label" for="password">Mot de passe</label>
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            id="password"
            type="password"
            placeholder="Mot de passe"
            v-model="user.password"
            @keyup="(passwordError = false), (passwordMessage = null)"
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
          Contient entre 8 et 20 caractéres, commence par une lettre et contient
          au moins un chiffre.
        </p>
        <span
          v-if="passwordError"
          class="icon-text has-text-danger error-message"
        >
          <span class="icon">
            <i class="fas fa-xmark"></i>
          </span>
          <span>Veuillez entrer un mot de passe valide</span>
        </span>
        <span
          v-if="passwordMessage"
          class="icon-text has-text-danger error-message"
        >
          <span class="icon">
            <i class="fas fa-xmark"></i>
          </span>
          <span>{{ passwordMessage }}</span>
        </span>
      </div>
      <section class="container">
        <button class="button is-dark" @click.prevent="loginUser()">
          Connexion
        </button>
      </section>
    </form>
    <section class="container">
      <a><router-link to="/signup">Inscrivez-vous</router-link></a>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      emailReg:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
      passwordReg: /^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/,
      passwordError: false,
      passwordMessage: "",
      emailError: false,
      emailMessage: "",
    };
  },
  methods: {
    // Fonction d'authentification API
    loginUser() {
      if (
        this.passwordReg.test(this.user.password) &&
        this.emailReg.test(this.user.email)
      ) {
        this.passwordError = false;
        this.emailError = false;
        axios
          .post("http://localhost:8888/api/auth/login", this.user)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            if (!response.data.token) {
              return console.log("Utilisateur non authentifié.");
            } else {
              this.$router.push("/home");
            }
          })
          .catch((error) => {
            if (error.response.status == 409) {
              this.passwordMessage = error.response.data.message;
            }
            if (error.response.status == 404) {
              this.emailMessage = "Utilisateur introuvable";
            }
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
.login {
  width: 31rem;
  padding-left: 0.9375rem;
  padding-right: 0.625rem;
  margin: auto;
  .login-form {
  }
  .icon {
    text-align: right;
  }
  h1 {
    font-weight: 600;
  }
  label {
    text-align: left;
    margin-top: 1.5rem;
    margin-bottom: 0.2rem;
  }
  button {
    margin-top: 1.7rem;
    margin-bottom: 0.625rem;
  }
  a {
    color: black;
    text-decoration: underline;
    &:visited {
      color: black;
    }
  }
  div {
    margin: 1.25rem auto 1.5625rem auto;
  }
  .help {
    text-align: left;
  }
  .field {
    position: relative;
    text-align: center;
    margin: auto;
    input::placeholder {
      font-size: 0.8125rem;
    }
  }
  .error-message {
    font-size: 0.8125rem;
    position: absolute;
    left: 0;
  }
  .control {
    width: 29rem;
    margin: auto;
    text-align: center;
  }
}
</style>
