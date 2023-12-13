<script>
import axios from "axios";
export default {
  data: function () {
    return {
      songs: [],
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
  },
};
</script>

<template>
  <div class="home">
    <h1>All Songs</h1>
    <div v-for="song in songs" v-bind:key="song.id">
      <h2>{{ song.title }}</h2>
      <p>Artist: {{ song.artist }}</p>
      <p>Album: {{ song.album }}</p>
      <p>Duration: {{ song.duration }}</p>
    </div>
  </div>
</template>

<style></style>
