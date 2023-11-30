// Colors

let gold = "#FFD700"
let gray = "#A6A6A6"
let dark_gray = "#5C5C5C"

// Function to count totals

// Length of js dictionary
console.log(nobeldata.length)

// Get the first element in the dictionary
console.log(nobeldata[0])

// Get the first element in the array

console.log(nobeldata[0].LaureatesAndAwards[0].Age_When_Awarded)

// Get the second element in the array

console.log(nobeldata[0].LaureatesAndAwards[1].Age_When_Awarded)

// Get the length of the array

console.log(nobeldata[0].LaureatesAndAwards.length)


console.log(nobeldata[0].LaureatesAndAwards[23].Category)


// Let's attempt the filter function


//let physics = nobeldata.filter(SelectPrizeCategory)

//console.log(physics)

function countAll(nobeldata) {

  count_teens = 0;
  count_20s = 0;
  count_30s = 0;
  count_40s = 0;
  count_50s = 0;
  count_60s = 0;
  count_70s = 0;
  count_80s = 0;

  for (let i = 0; i < nobeldata[0].LaureatesAndAwards.length; i++) {

    row = nobeldata[0].LaureatesAndAwards[i]

    if (row.Age_When_Awarded < 20) {
      count_teens += 1
    }

    if (row.Age_When_Awarded >= 20 && row.Age_When_Awarded < 30) {
      count_20s += 1
    }
    if (row.Age_When_Awarded >= 30 && row.Age_When_Awarded < 40) {
      count_30s += 1
    }

    if (row.Age_When_Awarded >= 40 && row.Age_When_Awarded < 50) {
      count_40s += 1
    }

    if (row.Age_When_Awarded >= 50 && row.Age_When_Awarded < 60) {
      count_50s += 1
    }

    if (row.Age_When_Awarded >= 60 && row.Age_When_Awarded < 70) {
      count_60s += 1
    }

    if (row.Age_When_Awarded >= 70 && row.Age_When_Awarded < 80) {
      count_70s += 1
    }

    if (row.Age_When_Awarded >= 80) {
      count_80s += 1
    }

  }

  all_count = [count_teens, count_20s, count_30s, count_40s, count_50s, count_60s, count_70s, count_80s]
  
  return all_count
}

function countTotals(nobeldata, gender) {
  
  count_teens = 0;
  count_20s = 0;
  count_30s = 0;
  count_40s = 0;
  count_50s = 0;
  count_60s = 0;
  count_70s = 0;
  count_80s = 0;

  for (let i = 0; i < nobeldata[0].LaureatesAndAwards.length; i++) {

    row = nobeldata[0].LaureatesAndAwards[i]


    if (row.Gender == gender) {

      if (row.Age_When_Awarded < 20) {
        count_teens += 1
      }

      if (row.Age_When_Awarded >= 20 && row.Age_When_Awarded < 30) {
        count_20s += 1
      }

      if (row.Age_When_Awarded >= 30 && row.Age_When_Awarded < 40) {
        count_30s += 1
      }

      if (row.Age_When_Awarded >= 40 && row.Age_When_Awarded < 50) {
        count_40s += 1
      }

      if (row.Age_When_Awarded >= 50 && row.Age_When_Awarded < 60) {
        count_50s += 1
      }

      if (row.Age_When_Awarded >= 60 && row.Age_When_Awarded < 70) {
        count_60s += 1
      }

      if (row.Age_When_Awarded >= 70 && row.Age_When_Awarded < 80) {
        count_70s += 1
      }

      if (row.Age_When_Awarded >= 80) {
        count_80s += 1
      }

    }
  }

  count_array = [count_teens, count_20s, count_30s, count_40s, count_50s,count_60s, count_70s, count_80s]

  return count_array
}

// Initializes the page with a default plot

function init() {

  all_count = countAll(nobeldata)

  x_value = ["<20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];
  y_value = all_count

  data = [{
    x: x_value,
    y: y_value,
    type: "bar",
    marker: {
      color: gold
    }
  }
];

// Set layout/theme of the plot

let layout = {
       
  title: {
      text: "Nobel Prize Winners by Age Group",
      font: {
        size: 30,
        color: gray
      },
      xref: 'paper',
      x: 0,
    },

  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
  xaxis: {
      title: {
          text: "Age",
          font: {
              size: 24,
              color: gray
          }
      },
      tickfont: {
          size: 18,
          color: gray
        },
        zeroline: true,
      zerolinecolor: gold,
      zerolinewidth: 2,
    },
    yaxis: {
      title: {
        text: "Totals",
        font: {
          size: 24,
          color: gray
        }
      },
      tickfont: {
          size: 18,
          color: gray
        },
      gridcolor: dark_gray,
      gridwidth: .02,
      zerolinecolor: gray,
      zerolinewidth: 2,
    }
};

  Plotly.newPlot("plot", data, layout);
}

// Call updatePlot() when a change takes place 

d3.selectAll("#selDataset1").on("change", updatePlot);

// This function is called when a dropdown menu item is selected
function updatePlot() {

  // Use D3 to select the dropdown menu
  
  let dropdownMenu = d3.select("#selDataset1");
  
  // Assign the value of the dropdown menu option to a variable
  
  let dataset = dropdownMenu.property("value");

  // Initialize x and y arrays

  let x = [];
  let y = [];

  if (dataset === "AllDataset") {

    all_count = countAll(nobeldata)

    x = ["<20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];
    y = all_count
  }

  else if (dataset === "MenDataset") {

    men_count = countTotals(nobeldata,"male")

    x = ["<20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];
    y = men_count;
  }

  else if (dataset === "WomenDataset") {

    women_count = countTotals(nobeldata,"female")

    x = ["<20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];
    y = women_count;
  }

  // Note the extra brackets around 'x' and 'y'

  Plotly.restyle("plot", "x", [x]);
  Plotly.restyle("plot", "y", [y]);
}

init();
