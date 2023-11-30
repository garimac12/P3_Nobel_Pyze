// Matching Layout to Angel's Style
let layout = {
  title: {
    text: "Laureates by Gender by Year",
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
      text: "Year",
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
      text: "Laureates",
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
  height: 500
};

// Created arrays for award years
let awardYear = LaureatesAndAwards.map(x => x.Award_year);
console.log(awardYear);

// Created arrays by filtering male and female winners
let maleWinners = LaureatesAndAwards.filter((x) => x.Gender == "male");
console.log(maleWinners.length);
let femaleWinners = LaureatesAndAwards.filter((x) => x.Gender == "female");
console.log(femaleWinners.length);
let nullWinners = LaureatesAndAwards.filter((x) => x.Gender == "null");

// Defining empty Objects for Male and Female winners
let StatsDictMale = {}
let StatsDictFemale = {}

// Looping through the array for male winners counts every year
for (let i = 0; i < awardYear.length; i++) {
  currYear = awardYear[i]
  countMale = 0;

  for (let i = 0; i < maleWinners.length; i++) {

    if (maleWinners[i].Award_year == currYear) {
      // Increment by one
      countMale += 1;
    }

  }
  StatsDictMale[currYear] = countMale;
}
console.log("Hello");
console.log(StatsDictMale);
console.log("bell");

// Looping through the array for female winners counts every year
for (let i = 0; i < awardYear.length; i++) {
  currYear = awardYear[i]
  countFemale = 0;

  for (let i = 0; i < femaleWinners.length; i++) {

    if (femaleWinners[i].Award_year == currYear) {
      // Increment by one
      countFemale += 1;
    }

  }
  StatsDictFemale[currYear] = countFemale;
}

console.log("Helloo");
console.log(StatsDictFemale);
console.log("bello");

// Creating a function for splitting single key value to multiple key values for mapping
const splitKeyValue = obj => {
  const keys = Object.keys(obj);
  const res = [];
  for (let i = 0; i < keys.length; i++) {
    res.push({
      'awardYear': keys[i],
      'win_count': obj[keys[i]]
    });
  };
  return res;
};

// Converting StatsDictMale dictionary to an array of list of dictionaries
let StatsArrayMale = splitKeyValue(StatsDictMale);

// Coverting StatsDictFemale dictionary to an array of list of dictionaries
let StatsArrayFemale = splitKeyValue(StatsDictFemale);

console.log("umbrella1");
console.log(StatsArrayFemale);
console.log("umbrella");
console.log(StatsArrayFemale);
console.log("final-happy");

// Extracting award year from array
let awardyear = StatsArrayMale.map(item => item.awardYear);
console.log(awardyear);
console.log("final-happy2");

// Extracting win_count from StatsDictMale array
let winCountM = StatsArrayMale.map(item => item.win_count);
console.log(winCountM);
console.log("final-happy4");

// Extracting win_count from StatsDictFemale array
let winCountF = StatsArrayFemale.map(item => item.win_count);
console.log(winCountF);
console.log("umbrella3");

// Looping through the array for male winners cumulative counts by year
const cumulativeSumM = (sum => value => sum += value)(0);
let cumulativesumM = winCountM.map(cumulativeSumM);

console.log(cumulativesumM);
console.log("umbrella8");

// Looping through the array for female winners cumulative counts by year
const cumulativeSumF = (sum => value => sum += value)(0);
let cumulativesumF = winCountF.map(cumulativeSumF);

console.log(cumulativesumF);
console.log("umbrella9");

function init() {
  // Trace1 for the male winners Data
  let trace1 = {
    x: awardyear,
    y: cumulativesumM,
    name: "Men",
    type: "bar"
  };

  // Trace 2 
  let trace2 = {
    x: awardyear,
    y: cumulativesumF,
    name: "Women",
    type: "bar"
  };

  // Create data array
  let dataWinners = [trace1, trace2];

  // Apply layout
  let layout2 = {
    title: "Laureates by Gender by Year",
    margin: {
      l: 50,
      r: 50,
      b: 200,
      t: 50,
      pad: 4
    },
    height: 500,
    legend: {
      font: {
        size: 24,
        color: '#A6A6A6'
      }
    }
  };

  // Render the plot to the div tag with id "plot3"
  Plotly.newPlot("plot3", dataWinners, layout);
}

function updateplot(charttype) {
  // Trace1 for the male winners Data
  let trace1 = {
    x: awardyear,
    y: cumulativesumM,
    name: "Men",
    type: charttype
  };

  // Trace 2 
  let trace2 = {
    x: awardyear,
    y: cumulativesumF,
    name: "Women",
    type: charttype
  };

  // Create data array
  let dataWinners = [trace1, trace2];

  // Apply layout
  let updatedLayout = {
    title: {
      text: "Laureates by Gender by Year",
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
        text: "Year",
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
        text: "Laureates",
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
    margin: {
      l: 80,
      r: 50,
      b: 200,
      t: 50,
      pad: 4
    },
    height: 500,
    legend: {
      font: {
        size: 24,
        color: '#A6A6A6'
      }
    }
  };

  // Render the plot to the div tag with id "plot3"
  Plotly.newPlot("plot3", dataWinners, updatedLayout);
}

init();
