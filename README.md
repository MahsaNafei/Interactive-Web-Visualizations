## Interactive Web Visualizations

### Overview

This repository serves as a platform for creating interactive web visualizations using D3.js and Plotly. The visualizations include bar charts, bubble charts, demographic information display, and a gauge chart. The data is dynamically fetched from an external source using D3.json().

### Code Structure

#### `index.html`

- The `index.html` file is the main HTML document that defines the structure of the web page. It contains placeholders for charts, dropdowns, and demographic information.
- [html link](https://github.com/MahsaNafei/belly-button-challenge/blob/main/index.html)


#### `app.js`

- The `app.js` file is the primary JavaScript script responsible for fetching and processing data, as well as creating and updating visualizations. It utilizes the D3.js library for data loading and manipulation.
- The file contains functions such as `BarChart`, `BubbleChart`, `DemographicInfo`, `GaugeChart`, `init`, and `optionChanged` to handle different aspects of data visualization and user interaction.
- [Javascript Code](https://github.com/MahsaNafei/belly-button-challenge/blob/main/static/js/app.js)

#### Visualizations

##### Bar Chart (`BarChart` function)

- The `BarChart` function is responsible for displaying the top 10 Operational Taxonomic Units (OTUs) present for a selected sample.
- Utilizes the Plotly library to create an interactive horizontal bar chart.
- Extracts data such as OTU IDs, sample values, and OTU labels to generate the chart.

##### Bubble Chart (`BubbleChart` function)

- The `BubbleChart` function represents the distribution of bacteria per sample for a selected individual.
- Utilizes Plotly to create an interactive bubble chart, where markers represent OTUs.
- Extracts data, including OTU IDs, sample values, and OTU labels, to generate the chart.

##### Demographic Information (`DemographicInfo` function)

- The `DemographicInfo` function is responsible for displaying demographic information for a selected sample.
- Utilizes D3.js to dynamically update the HTML with key-value pairs extracted from the metadata.

##### Gauge Chart (`GaugeChart` function)

- The `GaugeChart` function represents the washing frequency (scrubs per week) for a selected individual.
- Utilizes Plotly to create a gauge chart with a needle indicating the washing frequency.
- Extracts washing frequency data from metadata to generate the chart.
- [Bonus Hint: View Gauge Chart Code on CodePen](https://codepen.io/ascotto/pen/eGNaqe?editors=0011)

##### Dropdown and Initialization (`init` and `optionChanged` functions)

- The `init` function initializes the dropdown menu with sample names and calls other functions to populate visualizations and demographic information based on the selected sample.
- The `optionChanged` function is triggered when the user selects a different sample from the dropdown. It fetches and updates the visualizations accordingly.

[Dashboard Link](https://MahsaNafei.github.io/belly-button-challenge/)
<img src="https://github.com/MahsaNafei/belly-button-challenge/blob/main/images/page_screenshot.png" style="widt:500px; height:500px">


### Data Source

- Data is dynamically fetched from an external JSON file using D3.json().
- The provided URL points to the `samples.json` file, which contains the necessary data for generating the visualizations.
- [Samples JSON file](https://github.com/MahsaNafei/belly-button-challenge/blob/main/samples.json)


### Instructions

1. Open the `index.html` file in a web browser.
2. Ensure an internet connection to fetch data from the provided JSON file.
3. Interact with the dropdown menu to explore different samples and view corresponding visualizations.

