// Attempting to copy Angel's Layout

// let gray = "#A6A6A6"
// let dark_gray = "#5C5C5C"

// let gold = "#FFD700"
// let blue = "#0080FF"

// let title_size 24
// let xaxis tag size = 24
// let yaxis tag size = 24
// Let tick font size = 18

// Creating the chart to track Sole Winners vs Shared winners
function solechart(data) {
  // Count the number of True and False for 'Sole_Winner'
  let soleWinnerCount = data.reduce((count, item) => {
      count[item.Sole_Winner ? 'true' : 'false'] += 1;
      return count;
  }, { 'true': 0, 'false': 0 });

  // Creating the data trace for Sole Winners
  let soleWinnerTrace = {
      x: ['Sole', 'Shared'],
      y: [soleWinnerCount.true, soleWinnerCount.false],
      type: 'bar',
      name: 'Sole Winners'
  };

// Creating the layout for Sole Winners
let soleWinnerLayout = {
  title: {
    text: 'Sole Winners vs Shared Winners',
    font: {
      size: 24,
      color: '#A6A6A6'
    },
    xref: 'paper',
    x: 0,
  },
  xaxis: {
    title: {
      font: {
        size: 24,
        color: '#A6A6A6'
      }
    },
    tickfont: {
      size: 18,
      color: '#A6A6A6'
    },
    tickcolor: '#A6A6A6',
    showline: true,
    linecolor: '#A6A6A6'
  },
  yaxis: {
    title: {
      text: 'Laureates',
      font: {
        size: 24,
        color: '#A6A6A6'
      }
    },
    tickfont: {
      size: 18,
      color: '#A6A6A6'
    },
    tickcolor: '#A6A6A6',
    showline: true,
    linecolor: '#A6A6A6'
  },
  legend: {
    font: {
      size: 24,
      color: '#A6A6A6'
    }
  },
  paper_bgcolor: '#212529',
  plot_bgcolor: '#212529',
};

  // Initial data for Sole Winners
  let initialData = [soleWinnerTrace];

  // Initial layout for Sole Winners (making it the default)
  let initialLayout = soleWinnerLayout;

  // Creating the data trace for Distribution
  let distributionTrace = {
      x: data.map(item => item.Portion),
      type: 'histogram',
      name: 'Distribution'
  };

// Updated layout for Distribution
let distributionLayout = {
  title: {
    text: 'Laureates by Portion',
    font: {
      size: 24,
      color: '#A6A6A6'
    }
  },
  xaxis: {
    title: {
      text: 'Portion',
      font: {
        size: 24,
        color: '#A6A6A6'
      }
    },
    tickfont: {
      size: 18,
      color: '#A6A6A6'
    },
    tickcolor: '#A6A6A6',
    showline: true,
    linecolor: '#A6A6A6',
    type: 'category',
    categoryorder: 'array',
    categoryarray: ['1', '1/2', '1/3', '1/4'],
  },
  yaxis: {
    title: {
      text: 'Laureates',
      font: {
        size: 24,
        color: '#A6A6A6'
      }
    },
    tickfont: {
      size: 18,
      color: '#A6A6A6'
    },
    tickcolor: '#A6A6A6',
    showline: true,
    linecolor: '#A6A6A6'
  },
  legend: {
    font: {
      size: 24,
      color: '#A6A6A6'
    }
  },
  paper_bgcolor: '#212529',
  plot_bgcolor: '#212529',
};

  // Add Distribution trace and layout to the initial data and layout
  initialData.push(distributionTrace);

  // Create plot
  Plotly.newPlot('chart4', initialData, initialLayout);

  // Update chart based on dropdown selection
  d3.selectAll("#chartType2").on("change", function () {
    updatePlot(data);
  });

  // Function to update the plot based on the dropdown selection
  function updatePlot(data) {
    let dropdownMenu = d3.select("#chartType2");
    let selectedOption = dropdownMenu.property("value");

    if (selectedOption === "showAll") {
      Plotly.newPlot('chart4', initialData, initialLayout);
    } else if (selectedOption === "soleWinnerLayout") {
      Plotly.newPlot('chart4', [soleWinnerTrace], soleWinnerLayout);
    } else if (selectedOption === "distributionLayout") {
      Plotly.newPlot('chart4', [distributionTrace], distributionLayout);
    }
  }
}

// Fetch data from AllTables.JSON
fetch('./resources/AllTables.JSON')
  .then(response => response.json())
  .then(data => {
      // Call the function with the retrieved data
      solechart(data.LaureatesAndAwards);
  })
  .catch(error => console.error('Error fetching data:', error));