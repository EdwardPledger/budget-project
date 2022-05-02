import { createApp } from 'vue'
import App from './App.vue'
import Equal from 'equal-vue'
import { initializeApp } from 'firebase/app'
import 'equal-vue/dist/style.css'
import router from './router'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALYhTqBVOHCts28LabMYq-Os9EetWNcks",
  authDomain: "budget-project-e8e63.firebaseapp.com",
  projectId: "budget-project-e8e63",
  storageBucket: "budget-project-e8e63.appspot.com",
  messagingSenderId: "802357372018",
  appId: "1:802357372018:web:80fed8378158b6d9bcceeb",
  measurementId: "G-FPGK8C2P65"
};

// Initialize firebase
initializeApp(firebaseConfig)

createApp(App).use(Equal).use(router).mount('#app')
