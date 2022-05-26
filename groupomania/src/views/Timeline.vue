<template>
  <div class="timeline">
    <div class="columns">
      <div class="column is-two-thirds">
        <!-- Titre et bouton d'affichage du formulaire de publication de post -->
        <div class="column base-head">
          <div class="columns head-post">
            <div class="title-col">
              <h1>Fil d'actualité</h1>
            </div>
            <div class="column button-col">
              <button
                @click="showForm ? (showForm = false) : (showForm = true)"
                class="button is-dark publish-btn"
              >
                Poster une publication
              </button>
            </div>
          </div>
        </div>

        <!-- Formulaire de publication -->
        <div v-if="showForm" class="box box-post box-form">
          <form>
            <div class="field is-small">
              <label class="label">Titre</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Titre"
                  v-model="post.title"
                />
              </div>
            </div>
            <label class="label">Contenu du post</label>
            <textarea
              class="textarea is-small"
              placeholder="Contenu du post"
              v-model="post.text"
            ></textarea>
          </form>
          <form enctype="multipart/form-data">
            <label class="label">Importez votre contenu média</label>
            <div class="file has-name">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  name="media"
                  @change="getMedia($event)"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label"> Importer un fichier… </span>
                </span>
                <span v-if="post.media.name" class="file-name">
                  {{ post.media.name }}
                </span>
              </label>
            </div>
            <p class="help">Format accepté: JPG/JPEG, PNG, GIF.</p>
            <button class="button is-dark" @click.prevent="publishPost()">
              Publier
            </button>
          </form>
        </div>

        <!-- Composant d'affichage de post et commentaires liés -->
        <Post v-if="update"></Post>
      </div>

      <!-- Partie evenements de la page -->
      <div class="column">
        <h2>Evénements</h2>
        <div v-for="event in events" :key="event.title" class="box box-event">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img :src="event.media" alt="Image d'évenements" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ event.title }}</strong>
                  <br />
                  <small>Le {{ event.date }}</small>
                  <br />
                  {{ event.text }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Post from "@/components/Post.vue";

export default {
  name: "Timeline",
  data() {
    return {
      post: {
        title: "",
        text: "",
        media: "",
      },
      update: true,
      profilepicture: "",
      events: [
        {
          media: "https://picsum.photos/id/33/64/64",
          date: "21 Novembre 2022",
          title: "Marathon",
          text: "Rassemblement caritatif pour l'association Groupomania.",
        },
        {
          media: "https://picsum.photos/id/76/64/64",
          date: "23 Mai 2022",
          title: "Rencontre entres collaborateurs",
          text: "Une occasion d'apprendre à se connaitre.",
        },
        {
          media: "https://picsum.photos/id/99/64/64",
          date: "18 Septembre 2022",
          title: "Pique-nique",
          text: "Présentez-nous vos talents de cuistot du Dimanche en y participant.",
        },
        {
          media: "https://picsum.photos/id/102/64/64",
          date: "11 Octobre 2022",
          title: "Voyage en Macédoine",
          text: "Expérience à ne pas rater.",
        },
        {
          media: "https://picsum.photos/id/130/64/64",
          date: "8 Octobre 2022",
          title: "Match de la Coupe du Monde",
          text: "Rejoignons-nous dans un bar sportif pour visionner le match.",
        },
      ],
      showForm: false,
      postList: [],
    };
  },
  components: {
    Post,
  },
  computed: {},
  mounted() {
    // Récupération des données de l'utilisateur authentifié
    axios
      .get("http://localhost:8888/api/auth/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((user) => {
        let parsedData = JSON.parse(JSON.stringify(user.data));
        this.profilepicture = parsedData.user.media;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // Recupération du fichier uploadé depuis le formulaire de publication
    getMedia(event) {
      this.post.media = event.target.files[0];
    },
    // Envoi de la nouvelle publication vers l'API et affichage
    publishPost() {
      this.update = false;
      let postForm = new FormData();
      postForm.append("image", this.post.media);
      postForm.append("title", this.post.title);
      postForm.append("text", this.post.text);
      axios
        .post("http://localhost:8888/api/posts/", postForm, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.showForm = false;
          this.post.text = "";
          this.post.title = "";
          this.post.media = "";
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        this.update = true;
      }, 100);
    },
  },
};
</script>

<style lang="scss">
.column {
  .base-head {
    width: 70%;
    margin: auto;
  }
  .head-post {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .title-col {
      margin: 1rem auto auto auto;
      width: 50%;
      h1 {
        padding-top: 0.3125rem;
        margin: 0rem;
        text-align: left;
        font-weight: bold;
        font-size: 1.25rem;
      }
    }
    .button-col {
      width: 50%;
      margin-top: 0.4rem;
      text-align: center;
      button {
        font-size: 0.9375rem;
      }
    }
  }
  h2 {
    text-align: left;
    margin: 1.25rem 0rem 0.625rem 0.625rem;
    font-weight: bold;
  }
}
.content {
  text-align: left;
  h3 {
    text-align: left;
    font-size: 1.0625rem;
    margin-top: 1.5625rem;
    margin-left: 0.9375rem;
  }
  .text-content {
    width: 90%;
    margin: auto;
  }
}
.interaction-btn {
  margin-top: 1.5625rem;
  margin-bottom: 1.5625rem;
  display: flex;
  justify-content: space-between;
  button {
    width: 48%;
  }
}
.box-post {
  width: 70%;
  margin: auto auto;
}
.box-event {
  width: 90%;
  margin: auto auto;
}
.box-form {
  h3 {
    text-align: right;
  }
  label {
    margin-top: 0.3125rem;
    font-size: 1rem;
    text-align: left;
  }
  .help {
    text-align: left;
  }
}

@media only screen and (max-width: (430px)) {
  .title-col {
    white-space: nowrap;
    flex-basis: 100%;
  }
  button {
    text-align: center;
  }
  .column {
    width: 100%;
  }
}
</style>
