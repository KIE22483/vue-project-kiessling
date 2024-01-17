<template>
  <div id="app" class="container mt-4">
    <h1>Audit Table</h1>

    <table class="table custom-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>ID</th>
          <th>Date</th>
          <th>Description</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="audit in audits" :key="audit.id">
          <td>{{ audit.title }}</td>
          <td>{{ audit.id }}</td>
          <td>{{ audit.date }}</td>
          <td>{{ audit.description }}</td>
          <td>{{ audit.priority }}</td>
          <td>       
            <button @click="editAudit(audit.id)">Edit</button>
          </td>
          <td>
            <button @click="deleteAudit(audit.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import axios from 'axios';


export default {
  data() {
    return {
      audits: []
    };
  },
  async mounted() {
    try {
      const response = await axios.get('../data/data.json');
      this.audits = response.data.audits;
    } catch (error) {
      console.error('Error fetching audits:', error);
    }
  },
  methods: {
    deleteAudit(auditId) {
    const confirmed = confirm('Are you sure you want to delete this audit?');
    if (confirmed) {
      axios.delete(`../data/data.json`)
        .then(response => {
          this.audits = this.audits.filter(audit => audit.id !== auditId);
          console.log('Audit deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting audit:', error);
        });
    }
  },
  editAudit(auditId) {
  const newDescription = prompt('Enter the new description:');
  if (newDescription === null || newDescription.trim() === '') {
    return;
  }
  const auditIndex = this.audits.findIndex(audit => audit.id === auditId);
  if (auditIndex === -1) {
    console.error('Audit not found');
    return;
  }

  const updatedAudit = { ...this.audits[auditIndex], description: newDescription };


  axios.patch(`../data/data.json`, { audits: this.audits })
    .then(response => {
      console.log('Audit edited successfully');
    })
    .catch(error => {
      console.error('Error editing audit:', error);
    });
}

}
}
</script>


<style scoped>
.custom-table th,
.custom-table td {
  padding: 25px; /* Adjust the value as needed */
}
</style>