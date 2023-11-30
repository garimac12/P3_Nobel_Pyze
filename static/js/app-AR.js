// Extract the array that contains the nobel data from the js file

let NobelData = nobeldata[0].LaureatesAndAwards

console.log("NobelData", NobelData)

// Colors

let gray = "#A6A6A6"
let dark_gray = "#5C5C5C"

let gold = "#FFD700"
let blue = "#0080FF"


// --- Print statements to see our data 

// Get the length of the first/only element

console.log("length of array:", NobelData.length)

// Get the first element in array 
// This is one laureate

console.log("First laureate:", NobelData[0])

// Get the second element in the embedded array
// This is another laureate

console.log("Second laureate:", NobelData[1])

// Get the gender of second element in the embedded array

console.log("Gender of second laureate:", NobelData[1].Gender)

// ---

// Filter the data

let MenLaureatesData = NobelData.filter((x) => x.Gender == "male")
console.log("Men laureates:", MenLaureatesData)

let WomenLaureatesData = NobelData.filter((x) => x.Gender == "female")
console.log("Women laureates:", WomenLaureatesData)



// Function to count all totals per age group

function CountAllPrizes(data) {

  count_teens = 0;
  count_20s = 0;
  count_30s = 0;
  count_40s = 0;
  count_50s = 0;
  count_60s = 0;
  count_70s = 0;
  count_80s = 0;

  for (let i = 0; i < data.length; i++) {

    row = data[i]

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

    if (row.Age_When_Awarded > 80) {
      count_80s += 1
    }
  }

  all_count = [count_teens, count_20s, count_30s, count_40s, count_50s, count_60s, count_70s, count_80s]
  
  return all_count
}

//menArray = CountAllPrizes(MenLaureatesData)
//womenArray = CountAllPrizes(WomenLaureatesData)

//console.log("menArray", menArray)
//console.log("womenArray", womenArray)

// Function to count totals of a specific prize per age group

function CountEachPrize(data, prize) {
  
  FilteredData = data.filter((x) => x.Category == prize)
  
  count_teens = 0;
  count_20s = 0;
  count_30s = 0;
  count_40s = 0;
  count_50s = 0;
  count_60s = 0;
  count_70s = 0;
  count_80s = 0;

  for (let i = 0; i < FilteredData.length; i++) {

    row = FilteredData[i]
    
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

    if (row.Age_When_Awarded > 70) {
      count_70s += 1
    }
  }

  count_array = [count_teens, count_20s, count_30s, count_40s, count_50s,count_60s,count_70s, count_80s]

  return count_array
}

// Initializes the page with a default plot

function init() {
  
  men_array = CountAllPrizes(MenLaureatesData)
  women_array = CountAllPrizes(WomenLaureatesData)

  x_value = ["<20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79","80+"];

  let trace1 = {
    x: x_value,
    y: men_array,
    name: "Men",
    type: "bar",
    marker: {
      color: blue
    },
    hovertemplate: "<b>Men</b><br>"+ "Total: %{y}" +
    "<br>Age range: %{x}<extra></extra>"
  };

  let trace2 = {
    x: x_value,
    y: women_array,
    name: "Women",
    type: "bar",
   marker: {
      color: gold
    },
    hovertemplate: "<b>Women</b><br>"+ "Total: %{y}" +
    "<br>Age range: %{x}<extra></extra>"
  }

  let data = [trace1, trace2]

// Set layout/theme of the plot

  let layout = {
    hovermode:'closest',
    hoverlabel: {namelength: -1, font: {color: 'black'}},
    barmode: "group",
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
    },
    legend: {
      x: 1,
      y: 1,
      traceorder: 'normal',
      font: {
        size: 25,
        color: gray
      },
      bgcolor: "rgba(0,0,0,0)",
      bordercolor: "#rgba(0,0,0,0)",
      borderwidth: 2
    }
};

  Plotly.newPlot("plot", data, layout);
}

// Call updatePlot() when a change takes place 

d3.selectAll("#selDataset").on("change", updatePlot);

