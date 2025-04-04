       // wordcloud js to handle dropdown changes
       const topicsDropdown = document.getElementById('topics');
       const wordCloudImage = document.getElementById('wordCloudImage');

       topicsDropdown.addEventListener('change', function() {
           const selectedTopic = this.value; // Get the selected value
           wordCloudImage.src = selectedTopic; // Update the image source
           wordCloudImage.alt = `Word Cloud for ${selectedTopic}`;
           
       });

       // Your ApexCharts code

    // Donut Chart configuration
    const Options = {
      series: [1742, 975, 5045],
      chart: {
        width: 500,
        type: 'donut',
        dropShadow: { enabled: true, color: '#111', top: -1, left: 3, blur: 3, opacity: 0.5 }
      },
      stroke: { width: 0 },
      plotOptions: {
        pie: {
          donut: { labels: { show: true, total: { showAlways: true, show: true } } }
        }
      },
      labels: ["Positive", "Neutral", "Negative"],
      dataLabels: { dropShadow: { blur: 2, opacity: 1 } },
      fill: { type: 'pattern', opacity: 1, pattern: { enabled: true, style: ['verticalLines', 'squares', 'horizontalLines'] } },
      states: { hover: { filter: 'none' } },
      theme: { palette: 'palette2' },
      title: { text: "Sentiment Distribution" },
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }]
    };
    new ApexCharts(document.querySelector("#donut-chart"), Options).render();

    // Bar Chart sentiment
    const barOptions = {
      title: { text: 'Sentiment Distribution' },
      series: [{ data: [1742, 975, 5045] }],
      chart: { height: 350, type: 'bar' },
      colors: ['#63c74f', '#eebc42', '#9d0907'],
      plotOptions: { bar: { columnWidth: '90%', distributed: true } },
      dataLabels: { enabled: false },
      legend: { show: false },
      xaxis: { categories: ['Positive', 'Neutral', 'Negative'] },
      labels: { style: { colors: ['#63c74f', '#eebc42', '#9d0907'], fontSize: '15px' } }
    };
    new ApexCharts(document.querySelector("#bar"), barOptions).render();

        // Bar Chart aspect
        const aptOptions = {
          title: { text: 'Aspect Distribution' },
      series: [{ data: [461, 2928, 2510, 265, 1230, 368] }],
      chart: { height: 350, type: 'bar' },
      colors: ['#C6D4FF', '#E4C1F9', '#F694C1', '#EDE7B1', '#A9DEF9', '#DE541E'],
      plotOptions: { bar: { columnWidth: '80%', distributed: true } },
      dataLabels: { enabled: false },
      legend: { show: false },
      xaxis: { categories: ["Price", "Performance", "Quality", "Safety", "Comfort", "Fuel Efficiency"] },
      labels: { style: { colors: ['#C6D4FF', '#E4C1F9', '#F694C1', '#EDE7B1', '#A9DEF9', '#DE541E'], fontSize: '15px' } }
    };
    new ApexCharts(document.querySelector("#bar-chart"), aptOptions).render();

     // Stacked Bar Chart for Sales Strategy Comparison
     const compareOptions = {
      series: [
        { name: 'Positive', data: [333, 2521, 910, 120, 1102, 235] },
        { name: 'Neutral', data: [100, 278, 316, 88, 147, 81] },
        { name: 'Negative', data: [28, 129, 1284, 57, 283, 52] },

      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        dropShadow: { enabled: true, blur: 1, opacity: 0.5 }
      },
      plotOptions: { bar: { horizontal: true, barHeight: '60%' } },
      dataLabels: { enabled: false },
      stroke: { width: 2 },
      title: { text: 'Aspct Sentiment on Audi Brand' },
      xaxis: { categories: ['Price', 'Performance', 'Quality', 'Safety', 'Comfort', 'Fuel Efficiency'] },
      yaxis: { title: { text: undefined } },
      tooltip: { shared: false, y: { formatter: (val) => `${val}K` } },
      fill: { type: 'pattern', opacity: 1, pattern: { style: ['circles', 'slantedLines', 'verticalLines', 'horizontalLines'] } },
      states: { hover: { filter: 'none' } },
      legend: { position: 'right', offsetY: 40 }
    };
    new ApexCharts(document.querySelector("#sentaspect"), compareOptions).render();
      
        var options = {
  title: { text: 'Total Aspect ' },
  series: [{ data: [400, 430, 448, 470, 540] }],
  chart: { type: 'bar', height: 350 },
  plotOptions: {
    bar: { barHeight: '90%', distributed: true, horizontal: true },
  },
  colors: ['#C6D4FF', '#E4C1F9', '#F694C1', '#EDE7B1', '#A9DEF9', '#DE541E'],
  dataLabels: { enabled: true },
  xaxis: { categories: ['Performance', 'Comfort', 'Fuel Efficiency', 'Safety', 'Price'] },
};

var chart = new ApexCharts(document.querySelector("#aspect-chart"), options);
chart.render();


// total mention
var options = {
  series: [
    { name: "Positive", data: [25, 25, 20, 27, 41, 36, 25, 22] },
    { name: "Neutral", data: [15, 0, 5, 42, 0, 6, 0, 3, 0] },
    { name: "Negative", data: [11, 9, 7, 42, 7, 13, 13, 10, 9] }
  ],
  chart: { height: 350, type: 'line', zoom: { enabled: false } },
  dataLabels: { enabled: false },
  stroke: { width: [5, 7, 5], curve: 'straight', dashArray: [0, 8, 5] },
  title: { text: 'Total Mention of Sentiments for Audi (2018-2019)', align: 'left' },
  legend: { tooltipHoverFormatter: (val, opts) => `${val} - <strong>${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]}</strong>` },
  markers: { size: 0, hover: { sizeOffset: 6 } },
  xaxis: { categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] },
  tooltip: { y: [{ title: { formatter: (val) => `${val} (mins)` } }, { title: { formatter: (val) => `${val} per session` } }, { title: { formatter: (val) => val } }] },
  grid: { borderColor: '#f1f1f1' }
};

new ApexCharts(document.querySelector("#sentiment"), options).render();

// total mention
var options = {
  series: [
    { name: "Price", data: [5,0, 1, 1, 5, 4 ,0] },
    { name: "Performance", data: [7, 11, 9, 13, 20, 13, 13, 11] },
    { name: 'Quality', data: [28, 13, 10, 7, 19, 18, 8 ,6 ] },
    { name: 'Safety', data: [0,1,0,0,2,0,2,0] },
    { name: 'Comfort', data: [10, 6, 5, 8, 12, 10, 8, 14] },
    { name: 'Fuel Efficiency', data: [1, 3, 7, 5, 2, 4, 7] }
  ],
  chart: { height: 350, type: 'line', zoom: { enabled: false } },
  dataLabels: { enabled: false },
  stroke: { width: [5, 3, 5, 3, 5, 3], curve: 'straight', dashArray: [0, 8, 5, 1, 2, 3] },
  title: { text: 'Total Mention of Aspect for Audi (2018-2019)', align: 'left' },
  legend: { tooltipHoverFormatter: (val, opts) => `${val} - <strong>${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]}</strong>` },
  markers: { size: 0, hover: { sizeOffset: 6 } },
  xaxis: { categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] },
  tooltip: { y: [{ title: { formatter: (val) => `${val} (mins)` } }, { title: { formatter: (val) => `${val} per session` } }, { title: { formatter: (val) => val } }] },
  grid: { borderColor: '#f1f1f1' }
};

new ApexCharts(document.querySelector("#aspect"), options).render();


