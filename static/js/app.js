// The URL for the data source
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetching data using D3 and logging it to the console
d3.json(url).then(function(data){
  console.log(data);
});

// Initialization function that populates dropdown, calls other chart functions, and initializes demographic info
function init(){
  d3.json(url).then(function(data){
    // Extracting sample names from data
    let names = Object.values(data.names);
    let dropdownMenu = d3.select("#selDataset");

    // Populating dropdown menu with sample names
    names.map((id) => dropdownMenu.append('option').text(id));
    let initialSampleId = names[0];

    // Calling chart functions with the initial sample ID
    DemographicInfo(initialSampleId, data);
    BarChart(initialSampleId, data);
    BubbleChart(initialSampleId, data);
    GaugeChart(initialSampleId, data);
  });
}

// Function to create and update the bar chart
function BarChart(sampleId, data){
  // Extracting relevant data for the selected sample
  let samplesData = Object.values(data.samples);
  let result  = samplesData.filter(item => item.id === sampleId)
  let utoId = (result[0].otu_ids);
  let samplesValues = (result[0].sample_values);
  let otuLabels = (result[0].otu_labels);

  // Creating trace and layout for the bar chart
  let trace1 = {
    y : utoId.map(item=>`UTO ${item}`).slice(0,10).reverse(),
    x : samplesValues.slice(0,10).reverse(),
    text : otuLabels.slice(0,10).reverse(),
    type : 'bar',
    orientation : 'h'
  }
  let layout1 = {
    title: "Top 10 OTUs Present",
    hovermode: "closest"
  };

  // Creating the bar chart
  Plotly.newPlot('bar', [trace1], layout1);
}

// Function to create and update the bubble chart
function BubbleChart(sampleId, data){
  // Extracting relevant data for the selected sample
  let samplesData = Object.values(data.samples);
  let result  = samplesData.filter(item => item.id === sampleId)
  let utoId = (result[0].otu_ids);
  let samplesValues = (result[0].sample_values);
  let otuLabels = (result[0].otu_labels);

  // Creating trace and layout for the bubble chart
  let trace2 = {
    x: utoId,
    y: samplesValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
      color: utoId,
      size: samplesValues,
      colorscale: "Earth"
    }
  };
  let layout2 = {
    title: "Bacteria Per Sample",
    hovermode: "closest",
    xaxis: {title: "OTU ID"},
  };

  // Creating the bubble chart
  Plotly.newPlot('bubble', [trace2], layout2);
}

// Function to display demographic information
function DemographicInfo(sampleId, data){
  let metadata = Object.values(data.metadata);
  // Filtering metadata for the selected sample
  let resultArray = metadata.filter(item => item.id == sampleId);
  let result = resultArray[0];

  // Displaying metadata in the panel with id #sample-metadata
  let metaDataPanel = d3.select("#sample-metadata");
  metaDataPanel.html("");
  // Displaying key-value pairs in the metadata
  for (key in result){
    metaDataPanel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
  };
}

// Function to create and update the gauge chart
function GaugeChart(sampleId, data){
  let metadata = Object.values(data.metadata);
  // Filtering metadata for the selected sample
  let resultArray = metadata.filter(item => item.id == sampleId);
  let result = resultArray[0];

  // Calculating gauge chart parameters based on washing frequency
  let degrees = 180 - result.wfreq *19.95,
    radius = .5;
  let radians = degrees * Math.PI / 180;
  let x = radius * Math.cos(radians);
  let y = radius * Math.sin(radians);

  // Creating path for the gauge chart
  let mainPath = 'M -.0 -0.055 L .0 0.055 L ',
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
  let path = mainPath.concat(pathX,space,pathY,pathEnd);

  // Creating trace and layout for the gauge chart
  let trace3 = [{
    type: 'scatter',
    x: [0], y:[0],
    marker: {size: 20, color:'850000'},
    showlegend: false,
    name: 'WFREQ',
    text: result.wfreq,
    hoverinfo: 'text+name'
  }, {
    type: 'pie',
    values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2','0-1', ''],
    textinfo: 'text',
    textposition:'inside',	  
    marker: {colors:['rgba(15, 128, 0, .5)',
                      'rgba(15, 128, 0, .45)', 
                      'rgba(15, 128, 0, .4)',
                      'rgba(110, 154, 22, .5)',
                      'rgba(110, 154, 22, .4)',
                      'rgba(110, 154, 22, .3)',
                      'rgba(210, 206, 145, .5)',
                      'rgba(210, 206, 145, .4)',
                      'rgba(210, 206, 145, .3)',
                      'rgba(255, 255, 255, 0)']},
    hoverinfo: 'text',
    hole: .5,
    showlegend: false
  }];

  let layout3 = {
    shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {color: '850000'}
    }],
    title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
    autosize:true,
    height: 550,
    width: 550,
    xaxis: {zeroline:false, showticklabels:false,showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,showgrid: false, range: [-1, 1]}
  };

  // Creating the gauge chart
  Plotly.newPlot('gauge', trace3, layout3);
}

// Function to handle changes in the selected sample from the dropdown
function optionChanged(newSampleId){
  d3.json(url).then(function(data){
      // Updating all charts and demographic info based on the new sample ID
      BarChart(newSampleId , data);
      BubbleChart(newSampleId, data);
      DemographicInfo(newSampleId, data);
      GaugeChart(newSampleId, data);
  });
}

// Initializing the visualizations when the page loads
init();

