<template>
    <div>
      <h1>Secured Page</h1>
      <div>This page is secured</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        securedData: null
      }
    },
    mounted() {
      this.fetchSecuredData();
    },
    methods: {
      fetchSecuredData() {
        axios.get('http://localhost:8080/secured')
            .then(response => {
            this.securedData = response.data;
  })
  .catch(error => {
    console.error('Error fetching secured data', error);
  });

      }
    }
  }
  </script>
  