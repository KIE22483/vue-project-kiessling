<!-- 
json server db.json on localhost:3000
json-server --watch db.json --port 3000
-->

<template>
  <div id="app" class="container mt-4">
    <h1>Audit Table</h1>
    <router-view></router-view>

    <div class="mb-4">
      <h2>Add Audit</h2>
      <form @submit.prevent="addAudit">
        <div class="form-group">
          <label for="title">Title</label>
          <input v-model="newAudit.title" id="title" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="date">Date</label>
          <input v-model="newAudit.date" type="date" id="date" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea v-model="newAudit.description" id="description" class="form-control" required></textarea>
        </div>
        <div class="form-group">
          <label for="priority">Priority</label>
          <select v-model="newAudit.priority" id="priority" class="form-control" required>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Add Audit</button>
      </form>
    </div>

    <!-- Audit Table -->
    <table class="table custom-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>ID</th>
          <th>Date</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Actions</th>
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
      audits: [],
      newAudit: {
        title: '',
        date: '',
        description: '',
        priority: 'Medium'
      }
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/audits');
      this.audits = response.data;
    } catch (error) {
      console.error('Error fetching audits:', error);
    }
  },
  methods: {
    async addAudit() {
      try {
        const response = await axios.post('http://localhost:3000/audits', this.newAudit);
        this.audits.push(response.data);
        // Reset the form
        this.newAudit = { title: '', date: '', description: '', priority: 'Medium' };
        console.log('Audit added successfully');
      } catch (error) {
        console.error('Error adding audit:', error);
      }
    },
    deleteAudit(auditId) {
      const confirmed = confirm('Are you sure you want to delete this audit?');
      if (confirmed) {
        axios.delete(`http://localhost:3000/audits/${auditId}`)
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

      axios.patch(`http://localhost:3000/audits/${auditId}`, updatedAudit)
        .then(response => {
          this.audits.splice(auditIndex, 1, updatedAudit);
          console.log('Audit edited successfully');
        })
        .catch(error => {
          console.error('Error editing audit:', error);
        });
    }
  }
};
</script>

<style scoped>
.custom-table th,
.custom-table td {
  padding: 25px; 
}
</style>
