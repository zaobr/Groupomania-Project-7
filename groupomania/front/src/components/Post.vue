<template>
  <div>
    <div v-for="post in postList" :key="post.id" class="box box-post">
      <!-- Structure du post pour affichage bouclé -->
      <div>
        <article class="media">
          <figure class="media-left">
            <figure class="image image is-48x48">
              <img :src="post.user.media" alt="Photo de profil utilisateur" />
            </figure>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong
                  >{{ post.user.firstname }} {{ post.user.lastname }}</strong
                >
                <br />
                <small>{{ timeSince(post.createdAt) }}</small>
              </p>
            </div>
          </div>
          <div class="media-right">
            <span
              v-if="currentUser == post.user.id || isAdmin"
              class="delete"
              @click="deletePost(post.id)"
            ></span>
          </div>
        </article>
        <div>
          <div class="content is-normal">
            <h2>{{ post.title }}</h2>
            <p class="text-content">
              {{ post.text }}
            </p>
            <figure class="image">
              <img :src="post.media" alt="Image post utilisateur" />
            </figure>
          </div>
        </div>
        <div class="interaction-btn">
          <button class="button is-light" @click="postLike(post.id)">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-thumbs-up"></i>
              </span>
              <span v-if="post.likes.length == 0" class="smallNone"
                >J'aime</span
              >
              <span v-if="post.likes.length > 0">{{ post.likes.length }}</span>
            </span>
          </button>
          <button class="button is-light" @click="displayComment(post)">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-comment"></i>
              </span>
              <span class="smallNone">Commenter</span>
            </span>
          </button>
        </div>
      </div>

      <!-- Section commentaires du post-->
      <div>
        <article
          v-for="comment in post.comments"
          :key="comment.id"
          class="media"
        >
          <figure class="media-left">
            <p class="image is-48x48">
              <img
                :src="comment.user.media"
                alt="Miniature photo de profil utilisateur"
              />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong
                  >{{ comment.user.firstname }}
                  {{ comment.user.lastname }}</strong
                >
                <br />
                {{ comment.text }}
                <br />
                <small
                  ><a>Like · </a>
                  <a
                    v-if="currentUser == comment.user.id || isAdmin"
                    @click="deleteComment(comment.id, post.id)"
                    >Delete ·</a
                  >
                  {{ timeSince(comment.createdAt) }}</small
                >
              </p>
            </div>
          </div>
        </article>
      </div>
      <article v-if="showComment == post.id" class="media">
        <figure class="media-left">
          <p class="image is-48x48">
            <img
              class="comment-pic"
              :src="profilepicture"
              alt="Photo de profil utilisateur"
            />
          </p>
        </figure>
        <div class="media-content">
          <div class="field">
            <p class="control">
              <textarea
                class="textarea"
                placeholder="Add a comment..."
                v-model="text"
              ></textarea>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button" @click="postComment(post.id)">
                Post comment
              </button>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Post",
  props: [],
  data() {
    return {
      postList: [],
      text: "",
      showComment: false,
      currentUser: "",
      isAdmin: false,
      likes: 0,
    };
  },
  computed: {},
  mounted() {
    // Récupération des posts depuis l'API pour affichage à l'arrivée de l'utilisateur
    axios
      .get("http://localhost:8888/api/posts/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((posts) => {
        let parsedData = JSON.parse(JSON.stringify(posts.data));
        for (let i = 0; i < parsedData.data.length; i++) {
          this.postList.push(parsedData.data[i]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
        this.currentUser = parsedData.user.id;
        this.isAdmin = parsedData.user.isAdmin;
        this.firstname = parsedData.user.firstname;
        this.lastname = parsedData.user.lastname;
        console.log(this.currentUser);
        console.log(this.isAdmin);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // Affichage du temps depuis la création de contenu en minutes, heures, jours, mois, années
    timeSince(objDate) {
      let isoDate = new Date(objDate);
      let date = isoDate.getTime();

      if (typeof date !== "object") {
        date = new Date(date);
      }

      var seconds = Math.floor((new Date() - date) / 1000);
      var intervalType;

      var interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        intervalType = "an";
      } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          intervalType = "mois";
        } else {
          interval = Math.floor(seconds / 86400);
          if (interval >= 1) {
            intervalType = "jour";
          } else {
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
              intervalType = "heure";
            } else {
              interval = Math.floor(seconds / 60);
              if (interval >= 1) {
                intervalType = "minute";
              } else {
                if (interval == 0) {
                  return "Maintenant";
                } else {
                  interval = seconds;
                  intervalType = "seconde";
                }
              }
            }
          }
        }
      }

      if ((interval > 1 || interval === 0) && intervalType != "mois") {
        intervalType += "s";
      }

      return "Il y a " + interval + " " + intervalType;
    },
    // Suppression du commentaire selectionné
    deleteComment(comment_id, post_id) {
      let a = (post) => post.id == post_id;
      let b = (comment) => comment.id == comment_id;

      let indexA = this.postList.findIndex(a);
      let indexB = this.postList[indexA].comments.findIndex(b);

      axios
        .delete("http://localhost:8888/api/interaction/delete", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: {
            comment_id,
          },
        })
        .then(() => {
          this.postList[indexA].comments.splice(indexB, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // Suppression du post selectionné
    deletePost(post_id) {
      let a = (post) => post.id == post_id;
      let index = this.postList.findIndex(a);

      axios
        .delete("http://localhost:8888/api/posts/delete", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: {
            post_id: post_id,
          },
        })
        .then(() => {
          this.postList.splice(index, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // Affichage de la partie création de commentaire
    displayComment(post) {
      if (this.showComment == post.id) {
        this.showComment = false;
      } else {
        this.showComment = post.id;
      }
    },
    // Envoi du nouveau commentaire vers l'API et affichage
    postComment(post_id) {
      let comment = {
        text: this.text,
        post_id: post_id,
      };
      let a = (post) => post.id == post_id;
      let b = Date.now();
      let obj = {
        post_id: post_id,
        text: this.text,
        user: {
          lastname: this.lastname,
          firstname: this.firstname,
          media: this.profilepicture,
          id: this.currentUser,
        },
        createdAt: b,
      };
      let index = this.postList.findIndex(a);

      axios
        .post("http://localhost:8888/api/interaction/", comment, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((comment) => {
          let id = {
            id: comment.data.data.id,
          };
          obj = { ...obj, ...id };
          this.text = "";
          this.showComment = false;
          this.postList[index].comments.push(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // Envoi du nouveau like vers l'API et affichage
    postLike(post_id) {
      let likedPost = {
        post_id: post_id,
      };

      let a = (post) => post.id == post_id;
      let obj = {
        post_id: post_id,
        user_id: this.currentUser,
      };
      let index = this.postList.findIndex(a);

      axios
        .post("http://localhost:8888/api/interaction/like", likedPost, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((like) => {
          if (like.status == 201) {
            this.postList[index].likes.push(obj);
          } else {
            this.postList[index].likes.pop();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
figure {
  margin: auto 0.3rem auto auto;
}
.head-post {
  .title-col {
    h1 {
      padding-top: 0.3125rem;
      margin: 0rem;
      text-align: left;
      font-weight: bold;
      font-size: 1.25rem;
    }
  }
  .button-col {
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
.content {
  text-align: left;
  h2 {
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
    max-width: 48%;
  }
}
.box-post {
  margin: auto auto;
}

.box {
  width: 80%;
}

.box-event {
  width: 75%;
  margin: auto auto;
}
.comment-pic {
  margin: auto 0.3rem auto auto;
}
.box-form {
  h2 {
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

@media only screen and (max-width: (550px)) {
  .text-icon {
    text-align: center;
    i {
      text-align: center;
      margin: auto;
    }
  }
  .smallNone {
    display: none;
  }
}
</style>
