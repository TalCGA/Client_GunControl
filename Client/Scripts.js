

var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}

var client = new HttpClient();
client.get('https://guncontrol.herokuapp.com/getAllCountries', function (response) {
    var StatesJson = JSON.parse(response)
    console.log(Object.values(simplemaps_usmap_mapdata.state_specific).length)

    //--------------------View1-----------------------
    for (i = 0; i < Object.values(simplemaps_usmap_mapdata.state_specific).length; i++) {
        var info = JSON.stringify(getObjects(StatesJson, 'state', Object.values(simplemaps_usmap_mapdata.state_specific)[i].name))
        var state = Object.values(simplemaps_usmap_mapdata.state_specific)[i]
        //state.url = "javascript:alert('You clicked the " & state.name & ")"
        if (JSON.stringify(getObjects(JSON.parse(info), 'opinion', 'Republican')).length > 2 || Array.isArray(JSON.stringify(getObjects(JSON.parse(info), 'opinion', 'Republican')))) {
            state.image_url = 'data:image/png;base64,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'
            state.description = "Republican Opinion"
            if (JSON.stringify(getObjects(JSON.parse(info), 'tweet_sentiment', 'for')).length > 2 || Array.isArray(JSON.stringify(getObjects(JSON.parse(info), 'tweet_sentiment', 'for')))) {
                state.border_color = '#33cc33'
            }
            else if (JSON.stringify(getObjects(JSON.parse(info), 'tweet_sentiment', 'against')).length > 2 || Array.isArray(JSON.stringify(getObjects(JSON.parse(info), 'tweet_sentiment', 'against')))) {
                state.border_color = '#ff0000'
            }

        }

        else if (JSON.stringify(getObjects(JSON.parse(info), 'opinion', 'Democratic')).length > 2 || Array.isArray(JSON.stringify(getObjects(JSON.parse(info), 'opinion', 'Democratic')))) {
            state.image_url = 'https://d1qhuz9ahqnrhh.cloudfront.net/wp-content/uploads/2011/10/2000px-DemocraticLogo.svg_-300x293.png'
            state.description = "Democrate Opinion"
            if (JSON.stringify(getObjects(JSON.parse(info), 'tweet_sentiment', 'for')).length > 2 || Array.isArray(JSON.stringify(getObjects(JSON.parse(info), 'tweet_sentiment', 'for')))) {
                state.border_color = '#33cc33'
            }
            else if (JSON.stringify(getObjects(JSON.parse(info), 'tweet_sentiment', 'against')).length > 2 || Array.isArray(JSON.stringify(getObjects(JSON.parse(info), 'tweet_sentiment', 'against')))) {
                state.border_color = '#ff0000'
            }

        }
        else {
            //state.image_url = 'https://static.thenounproject.com/png/1439126-200.png'
            state.description = "Neither Opinion"
            if (JSON.stringify(getObjects(JSON.parse(info), 'tweet_sentiment', 'for')).length > 2 || Array.isArray(JSON.stringify(getObjects(JSON.parse(info), 'tweet_sentiment', 'for')))) {
                state.border_color = '#33cc33'

            }
            else if (JSON.stringify(getObjects(JSON.parse(info), 'tweet_sentiment', 'against')).length > 2 || Array.isArray(JSON.stringify(getObjects(JSON.parse(info), 'tweet_sentiment', 'against')))) {
                state.border_color = '#ff0000'
            }
        }
    }
});




client.get('https://gunscontrol.herokuapp.com/view2', function (response) {
    var View2Json = JSON.parse(response)
    //--------------------View2-----------------------    
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart1 = am4core.create("chartdivBar1", am4charts.XYChart);

    // Add data
    chart1.data = [{
        "opinion": "Against",
        "tweets": View2Json[0].negative_democrates
    }];

    // Create axes

    var categoryAxis1 = chart1.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis1.dataFields.category = "opinion";
    categoryAxis1.renderer.grid.template.location = 0;
    categoryAxis1.renderer.minGridDistance = 30;

    categoryAxis1.renderer.labels.template.adapter.add("dy", function (dy, target) {
        if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy + 25;
        }
        return dy;
    });

    var valueAxis1 = chart1.yAxes.push(new am4charts.ValueAxis());
    valueAxis1.max = 4000; 
    valueAxis1.min = 500; 


    // Create series
    var series1 = chart1.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = "tweets";
    series1.dataFields.categoryX = "opinion";
    series1.name = "Tweets";
    series1.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series1.columns.template.fillOpacity = .8;

    var columnTemplate1 = series1.columns.template;
    columnTemplate1.strokeWidth = 2;
    columnTemplate1.strokeOpacity = 1;

    //------SecondBarChart-----------
    //am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart2 = am4core.create("chartdivBar2", am4charts.XYChart);

    // Add data
    chart2.data = [{
        "opinion": "Against",
        "tweets": View2Json[0].negative_republicans
    }];

    // Create axes

    var categoryAxis2 = chart2.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis2.dataFields.category = "opinion";
    categoryAxis2.renderer.grid.template.location = 0;
    categoryAxis2.renderer.minGridDistance = 30;


    categoryAxis2.renderer.labels.template.adapter.add("dy", function (dy, target) {
        if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy + 25;
        }
        return dy;
    });

    var valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.max = 4000; 
    valueAxis2.min = 500; 

    // Create series
    var series2 = chart2.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "tweets";
    series2.dataFields.categoryX = "opinion";
    series2.name = "Tweets";
    series2.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series2.columns.template.fillOpacity = .8;

    var columnTemplate2 = series2.columns.template;
    columnTemplate2.strokeWidth = 2;
    columnTemplate2.strokeOpacity = 1;

    //removing the comma from the milions
    var str1 = View2Json[0].total_democrats
    str1 = str1.replace(/,/g, "");
    var str2 = View2Json[0].total_republicans
    str2 = str2.replace(/,/g, "");

    var ratio1 = (parseInt(str1, 10) / (parseInt(View2Json[0].negative_democrates, 10)) / 100).toFixed(3)
    var ratio2 = (parseInt(str2, 10) / (parseInt(View2Json[0].negative_republicans, 10)) / 100).toFixed(3)
    document.getElementById("popu_democ").innerHTML = "Population: " + View2Json[0].total_democrats;
    document.getElementById("popu_repub").innerHTML = "Population: " + View2Json[0].total_republicans;
    document.getElementById("prec_democ").innerHTML = "Ratio: " + ratio1 + " population/against tweets"
    document.getElementById("prec_repub").innerHTML = "Ratio: " + ratio2 + " population/against tweets"
});

