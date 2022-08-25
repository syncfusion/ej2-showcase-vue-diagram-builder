import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/index.css";
import "./assets/db-icons1/style.css";
import "./assets/dbstyle/diagrambuilder.css";
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap-vue/dist/bootstrap-vue.css"
// import "bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
