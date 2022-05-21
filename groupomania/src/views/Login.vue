<template>
  <div class="login">
    <h1>Ravi de vous revoir, collaborateur.</h1>
    <form class="login-form">
      <div class="field">
      <label class="label" for="email">E-mail</label>
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="E-mail" v-model="user.email"/>
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div class="field">
      <label class="label" for="password">Mot de passe</label>
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Mot de passe" v-model="user.password"/>
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <section class="container">
        <button class="button is-dark" @click.prevent="loginUser()">Connexion</button>
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
            password: ""
          },
          emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line

      }
  },
  methods: {
      loginUser() {
      axios
        .post("http://localhost:8888/api/auth/login", this.user)
        .then((response) => {
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            if(!response.data.token){
              return console.log("Utilisateur non authentifié.")
            }
            else{
              this.$router.push("/home");
            }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  h1 {
    font-weight: 600;
  }
  label{
    text-align: left;
  }
  button {
    margin-bottom: 10px;
  }
  a {
    color: black;
    text-decoration: underline;
    &:visited {
      color: black;
    }
  }
  div {
    width: 35%;
    margin: 20px auto 20px auto;
  }
}
</style>
