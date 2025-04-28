<template>
  <div class="metrics-page container py-4">
    <!-- Explanation Section -->
    <section class="explanation-section mb-4">
      <h1 class="display-4 text-center">Metrics</h1>
      <div class="lead mt-3">
        <p>
          The Metrics tool allows you to analyze bird survey data across different geographic areas and time periods.
          Select your parameters using the form below to generate visualizations on the interactive map.
        </p>
        <p>
          The resulting map will display trends in bird populations, helping researchers and conservationists identify
          areas of concern and success in bird conservation efforts.
        </p>
      </div>
    </section>

    <!-- Form Inputs Section -->
    <section class="form-inputs-section mb-4">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <div class="row mb-3">
              <!-- Year Selection -->
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="startYear" class="form-label">Start year</label>
                  <select 
                    id="startYear" 
                    class="form-select" 
                    v-model="formData.startYear"
                    @change="updateEndYearOptions"
                  >
                    <option v-for="year in startYearOptions" :key="year" :value="year">
                      {{ year }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-md-6">
                <div class="mb-3">
                  <label for="endYear" class="form-label">End year</label>
                  <select 
                    id="endYear" 
                    class="form-select" 
                    v-model="formData.endYear"
                  >
                    <option v-for="year in endYearOptions" :key="year" :value="year">
                      {{ year }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Problem Type Selection -->
            <div class="mb-3">
              <label class="form-label">Problem type</label>
              <div class="d-flex">
                <div class="form-check me-4">
                  <input 
                    class="form-check-input" 
                    type="radio" 
                    id="multiplePolygons" 
                    value="multiple" 
                    v-model="formData.problemType"
                  >
                  <label class="form-check-label" for="multiplePolygons">
                    Multiple polygons
                  </label>
                </div>
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="radio" 
                    id="singlePolygon" 
                    value="single" 
                    v-model="formData.problemType"
                  >
                  <label class="form-check-label" for="singlePolygon">
                    Single polygon
                  </label>
                </div>
              </div>
            </div>

            <!-- Geographic Area Selection -->
            <div class="mb-3">
              <label class="form-label">Geographic Area</label>
              <div class="row">
                <div class="col-md-4 mb-2">
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      id="bcr" 
                      value="BCR" 
                      v-model="formData.geographicArea"
                    >
                    <label class="form-check-label" for="bcr">BCR</label>
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      id="lcc" 
                      value="LCC" 
                      v-model="formData.geographicArea"
                    >
                    <label class="form-check-label" for="lcc">LCC</label>
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      id="usa" 
                      value="USA" 
                      v-model="formData.geographicArea"
                    >
                    <label class="form-check-label" for="usa">USA</label>
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      id="canada" 
                      value="Canada" 
                      v-model="formData.geographicArea"
                    >
                    <label class="form-check-label" for="canada">Canada</label>
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      id="sagegrouse" 
                      value="Sage-Grouse" 
                      v-model="formData.geographicArea"
                    >
                    <label class="form-check-label" for="sagegrouse">Greater Sage-Grouse habitat</label>
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      id="custom" 
                      value="Custom" 
                      v-model="formData.geographicArea"
                    >
                    <label class="form-check-label" for="custom">Custom Shapefile</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="d-grid">
              <button type="submit" class="btn btn-success">
                <i class="bi bi-check-circle me-2"></i> Click
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Map Viewer Section -->
    <section class="map-viewer-section mb-4">
      <div class="card">
        <div class="card-body p-0">
          <div id="map" ref="mapRef" class="map-container"></div>
          <div class="map-controls">
            <button 
              class="btn btn-warning btn-get-results"
              @click="getResults"
            >
              <i class="bi bi-arrow-left me-2"></i> Click to get results!
            </button>
          </div>
          <div class="map-attribution">
            Leaflet | Data by OpenStreetMap, under ODbL
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import L from 'leaflet';

// Fix Leaflet icon paths
import { Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

export default {
  name: 'MetricsView',
  setup() {
    // Data
    const currentYear = new Date().getFullYear();
    const mapRef = ref(null);
    const map = ref(null);
    const isLoading = ref(false);

    // Form data
    const formData = ref({
      startYear: 1966,
      endYear: currentYear,
      problemType: 'multiple',
      geographicArea: 'BCR'
    });

    // Computed properties for year options
    const startYearOptions = computed(() => {
      const years = [];
      for (let year = 1966; year <= currentYear; year++) {
        years.push(year);
      }
      return years;
    });

    const endYearOptions = computed(() => {
      const years = [];
      for (let year = formData.value.startYear; year <= currentYear; year++) {
        years.push(year);
      }
      return years;
    });

    // Methods
    const updateEndYearOptions = () => {
      // Ensure end year is not less than start year
      if (formData.value.endYear < formData.value.startYear) {
        formData.value.endYear = formData.value.startYear;
      }
    };

    const handleSubmit = () => {
      isLoading.value = true;
      
      // Here you would call an API to get map data
      console.log('Form submitted with:', formData.value);
      
      // Simulate loading delay
      setTimeout(() => {
        // Mock data visualization on map
        addMockDataToMap();
        isLoading.value = false;
      }, 1000);
    };

    const getResults = () => {
      alert('Detailed results will be displayed here. This would typically link to a detailed analysis page.');
    };

    const initMap = () => {
      // Initialize Leaflet map
      map.value = L.map(mapRef.value).setView([37.8, -96], 4);
      
      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);
    };

    const addMockDataToMap = () => {
      // Clear existing layers
      map.value.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polygon) {
          map.value.removeLayer(layer);
        }
      });

      // Add mock data based on form selection
      if (formData.value.problemType === 'multiple') {
        // Add multiple polygons
        const polygons = [
          [[37, -109.05], [41, -109.03], [41, -102.05], [37, -102.04]],
          [[32, -106], [34, -106], [34, -103], [32, -103]]
        ];
        
        polygons.forEach(points => {
          L.polygon(points, { color: 'green', fillOpacity: 0.3 }).addTo(map.value);
        });
      } else {
        // Add single polygon
        const points = [[42, -99], [46, -99], [46, -93], [42, -93]];
        L.polygon(points, { color: 'blue', fillOpacity: 0.3 }).addTo(map.value);
      }
    };

    // Lifecycle hooks
    onMounted(() => {
      initMap();
    });

    return {
      mapRef,
      formData,
      isLoading,
      startYearOptions,
      endYearOptions,
      updateEndYearOptions,
      handleSubmit,
      getResults
    };
  }
}
</script>

<style scoped>
.metrics-page {
  max-width: 1200px;
  margin: 0 auto;
}

.map-container {
  height: 500px;
  width: 100%;
  position: relative;
}

.map-controls {
  position: absolute;
  bottom: 60px;
  left: 20px;
  z-index: 1000;
}

.btn-get-results {
  padding: 8px 16px;
  font-weight: bold;
}

.map-attribution {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 11px;
  background: rgba(255, 255, 255, 0.7);
  padding: 2px 5px;
  border-radius: 3px;
}
</style> 