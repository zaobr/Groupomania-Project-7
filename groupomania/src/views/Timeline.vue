<template>
  <div class="timeline">
    <div class="columns">
      <div class="column is-two-thirds">
        <div class="column base-head">
          <div class="columns head-post">
            <div class="column title-col is-two-thirds">
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

        <!-- Form -->
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
          <form id="postForm" name="postForm" enctype="multipart/form-data" method="post">
            <label class="label">Importez votre contenu média</label>
            <div class="file">
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
              </label>
            </div>
            <p class="help">Format accepté: JPG/JPEG, PNG, GIF.</p>
            <button class="button is-dark" @click.prevent="publishPost()">
              Publier
            </button>
          </form>
        </div>
        <!-- End of Form -->

        <!-- Post -->
        <div class="box box-post">
          <div>
            <article class="media">
              <figure class="media-left">
                <figure class="image image is-48x48">
                  <img src="https://bulma.io/images/placeholders/128x128.png" />
                </figure>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>John Smith</strong>
                    <br />
                    <small>Il y a</small>
                  </p>
                </div>
              </div>
              <div class="media-right">
                <button class="delete"></button>
              </div>
            </article>
            <div>
              <div class="content is-normal">
                <h3>Titre de la publication</h3>
                <p class="text-content">
                  Curabitur accumsan turpis pharetra
                  <strong>augue tincidunt</strong> blandit. Quisque condimentum
                  maximus mi, sit amet commodo arcu rutrum id. Proin pretium
                  urna vel cursus venenatis. Suspendisse potenti. Etiam mattis
                  sem rhoncus lacus dapibus facilisis. Donec at dignissim dui.
                  Ut et neque nisl.
                </p>
                <figure class="image">
                  <img src="@/../public/images/hi.gif" />
                </figure>
              </div>
            </div>
            <div class="interaction-btn">
              <button class="button is-light">
                <span class="icon-text">
                  <span class="icon">
                    <i class="fas fa-thumbs-up"></i>
                  </span>
                  <span>J'aime</span>
                </span>
              </button>
              <button
                class="button is-light"
                @click="
                  showComment ? (showComment = false) : (showComment = true)
                "
              >
                <span class="icon-text">
                  <span class="icon">
                    <i class="fas fa-comment"></i>
                  </span>
                  <span>Commenter</span>
                </span>
              </button>
            </div>
          </div>

          <!-- Comment Section-->

          <article v-if="showComment" class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </p>
            </figure>
            <div class="media-content">
              <div class="field">
                <p class="control">
                  <textarea
                    class="textarea"
                    placeholder="Add a comment..."
                  ></textarea>
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <button class="button">Post comment</button>
                </p>
              </div>
            </div>
          </article>

          <!-- End of Comment Section-->
        </div>
        <!-- End of post-->
      </div>
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

export default {
  name: "Timeline",
  data() {
    return {
      post: {
        title: "",
        text: "",
        media: ""
      },
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
      showComment: false,
    };
  },
  components: {},
  computed: {},
  methods: {
    getMedia(event) {
      this.post.media = event.target.files[0];
    },
    publishPost() {
        let postForm = new FormData()
        postForm.append("image", this.post.media);
        postForm.append("title", this.post.title);
        postForm.append("text", this.post.text);
      axios
        .post("http://localhost:8888/api/posts/", postForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((post) => {
          console.log(post.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  .base-head {
    width: 75%;
    margin: auto;
  }
  .head-post {
    .title-col {
      h1 {
        padding-top: 5px;
        margin: 0px;
        text-align: left;
        font-weight: bold;
        font-size: 20px;
      }
    }
    .button-col {
      button {
        font-size: 15px;
      }
    }
  }
  h2 {
    text-align: left;
    margin: 20px 0px 10px 10px;
    font-weight: bold;
  }
}
.content {
  text-align: left;
  h3 {
    text-align: left;
    font-size: 17px;
    margin-top: 25px;
    margin-left: 15px;
  }
  .text-content {
    width: 90%;
    margin: auto;
  }
}
.interaction-btn {
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  button {
    width: 48%;
  }
}
.box-post {
  width: 75%;
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
    margin-top: 5px;
    font-size: 16px;
    text-align: left;
  }
  .help {
    text-align: left;
  }
}
</style>
