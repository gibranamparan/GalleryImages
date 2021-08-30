<template>
  <div>
    <div>
      <b>Author: </b><span>{{image.author}}</span>
    </div>
    <div>
      <b>Camera: </b><span>{{image.camera}}</span>
    </div>
    <b-row>
      <b-col cols="12">
        <img :src="image.full_picture" alt="" class="full-image">
      </b-col>
    </b-row>
    <hr>
    <b-row>
      <b-col>
        <b-button variant="success" @click="prev" v-if="!!prevID">Previous</b-button>
        <b-button variant="info" @click="next" v-if="!!nextID">Next</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ImagesServices from '@/services/ImagesServices'
import ImageAE from '@/models/ImageAE';

@Component({
  name: 'ImageDetails',
})
export default class ImageDetails extends Vue {
  @Prop() private id!:string;
  @Prop() private prevID!:string;
  @Prop() private nextID!:string;

  private image:ImageAE = new ImageAE();

  created() : void{
    this.loadDetails();
  }
  
  @Watch('id') idChanged(){
    this.loadDetails();
  }

  loadDetails(){
    ImagesServices.getImageDetails(this.id)
    .then(res => {
      if(res.id){
        this.image = res;
      } 
      else console.error('No response from service: ', res);
    });
  }

  prev(){
    this.$emit('changeImg', this.prevID);
  }

  next(){
    this.$emit('changeImg', this.nextID);
  }
  
}
</script>
<style scoped>
  .full-image {
    width: 100%;
  }
</style>
