// Wait for the DOM to be ready
$(document).ready(function () {
  // Define the map with wrap option - set world-wraping
  let map = L.map("map", {
    center: [25, -30],
    zoom: 2.5,
    wrapLatLng: [90, -180],
    worldCopyJump: true,
  });

  // Define the Layers for the different styles
  let regMap = L.tileLayer('https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=gyY5igTqRQf5an0OvTN6', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  });

  let darkMap = L.tileLayer('https://api.maptiler.com/maps/toner-v2/{z}/{x}/{y}.png?key=gyY5igTqRQf5an0OvTN6', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  });

  let lightMap = L.tileLayer('https://api.maptiler.com/maps/backdrop/{z}/{x}/{y}.png?key=gyY5igTqRQf5an0OvTN6', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  });

  // Combine formatting
  let baseMaps = {
    "Regular Map": regMap,
    "Dark Map": darkMap,
    "Light Map": lightMap
  };
  // Define the default base map
  let defaultMap = regMap;

  // Add the default map layer to the map
  defaultMap.addTo(map);

  // Add layer control to switch between basemaps
  L.control.layers(baseMaps).addTo(map);

  // Adding Marker Clusters
  let markers = L.markerClusterGroup();
  markers.addTo(map);

  // Adding Date Range Picker
  $('#dateRangePicker').daterangepicker({
    "minYear": 1901,
    "maxYear": 2023,
    ranges: {
        'Last 5 Years': [moment().subtract(5, 'years'), moment()],
        'Last 20 Years': [moment().subtract(20, 'Years'), moment()],
        'Last 50 Years': [moment().subtract(50, 'Years'), moment()],
        'Since 1901': [moment('01/01/1901', 'MM/DD/YYYY'), moment('11/28/2023', 'MM/DD/YYYY')],
    },
    "startDate": "01/01/1901",
    "endDate": "11/28/2023",
    "minDate": "01/01/1901",
    "maxDate": "11/28/2023",
    "opens": "center"
  }, function(start, end, label) {
    console.log('New date range selected: ' + start.format('MM/DD/YYYY') + ' to ' + end.format('MM/DD/YYYY') + ' (predefined range: ' + label + ')');
    // Fetch and plot data based on the new date range
  fetchDataAndPlot();
});

// Event listener for apply button
$('#dateRangePicker').on('apply.daterangepicker', function (ev, picker) {
  console.log('Apply button clicked. Start Date:', picker.startDate.format('MM/DD/YYYY'));
  console.log('Apply button clicked. End Date:', picker.endDate.format('MM/DD/YYYY'));
  // Fetch and plot data based on the new date range
  fetchDataAndPlot();
});

  // Fetch data and plot markers function
  async function fetchDataAndPlot() {
    console.log('Fetching data...');
    try {
      // Clear existing markers
      markers.clearLayers();
  
      // Fetch data
      const response = await fetch('http://127.0.0.1:5000/AllTables');
      const data = await response.json();
  
      // Get the selected category from the dropdown
      const selectedCategory = document.getElementById('categoryDropdown').value;
  
      // Get the selected date range from the Date Range Picker
      const dateRange = $('#dateRangePicker').val().split(' - ');
      const startDate = moment(dateRange[0], 'MM/DD/YYYY', true);
      const endDate = moment(dateRange[1], 'MM/DD/YYYY', true);
  
      // Filter data based on the selected category and date range
      const filteredData = data.LaureatesAndAwards.filter(item => {
        // Check if Date_Awarded is defined and not null
        if (item.Date_Awarded !== undefined && item.Date_Awarded !== null) {
          // Parse the date
          const dateAwardedMoment = moment(item.Date_Awarded, 'MM/DD/YYYY', true);
      
          console.log('Start Date:', startDate.format('MM/DD/YYYY'));
          console.log('End Date:', endDate.format('MM/DD/YYYY'));
          console.log('Date Awarded Moment:', dateAwardedMoment.format('MM/DD/YYYY'));
          
          // Check if the date is valid and falls within the selected range
          if (dateAwardedMoment.isValid()) {
            const isDateWithinRange = dateAwardedMoment.isSameOrAfter(startDate) && dateAwardedMoment.isSameOrBefore(endDate);
            console.log('Is Date within Range:', isDateWithinRange);
      
            return (
              (selectedCategory === 'all' || item.Category === selectedCategory) &&
              isDateWithinRange
            );
          }
        }
      
        // Skip entries with null or invalid Date_Awarded
        return false;
      });
  
      console.log('Filtered Data:', filteredData);

      filteredData.forEach(item => {
        console.log('Processing item:', item);
        const {
          Birth_City,
          Birth_Country,
          Birth_Lat,
          Birth_Lon,
          Category,
          Date_Awarded,
          Motivation,
          Laureate_Full_Name,
        } = item;

        // Check if latitude and longitude are present and valid
        if (Birth_Lat !== null && Birth_Lon !== null && !isNaN(Birth_Lat) && !isNaN(Birth_Lon)) {
          // Create a marker for each data point
          const marker = L.marker([Birth_Lat, Birth_Lon], {
            icon: L.divIcon({
              className: 'gold-marker',
              html: '&#129351;', 
              iconSize: [30, 30],
              iconAnchor: [15, 30],
              popupAnchor: [0, -30],
            }),
          });

          const popupContent = `<b>Name:</b> ${Laureate_Full_Name}<br/>
                                <b>Birthplace:</b> ${Birth_City}, ${Birth_Country}<br/>
                                <b>Nobel Prize Category:</b> ${Category}<br/>
                                <b>Reason for Award:</b> ${Motivation}`;

          marker.bindPopup(popupContent);

          // Add dateAwarded to the popup if available
          if (Date_Awarded) {
            marker.bindPopup(`${popupContent}<br/><b>Date Awarded:</b> ${Date_Awarded}`);
          }

          markers.addLayer(marker);  // Add the marker to the cluster group
        } else {
          console.error(`Invalid latitude or longitude for ${Laureate_Full_Name}:`, item);
        }
      });

      // Add marker cluster to the map
      map.addLayer(markers);

      console.log('Markers added to the map:', map);
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  }

  // Add change event listener to the dropdown
  $('#categoryDropdown').on('change', function () {
    // Log the selected value for debugging
    console.log('Dropdown value changed:', this.value);
    // Fetch and plot data based on the dropdown value
    fetchDataAndPlot();
  });

  // Initial call to fetch data and plot markers
  fetchDataAndPlot();
});