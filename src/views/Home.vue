<template>
  <div class="home">
    <b-row>
      <b-col v-for="img in images" :key="img.id" class="image">
        <img :src="img.cropped_picture" alt="" @click="openDetails(img.id)">
      </b-col>
    </b-row>

<!--     
       <b-modal :id="modalId" :title="title" size="lg" hide-footer
        @show="show"
    > -->

    <b-modal size="xl" title="Details" id="imageDetails" hide-footer>
      <ImageDetails :id="selectedID"
        @changeImg="openDetails"
        :prevID='prevID'
        :nextID='nextID'
      ></ImageDetails>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ImageDetails from '@/components/ImageDetails.vue';
import ImagesServices from '@/services/ImagesServices'
import ImageAE from '@/models/ImageAE';

@Component({
  name: 'Home',
  components: {
    ImageDetails,
  },
})
export default class Home extends Vue {
  private images:Array<ImageAE> = new Array<ImageAE>();
  private selectedID = '';
  private prevID = '';
  private nextID = '';

  created() : void{
    ImagesServices.getImages(2)
    .then(res => {
      if(res.length){
        this.images = res;
      } 
      else console.error('No response from service: ', res);
    })
  }

  openDetails(id:string){
    if(!id) return;
    
    this.selectedID = id;
    const idx = this.images.findIndex(i => i.id == id);
    this.prevID = this.images[idx-1]?.id || '';
    this.nextID = this.images[idx+1]?.id || '';

    this.$bvModal.show('imageDetails');
  }
}
</script>
<style scoped>
  .image {
    cursor: pointer;
    margin-bottom: 2em;
  }
</style>
