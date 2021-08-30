<template>
  <div class="home">
    <b-row>
      <b-col v-for="img in imageList.images" :key="img.id" class="image">
        <img :src="img.cropped_picture" alt="" @click="openDetails(img.id)">
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <span v-for="n in imageList.pageCount" :key="n">
          <a href="#" @click.prevent="loadPage(n)">{{n}} </a> <span>|</span>
        </span>
      </b-col>
    </b-row>

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
import ImagesList from '@/models/ImagesList';

@Component({
  name: 'Home',
  components: {
    ImageDetails,
  },
})
export default class Home extends Vue {
  private imageList:ImagesList = new ImagesList();
  private selectedID = '';
  private prevID = '';
  private nextID = '';

  created() : void{
    this.loadPage(0);
  }

  openDetails(id:string){
    if(!id) return;
    
    this.selectedID = id;
    const idx = this.imageList.images.findIndex(i => i.id == id);
    this.prevID = this.imageList.images[idx-1]?.id || '';
    this.nextID = this.imageList.images[idx+1]?.id || '';

    this.$bvModal.show('imageDetails');
  }

  loadPage(numberPage:number){
    ImagesServices.getImages(numberPage)
    .then(res => {
      if(res?.images.length){
        this.imageList = res;
      } 
      else console.error('No response from service: ', res);
    })
  }
}
</script>
<style scoped>
  .image {
    cursor: pointer;
    margin-bottom: 2em;
  }
</style>
