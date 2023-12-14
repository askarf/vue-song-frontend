<script>
import axios from "axios";
export default {
  data: function () {
    return {
      songs: [],
      newSongParams: {},
      currentSong: {},
      editSongParams: {},
    };
  },
  created: function () {
    this.indexSongs();
  },
  methods: {
    indexSongs: function () {
      axios.get("http://localhost:5000/songs.json").then((response) => {
        console.log("songs index", response);
        this.songs = response.data;
      });
    },
    createSong: function () {
      const formData = new FormData();
      formData.append("title", this.newSongParams.title);
      formData.append("artist", this.newSongParams.artist);
      formData.append("album", this.newSongParams.album);
      formData.append("duration", this.newSongParams.duration);
      axios
        .post("http://localhost:5000/songs.json", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("songs create", response);
          this.songs.push(response.data);
          this.newSongParams = {};
        })
        .catch((error) => {
          console.log("songs create error", error.response);
        });
    },
    showSong: function (song) {
      this.currentSong = song;
      this.editSongParams = song;
      document.querySelector("#song-details").showModal();
    },
    updateSong: function (song) {
      const formData = new FormData();
      formData.append("title", this.editSongParams.title);
      formData.append("artist", this.editSongParams.artist);
      formData.append("album", this.editSongParams.album);
      formData.append("duration", this.editSongParams.duration);
      axios
        .patch("http://localhost:5000/songs/" + song.id + ".json", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("songs update", response);
          this.currentSong = {};
        })
        .catch((error) => {
          console.log("songs update error", error.response);
        });
    },
    destroySong: function (song) {
      axios.delete("http://localhost:5000/songs/" + song.id + ".json").then((response) => {
        console.log("songs destroy", response);
        var index = this.songs.indexOf(song);
        this.songs.splice(index, 1);
      });
    },
  },
};
</script>

<template>
  <div>
    <h1>New Song</h1>
    <div>
      Title:
      <input type="text" v-model="newSongParams.title" />
      Artist:
      <input type="text" v-model="newSongParams.artist" />
      Album:
      <input type="text" v-model="newSongParams.album" />
      Duration:
      <input type="text" v-model="newSongParams.duration" />
      <button v-on:click="createSong()">Create Song</button>
    </div>
    <h1>All Songs</h1>
    <div v-for="song in songs" v-bind:key="song.id">
      <h2>{{ song.title }}</h2>
      <p>Artist: {{ song.artist }}</p>
      <p>Album: {{ song.album }}</p>
      <p>Duration: {{ song.duration }}</p>
      <button v-on:click="showSong(song)">More info</button>
    </div>
    <dialog id="song-details">
      <form method="dialog">
        <h1>Song info</h1>
        <p>
          Title:
          <input type="text" v-model="editSongParams.title" />
        </p>
        <p>
          Artist:
          <input type="text" v-model="editSongParams.artist" />
        </p>
        <p>
          Album:
          <input type="text" v-model="editSongParams.album" />
        </p>
        <p>
          Duration:
          <input type="text" v-model="editSongParams.duration" />
        </p>
        <button v-on:click="updateSong(currentSong)">Update</button>
        <button v-on:click="destroySong(currentSong)">Delete Song</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>
