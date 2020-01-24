import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import WebServices from "@/views/WebServices.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/webservices",
      name: "webservices",
      component: WebServices
    }
  ]
});