// This function is called when a dropdown menu item is selected
function updatePlot() {

  // Use D3 to select the dropdown menu
  
  let dropdownMenu = d3.select("#selDataset");
  
  // Assign the value of the dropdown menu option to a variable
  
  let dataset = dropdownMenu.property("value");

  let x = [];
  let y1 = [];
  let y2 = [];
  
  

  if (dataset === "AllPrizeDataset") {

    men_array = CountAllPrizes(MenLaureatesData)
    women_array = CountAllPrizes(WomenLaureatesData)
    x = ["<20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];

    y1 = men_array
    y2 = women_array

    console.log("All selected for mew", men_array)
    console.log("All selected for women", women_array)

    let trace1 = {
      x: x,
      y: y1,
      name: "Men",
      type: "bar"
    };

    let trace2 = {
      x: x,
      y: y2,
      name: "Women",
      type: "bar"
    }
    
    data = [trace1, trace2]

  }

  else if (dataset === "ChemistryDataset") {

    men_array = CountEachPrize(MenLaureatesData, "Chemistry")
    women_array = CountEachPrize(WomenLaureatesData, "Chemistry")
    x = ["<20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];

    y1 = men_array
    y2 = women_array

    console.log("Chemistry selected for men", y1)
    console.log("Chemistry selected for women", y2)

    let trace1 = {
      x: x,
      y: y1,
      name: "Men",
      type: "bar"
    };

    let trace2 = {
      x: x,
      y: y2,
      name: "Women",
      type: "bar"
    }
    
    data = [trace1, trace2]

  }

  else if (dataset === "EconomicDataset") {

    men_array = CountEachPrize(MenLaureatesData, "Economic Sciences")
    women_array = CountEachPrize(WomenLaureatesData, "Economic Sciences")
    x = ["<20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];

    y1 = men_array
    y2 = women_array

    console.log("Economic Sciences selected for men", y1)
    console.log("Economics Sciences selected for women", y2)

    let trace1 = {
      x: x,
      y: y1,
      name: "Men",
      type: "bar"
    };

    let trace2 = {
      x: x,
      y: y2,
      name: "Women",
      type: "bar"
    }
    
    data = [trace1, trace2]

  }

  else if (dataset === "LiteratureDataset") {

    men_array = CountEachPrize(MenLaureatesData, "Literature")
    women_array = CountEachPrize(WomenLaureatesData, "Literature")
    x = ["<20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];

    y1 = men_array
    y2 = women_array

    console.log("Literature selected for men", y1)
    console.log("Literature selected for women", y2)

    let trace1 = {
      x: x,
      y: y1,
      name: "Men",
      type: "bar"
    };

    let trace2 = {
      x: x,
      y: y2,
      name: "Women",
      type: "bar"
    }
    
    data = [trace1, trace2]

  }

  else if (dataset === "MedicineDataset") {

    men_array = CountEachPrize(MenLaureatesData, "Physiology or Medicine")
    women_array = CountEachPrize(WomenLaureatesData, "Physiology or Medicine")
    x = ["<20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];

    y1 = men_array
    y2 = women_array

    console.log("Medicine selected for men", y1)
    console.log("Medicine selected for women", y2)

    let trace1 = {
      x: x,
      y: y1,
      name: "Men",
      type: "bar"
    };

    let trace2 = {
      x: x,
      y: y2,
      name: "Women",
      type: "bar"
    }
    
    data = [trace1, trace2]

  }

  else if (dataset === "PeaceDataset") {

    men_array = CountEachPrize(MenLaureatesData, "Peace")
    women_array = CountEachPrize(WomenLaureatesData, "Peace")
    x = ["<20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];

    y1 = men_array
    y2 = women_array

    console.log("Peace selected for men", y1)
    console.log("Peace selected for women", y2)

    let trace1 = {
      x: x,
      y: y1,
      name: "Men",
      type: "bar"
    };

    let trace2 = {
      x: x,
      y: y2,
      name: "Women",
      type: "bar"
    }
    
    data = [trace1, trace2]

  }


  else if (dataset === "PhysicsDataset") {

    men_array = CountEachPrize(MenLaureatesData, "Physics")
    women_array = CountEachPrize(WomenLaureatesData, "Physics")
    x = ["<20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];

    y1 = men_array
    y2 = women_array

    console.log("Physics selected for men", y1)
    console.log("Physics selected for women", y2)

    let trace1 = {
      x: x,
      y: y1,
      name: "Men",
      type: "bar"
    };

    let trace2 = {
      x: x,
      y: y2,
      name: "Women",
      type: "bar"
    }
    
    data = [trace1, trace2]

  }

  // Method 1
  //Plotly.restyle("plot", "x", [x]);
  //Plotly.restyle("plot", "y", [[y1], [y2]], [0,1])
  
  // Method 2
  //Plotly.restyle("plot", "x", [x]);
  //Plotly.restyle("plot", "y1", y1);
  //Plotly.restyle("plot", "y2", y2);

  // Method 3
  Plotly.restyle("plot", "x", [x]);
  Plotly.restyle("plot", {"y": [y1, y2]});

  //Plotly.restyle("plot", "data", [data]);
}

init();
