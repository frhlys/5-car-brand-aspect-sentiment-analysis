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
  series: [ 4040, 648,  1158], // Positive, Neutral, Negative (from overallSentiment)
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
  fill: { type: 'pattern', opacity: 1, pattern: { enabled: true, style: ['circles', 'horizontalLines', 'slantedLines'] } },
  states: { hover: { filter: 'none' } },
  theme: { palette: 'pattern' },
  title: { text: "INFINITI Sentiment Distribution" },
  responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }]
};
new ApexCharts(document.querySelector("#donut-chart"), Options).render();

// Bar Chart sentiment
const barOptions = {
  title: { text: 'Overall Sentiment Distribution of INFINITI Brand' },
  series: [{ data: [5296, 1765, 1016] }], // Positive, Neutral, Negative (from overallSentiment)
  chart: { height: 350, type: 'bar' },
  colors: ['#3E7B27', '#E5D0AC', '#8E1616'],
  plotOptions: { bar: { columnWidth: '90%', distributed: true } },
  dataLabels: { enabled: false },
  legend: { show: false },
  xaxis: { categories: ['Positive', 'Neutral', 'Negative'] },
  labels: { style: { fontSize: '15px' } }
};
new ApexCharts(document.querySelector("#bar"), barOptions).render();

// Bar Chart aspect
const aptOptions = {
  title: { text: 'Overall Aspect Distribution of INFINITI Brand' },
  series: [{ data: [980, 2323, 1253, 439, 2391, 691] }], // Price, Performance, Quality, Safety, Comfort, Fuel Efficiency (from aspectTotals)
  chart: { height: 350, type: 'bar' },
  colors: ['#5bc0eb', '#fde74c', '#9bc53d', '#e55934', '#fa7921', '#8D89A6'],
  plotOptions: { bar: { columnWidth: '80%', distributed: true } },
  dataLabels: { enabled: false },
  legend: { show: false },
  xaxis: { categories: ["Price", "Performance", "Quality", "Safety", "Comfort", "Fuel Efficiency"] },
  labels: { style: { colors: ['#BFACAA', '#02020A', '#F694C1', '#05204A', '#B497D6', '#8D89A6'], fontSize: '15px' } }
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
  title: { text: 'Distribution of INFINITI Brand Aspect Sentiment' },
  xaxis: { categories: ['Price', 'Performance', 'Quality', 'Safety', 'Comfort', 'Fuel Efficiency'] },
  yaxis: { title: { text: '' } },
  tooltip: { shared: false, y: { formatter: (val) => `${val}K` } },

  states: { hover: { filter: 'none' } },
  legend: { position: 'right', offsetY: 40 },
  colors: ['#3E7B27', '#E5D0AC', '#8E1616']
};
new ApexCharts(document.querySelector("#sentaspect"), compareOptions).render();

// Total Aspect Mention Chart
var options = {
  series: [34, 64, 23, 65, 34, 86], // Increased values
  chart: {
    height: 370,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: '40%',
        background: 'transparent',
        image: undefined,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: false,
        }
      },
      barLabels: {
        enabled: true,
        useSeriesColors: true,
        offsetX: -8,
        fontSize: '16px',
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
        },
      },
    }
  },
  colors: ['#04151F', '#183A37', '#23022E', '#C44900', '#432534', '#e74c3c'],
  labels: ['Price', 'Performance', 'Quality', 'Safety', 'Comfort', 'Fuel Efficiency'],
  title: { text: 'Total Mention of Sentiments for INFINITI (2022-2025)', align: 'left' },
  responsive: [{
    breakpoint: 480,
    options: {
      legend: {
        show: false
      }
    }
  }]
};

var chart = new ApexCharts(document.querySelector("#aspect-chart"), options);
chart.render();


// Total Mention of Sentiments for INFINITI 
const sentimentOptions = {
  series: [
    { name: "Positive", data: [33, 63, 114, 27] },
    { name: "Neutral", data: [8, 11, 18, 2] },
    { name: "Negative", data: [0, 7, 9, 1] }
  ],
  chart: { height: 350, type: 'line', zoom: { enabled: false } },
  dataLabels: { enabled: false },
  stroke: { width: [5, 7, 5], curve: 'straight', dashArray: [0, 8, 5] },
  title: { text: 'Total Mention of Sentiments for INFINITI (2022-2025)', align: 'left' },
  legend: { tooltipHoverFormatter: (val, opts) => `${val} - <strong>${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]}</strong>` },
  markers: { size: 0, hover: { sizeOffset: 6 } },
  xaxis: { categories: ['2022', '2023', '2024', '2025']  },
  tooltip: { y: [{ title: { formatter: (val) => `${val}` } }, { title: { formatter: (val) => `${val}` } }, { title: { formatter: (val) => val } }] },
  grid: { borderColor: '#f1f1f1' },
    // Adding line colors here
    colors: ['#1B2845', '#335C81', '#5899E2']
};
new ApexCharts(document.querySelector("#sentiment"), sentimentOptions).render();

// Total Mention of Aspect for INFINITI
const aspectMentionOptions = {
  series: [
    { name: "Price", data: [5, 23, 34, 2] },
    { name: "Performance", data: [31, 56, 75, 13] },
    { name: 'Quality', data: [10, 12, 6, 7] },
    { name: 'Safety', data: [9, 19, 57, 0] },
    { name: 'Comfort', data: [10, 6, 5, 8] },
    { name: 'Fuel Efficiency', data: [15, 15, 24, 5] }
  ],
  chart: { height: 350, type: 'line', zoom: { enabled: false } },
  dataLabels: { enabled: false },
  stroke: { width: [5, 5, 3, 3, 5, 5], curve: 'straight', dashArray: [0, 1, 2, 4, 3, 2] },
  title: { text: 'Total Mention of Aspect for INFINITI (2022-2024)', align: 'left' },
  legend: { tooltipHoverFormatter: (val, opts) => `${val} - <strong>${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]}</strong>` },
  markers: { size: 0, hover: { sizeOffset: 6 } },
  xaxis: { categories: ['2022', '2023', '2024', '2025'] },
  tooltip: { y: [{ title: { formatter: (val) => `${val} ` } }, { title: { formatter: (val) => `${val}` } }, { title: { formatter: (val) => val } }] },
  grid: { borderColor: '#f1f1f1' },
  // Adding line colors here
  colors: ['#06AED5', '#086788', '#F0C808', '#DD1C1A', '#51344D', '#36558F']
};

new ApexCharts(document.querySelector("#aspect"), aspectMentionOptions).render();
