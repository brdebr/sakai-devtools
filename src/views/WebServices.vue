<template>
    <v-card dark
        class="blue darken-2 mx-auto" min-width="100%">
      <v-card-title class="elevation-2 blue darken-3 pt-3">
        WebServices
      </v-card-title>
      <v-card-text class="pt-5" @click="testt">
        <v-row>
          
        </v-row>
      </v-card-text>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import InstanceDetails from "@/components/InstanceDetails.vue";
import WebServices from '@/views/WebServices.vue';

export default Vue.extend({
  components: {
    InstanceDetails
  },
  data() {
    return {
      login: null
    }
  },
  methods:{
    async testt(){
      try {


        let aux = 1211

        // let aux = await axios.get('http://localhost:8080/sakai-ws/rest/sakai/getAllUsers', {
        //   withCredentials: true,
        //   params: {
        //     sessionid: sessionId
        //   }
        // })
        console.log(aux);
        
      } catch (error) {
        console.log('FUCK');
        console.log(error);
      }
    }
  }
});
</script>