//--------------------View3-----------------------    

client.get('https://gunscontrol.herokuapp.com/view3', function (response) {
    var View3Json = JSON.parse(response)
    //// Themes begin
    am4core.useTheme(am4themes_animated);
    //// Themes end

    // Create chart instance
    var chartPie1 = am4core.create("chartdivPie1", am4charts.PieChart);

    // Add data
    chartPie1.data = [{
        "Opinion": "Against",
        "Number of Tweets": View3Json[0].against
    }, {
        "Opinion": "Pro",
        "Number of Tweets": View3Json[0].positive
    }, {
        "Opinion": "Neutral",
        "Number of Tweets": View3Json[0].neutral
    }];

    // Add and configure Series
    var pieSeries1 = chartPie1.series.push(new am4charts.PieSeries());
    pieSeries1.dataFields.value = "Number of Tweets";
    pieSeries1.dataFields.category = "Opinion";
    pieSeries1.slices.template.stroke = am4core.color("#fff");
    pieSeries1.slices.template.strokeWidth = 2;
    pieSeries1.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries1.hiddenState.properties.opacity = 1;
    pieSeries1.hiddenState.properties.endAngle = -90;
    pieSeries1.hiddenState.properties.startAngle = -90;

    //----------------second Pie
    //// Themes begin
    //am4core.useTheme(am4themes_animated);
    //// Themes end

    // Create chart instance
    var chartPie2 = am4core.create("chartdivPie2", am4charts.PieChart);

    // Add data
    chartPie2.data = [{
        "Opinion": "Against",
        "Number of Tweets": View3Json[1].against
    }, {
        "Opinion": "Pro",
        "Number of Tweets": View3Json[1].positive
    }, {
        "Opinion": "Neutral",
        "Number of Tweets": View3Json[1].neutral
    }];

    // Add and configure Series
    var pieSeries2 = chartPie2.series.push(new am4charts.PieSeries());
    pieSeries2.dataFields.value = "Number of Tweets";
    pieSeries2.dataFields.category = "Opinion";
    pieSeries2.slices.template.stroke = am4core.color("#fff");
    pieSeries2.slices.template.strokeWidth = 2;
    pieSeries2.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries2.hiddenState.properties.opacity = 1;
    pieSeries2.hiddenState.properties.endAngle = -90;
    pieSeries2.hiddenState.properties.startAngle = -90;

    //----------------third Pie
    //// Themes begin
    //am4core.useTheme(am4themes_animated);
    //// Themes end

    // Create chart instance
    var chartPie3 = am4core.create("chartdivPie3", am4charts.PieChart);

    // Add data
    chartPie3.data = [{
        "Opinion": "Against",
        "Number of Tweets": View3Json[2].against
    }, {
        "Opinion": "Pro",
        "Number of Tweets": View3Json[2].positive
    }, {
        "Opinion": "Neutral",
        "Number of Tweets": View3Json[2].neutral
    }];

    // Add and configure Series
    var pieSeries3 = chartPie3.series.push(new am4charts.PieSeries());
    pieSeries3.dataFields.value = "Number of Tweets";
    pieSeries3.dataFields.category = "Opinion";
    pieSeries3.slices.template.stroke = am4core.color("#fff");
    pieSeries3.slices.template.strokeWidth = 2;
    pieSeries3.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries3.hiddenState.properties.opacity = 1;
    pieSeries3.hiddenState.properties.endAngle = -90;
    pieSeries3.hiddenState.properties.startAngle = -90;



    //Add state names
    document.getElementById("pie1").innerHTML = View3Json[0].country 
    document.getElementById("pie2").innerHTML = View3Json[1].country  
    document.getElementById("pie3").innerHTML = View3Json[2].country 

    });

    
    //});


////return an array of objects according to key, value, or key and value matching
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i == key && obj[i] == val || i == key && val == '') { //
                objects.push(obj);
            } else if (obj[i] == val && key == '') {
                //only add if the object is not already in the array
                if (objects.lastIndexOf(obj) == -1) {
                    objects.push(obj);
                }
            }
    }
    return objects;
}
