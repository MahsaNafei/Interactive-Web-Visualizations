const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

d3.json(url).then(function(data){
  console.log(data);
});


function init(){
  d3.json(url).then(function(data){

    let names = Object.values(data.names);
    let dropdownMenu = d3.select("#selDataset")
    names.map((id) => dropdownMenu.append('option').text(id));
    let initialSampleId = names[0];

    GetMetaData(initialSampleId)
    GetSampleData(initialSampleId)
    DemographicInfo(initialSampleId);
    BarChart(initialSampleId);
    BubbleChart(initialSampleId);
    GaugeChart(initialSampleId);

  });
}

function GetSampleData(sample){
  d3.json(url).then(function(data){
    let samplesData =data.samples;
    let resultSampleData  = samplesData.filter(item => item.id == sample);
    console.log('from sample result' ,resultSampleData);
    return (resultSampleData);
})}
function GetMetaData(sample){
  d3.json(url).then(function(data){
    let metadata = data.metadata;
    let resultMetaData = metadata.filter(item => item.id == sample);
    console.log('from metadata result' ,resultMetaData);
    return (resultMetaData);
})}


function BarChart(sampleId){
  // d3.json(url).then(function(data){

  //   let samplesData =Object.values(data.samples);
    let result  = GetSampleData(sampleId)
    console.log('bar chart result',result)
    let utoId = (result[0].otu_ids);
    let samplesValues = (result[0].sample_values);
    let otuLabels = (result[0].otu_labels);


    let trace1 = {
        y : utoId.map(item=>`UTO ${item}`).slice(0,10).reverse(),
        x : samplesValues.slice(0,10).reverse(),
        text : otuLabels.slice(0,10).reverse(),
        type : 'bar',
        orientation : 'h'
    }
    let layout1 = {
        title: "Top 10 OTUs Present",
        hovermode: "closest"};

    Plotly.newPlot('bar', [trace1],layout1);
}


function BubbleChart(sampleId){
  d3.json(url).then(function(data){
      let samplesData =Object.values(data.samples);

      let result  = samplesData.filter(item => item.id === sampleId)
      let utoId = (result[0].otu_ids);
      let samplesValues = (result[0].sample_values);
      let otuLabels = (result[0].otu_labels);
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

      Plotly.newPlot('bubble', [trace2],layout2);
})}




function DemographicInfo(sampleId){
  d3.json(url).then(function(data){

        let metadata = Object.values(data.metadata);
        // Filter the data for the object with the desired sample number
        let resultArray = metadata.filter(item => item.id == sampleId);
        let result = resultArray[0];

        // Use d3 to select the panel with id of #sample-metadata
        let metaDataPanel = d3.select("#sample-metadata");
        // Use `.html("") to clear any existing metadata
        metaDataPanel.html("");
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        for (key in result){
          metaDataPanel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };

});
}


function GaugeChart(sampleId){
  d3.json(url).then(function(data){

    let metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    let resultArray = metadata.filter(item => item.id == sampleId);
    let result = resultArray[0];

    let degrees = 180 - result.wfreq *19.95,
	  radius = .5;
    let radians = degrees * Math.PI / 180;
    let x = radius * Math.cos(radians);
    let y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    let mainPath = 'M -.0 -0.055 L .0 0.055 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
    let path = mainPath.concat(pathX,space,pathY,pathEnd);


    let trace3 = [{ type: 'scatter',
                  x: [0], y:[0],
                  marker: {size: 20, color:'850000'},
                  showlegend: false,
                  name: 'WFREQ',
                  text: result.wfreq,
                  hoverinfo: 'text+name'},


                  { type: 'pie',
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

  Plotly.newPlot('gauge', trace3, layout3);
})}


function optionChanged(newSampleId){
  GetSampleData(newSampleId);
  GetMetaData(newSampleId);
  BarChart(newSampleId);
  BubbleChart(newSampleId);
  DemographicInfo(newSampleId);
  GaugeChart(newSampleId);
}


init();
