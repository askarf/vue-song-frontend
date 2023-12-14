<script>
import axios from "axios";
export default {
  data: function () {
    return {
      artists: [],
      newArtistParams: {},
      editArtistParams: {},
      currentArtist: {},
    };
  },
  created: function () {
    this.indexArtists();
  },
  methods: {
    indexArtists: function () {
      axios.get("http://localhost:5000/artists.json").then((response) => {
        console.log("artists index", response);
        this.artists = response.data;
      });
    },
    createArtist: function () {
      const formData = new FormData();
      formData.append("name", this.newArtistParams.name);
      formData.append("bio", this.newArtistParams.bio);
      axios
        .post("http://localhost:5000/artists.json", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("artist create", response);
          this.artist.push(response.data);
          this.newArtistParams = {};
        })
        .catch((error) => {
          console.log("artist create error", error.response);
        });
    },
    showArtist: function (artist) {
      this.currentArtist = artist;
      this.editArtistParams = artist;
      document.querySelector("#artist-details").showModal();
    },
    updateArtist: function (artist) {
      const formData = new FormData();
      formData.append("name", this.editArtistParams.name);
      formData.append("bio", this.editArtistParams.bio);
      axios
        .patch("http://localhost:5000/artists/" + artist.id + ".json", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("artists update", response);
          this.currentArtist = {};
        })
        .catch((error) => {
          console.log("artists update error", error.response);
        });
    },
    destroyArtist: function (artist) {
      axios.delete("http://localhost:5000/artists/" + artist.id + ".json").then((response) => {
        console.log("artists destroy", response);
        var index = this.artists.indexOf(artist);
        this.artists.splice(index, 1);
      });
    },
  },
};
</script>

<template>
  <div>
    <dialog id="artist-details">
      <form method="dialog">
        <h1>Artist info</h1>
        <p>
          Name
          <input type="text" v-model="editArtistParams.name" />
        </p>
        <p>
          Bio:
          <input type="text" v-model="editArtistParams.bio" />
        </p>

        <button v-on:click="updateArtist(currentArtist)">Update</button>
        <button v-on:click="destroyArtist(currentArtist)">Delete Artist</button>
        <button>Close</button>
      </form>
    </dialog>

    <h1>New Artist</h1>
    <div>
      Name:
      <input type="text" v-model="newArtistParams.name" />
      Bio:
      <input type="text" v-model="newArtistParams.bio" />
      <button v-on:click="createArtist()">Create Artist</button>
    </div>

    <h1>All Artists</h1>
    <div v-for="artist in artists" v-bind:key="artist.id">
      <h2>{{ artist.name }}</h2>
      <p>Bio {{ artist.bio }}</p>
      <button v-on:click="showArtist(artist)">More info</button>
    </div>
  </div>
</template>

<style></style>
