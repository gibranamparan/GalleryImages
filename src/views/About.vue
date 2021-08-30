<template>
  <div class="about">
    <h1>This is just a task for the interview.</h1>
    <b>Git Repo </b><a href="https://github.com/gibranamparan/GalleryImages">Here</a>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default class About extends Vue{
  
  created(){
    console.log('Created About Page');
  }

}
</script>
