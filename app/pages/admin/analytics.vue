<script setup lang="ts">
import { ref } from 'vue'

// Fetch the data from your secured Nuxt server endpoint
const { data: events, error, refresh } = await useFetch('/api/admin/analytics')

// Reactive states for basic filtering
const activeFilter = ref('all')

// Computed metrics extracted dynamically from the database JSONB payloads
const totalPageViews = computed(() => events.value?.length || 0)

const avgReadTime = computed(() => {
  if (!events.value) return 0
  const timeEvents = events.value.filter(e => e.event_type === 'time_spent')
  if (!timeEvents.length) return 0
  const total = timeEvents.reduce((acc, curr) => acc + (Number(curr.value?.duration) || 0), 0)
  return Math.round(total / timeEvents.length)
})

const filteredEvents = computed(() => {
  if (!events.value) return []
  if (activeFilter.value === 'all') return events.value
  return events.value.filter(e => e.event_type === activeFilter.value)
})

// Formatting helper for timestamps
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-SG', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}
</script>

<template>
  <div class="admin-container">
    <header class="admin-header">
      <h1>📊 Analytics Dashboard</h1>
      <button @click="refresh" class="btn-refresh">Refresh Data</button>
    </header>

    <!-- Error State (e.g. Unauthenticated) -->
    <div v-if="error" class="error-banner">
      <p>⚠️ Failed to load analytics: {{ error.statusMessage || 'Unauthorized access.' }}</p>
      <p>Ensure you are logged in with your administrator account.</p>
    </div>

    <div v-else-if="events">
      <!-- High-Level Summary Cards -->
      <section class="metrics-grid">
        <div class="metric-card">
          <h3>Total Captured Events</h3>
          <p class="metric-value">{{ totalPageViews }}</p>
        </div>
        <div class="metric-card">
          <h3>Avg. Story Read Time</h3>
          <p class="metric-value">{{ avgReadTime }}s</p>
        </div>
      </section>

      <!-- Filter Tabs -->
      <div class="filter-bar">
        <button 
          v-for="type in ['all', 'time_spent', 'scroll_depth', 'page_navigation']" 
          :key="type"
          :class="['filter-btn', { active: activeFilter === type }]"
          @click="activeFilter = type"
        >
          {{ type.replace('_', ' ') }}
        </button>
      </div>

      <!-- Data Table View -->
      <div class="table-responsive">
        <table class="analytics-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Event Type</th>
              <th>Target Path</th>
              <th>Payload Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in filteredEvents" :key="event.id">
              <td class="text-nowrap">{{ formatDate(event.created_at) }}</td>
              <td>
                <span :class="['badge', event.event_type]">
                  {{ event.event_type }}
                </span>
              </td>
              <td class="font-mono">{{ event.path }}</td>
              <td class="font-mono json-cell">
                {{ JSON.stringify(event.value) }}
              </td>
            </tr>
            <tr v-if="filteredEvents.length === 0">
              <td colspan="4" class="text-center">No events found matching this criteria.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: system-ui, sans-serif;
  color: #1a1a1a;
}
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}
.btn-refresh {
  background: #00c58e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.metric-card {
  background: #f9f9f9;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  border-radius: 8px;
}
.metric-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #64748b;
  text-transform: uppercase;
}
.metric-value {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  color: #00c58e;
}
.filter-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.filter-btn {
  background: #edf2f7;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  text-transform: capitalize;
}
.filter-btn.active {
  background: #1a1a1a;
  color: white;
}
.table-responsive {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.analytics-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.analytics-table th, .analytics-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}
.analytics-table th {
  background: #f8fafc;
  color: #475569;
}
.font-mono { font-family: monospace; font-size: 0.85rem; }
.text-nowrap { white-space: nowrap; }
.json-cell { color: #0f172a; max-width: 400px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.badge { padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; }
.badge.time_spent { background: #dbeafe; color: #1e40af; }
.badge.scroll_depth { background: #fef3c7; color: #92400e; }
.badge.page_navigation { background: #d1fae5; color: #065f46; }
.error-banner { background: #fee2e2; border: 1px solid #f87171; padding: 1rem; border-radius: 6px; color: #991b1b; }
</style>