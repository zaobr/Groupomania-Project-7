<template>
  <div class="signup">
    <h1>
      Bienvenue, sur la plateforme dédiée aux collaborateurs de Groupomania.
    </h1>
    <form>
      <div class="field">
        <label class="label" for="lastname">Nom</label>
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="lastname"
            placeholder="Nom"
            v-model="user.lastname"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-person"></i>
          </span>
          <span v-if="user.lastname.length > 2" class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label" for="firstname">Prénom</label>
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="firstname"
            placeholder="Prénom"
            v-model="user.firstname"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-person"></i>
          </span>
          <span v-if="user.firstname.length > 2" class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label" for="email">E-mail</label>
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="email"
            placeholder="E-mail"
            v-model="user.email"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span v-if="emailReg.test(user.email)" class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label" for="password">Mot de passe</label>
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="password"
            placeholder="Password"
            v-model="user.password"
          required/>
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
          <span v-if="user.password.length > 7" class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <section class="container">
        <button
          class="button is-dark"
          type="submit"
          @click.prevent="signUser()"
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
      },
      emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line

    };
  }
  ,
  computed: {},
  methods: {
    signUser() {

        axios
        .post("http://localhost:8888/api/auth/signup", this.user)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
        // this.$router.push("/login");
      
    },
    // isEmailValid(){
    //   const emailReg =
    //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

    //   if (emailReg.test(this.user.email)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.signup {
  h1 {
    font-weight: 600;
  }
  button {
    margin-bottom: 10px;
  }
  label {
    text-align: left;
  }
  div {
    width: 35%;
    margin: 20px auto 20px auto;
  }
  .fa-check {
    color: green;
  }
}
</style>
