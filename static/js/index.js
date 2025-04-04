// wordcloud js to handle dropdown changes
  const topicsDropdown = document.getElementById('topics');
  const wordCloudImage = document.getElementById('wordCloudImage');

  topicsDropdown.addEventListener('change', function() {
  const selectedTopic = this.value; // Get the selected value
  wordCloudImage.src = selectedTopic; // Update the image source
  wordCloudImage.alt = `Word Cloud for ${selectedTopic}`;
           
  });


// Fetch the single JSON file
fetch('/static/json/index.json')  // Adjust the path if necessary
  .then(response => response.json())
  .then(data => {
    // 1. Pie Chart - Sentiment Distribution
    const pieOptions = {
      chart: { type: 'pie', width: 550 },
      series: [data.sentiment["1.0"], data.sentiment["0.0"], data.sentiment["-1.0"]],
      labels: ['Positive', 'Neutral', 'Negative'],
      title: { text: 'Sentiment Distribution' },
      colors: ['#59CD90', '#FAC05E', '#720E07']
    };
    new ApexCharts(document.querySelector('#sentiment-pie'), pieOptions).render();

    // 2. Bar Chart - Total Mentions of Brands
    const brandMentionsData = data.brandMentions;
    const brandMentionsOptions = {
      series: [{
        name: 'Mentions',
        data: Object.values(brandMentionsData),
      }],
      title: { text: "Total Mentions of Brands" },
      chart: { type: 'bar', height: 350 },
      plotOptions: { bar: { borderRadius: 10, columnWidth: '50%' } },
      xaxis: { categories: Object.keys(brandMentionsData) },
      yaxis: { title: { text: 'Mention Count' } },
      fill: { type: 'gradient', gradient: { shade: 'light', type: "horizontal"} },
      colors: [ '#33658A']
    };
    new ApexCharts(document.querySelector('#brands'), brandMentionsOptions).render();

    // 3. Bar Chart - Total Mentions of Aspects
    const aspectMentionsData = data.aspectMentions;
    const aspectMentionsOptions = {
      series: [{
        name: 'Mentions',
        data: Object.values(aspectMentionsData),
      }],
      title: { text: 'Total Mentions of Aspects' },
      chart: { type: 'bar', height: 350 },
      plotOptions: { bar: { borderRadius: 10, columnWidth: '50%' } },
      xaxis: { categories: Object.keys(aspectMentionsData) },
      yaxis: { title: { text: 'Mention Count' } },
      fill: { type: 'gradient', gradient: { shade: 'light', type: "horizontal"} },
      colors: ['#036016']
    };
    new ApexCharts(document.querySelector('#aspect-bar'), aspectMentionsOptions).render();

    // 4. Stacked Bar Chart - Sentiments per Car Brand
    const brands = ['Audi', 'BMW', 'INFINITI', 'Lexus', 'Mercedes-Benz'];
    const positive = brands.map(brand => data.brandSentiments[brand]["1.0"]);
    const neutral = brands.map(brand => data.brandSentiments[brand]["0.0"]);
    const negative = brands.map(brand => data.brandSentiments[brand]["-1.0"]);

    const stackedSentimentOptions = {
      series: [
        { name: 'Positive', data: positive },
        { name: 'Neutral', data: neutral },
        { name: 'Negative', data: negative }
      ],
      chart: { type: 'bar', stacked: true, height: 350 },
      title: { text: 'Summary of Overall Sentiments Per Car Brand' },
      xaxis: { categories: brands },
      yaxis: { title: { text: 'Sentiment Count' } },
      colors: ['#3E7B27', '#E5D0AC', '#8E1616'],
    };
    new ApexCharts(document.querySelector('#stackedsentiment'), stackedSentimentOptions).render();

    // 5. Stacked Bar Chart - Aspects per Car Brand
    const comfort = brands.map(brand => data.brandAspects[brand]["comfort"]);
    const fuelEfficiency = brands.map(brand => data.brandAspects[brand]["fuel efficiency"]);
    const performance = brands.map(brand => data.brandAspects[brand]["performance"]);
    const price = brands.map(brand => data.brandAspects[brand]["price"]);
    const quality = brands.map(brand => data.brandAspects[brand]["quality"]);
    const safety = brands.map(brand => data.brandAspects[brand]["safety"]);

    const stackedAspectOptions = {
      series: [
        { name: 'Comfort', data: comfort },
        { name: 'Fuel Efficiency', data: fuelEfficiency },
        { name: 'Performance', data: performance },
        { name: 'Price', data: price },
        { name: 'Quality', data: quality },
        { name: 'Safety', data: safety }
      ],
      chart: { type: 'bar', stacked: true, height: 350 },
      title: { text: 'Summary of Aspects Per Car Brand' },
      xaxis: { categories: brands },
      yaxis: { title: { text: 'Mention Count' } },
      colors: ['#fb6107', '#f3de2c', '#7cb518', '#5c8001', '#fbb02d', '#2ba84a'],
    };
    new ApexCharts(document.querySelector('#stacked'), stackedAspectOptions).render();

    // 6. Line Chart - Total Car Brand Sentiments (2023-2025)
    const sentimentYearOptions = {
      series: [
        {
          name: 'Audi',
          data: [data.overallBrand["Audi"][2022], data.overallBrand["Audi"][2023], data.overallBrand["Audi"][2024], data.overallBrand["Audi"][2025]]
        },
        {
          name: 'BMW',
          data: [data.overallBrand["BMW"][2022], data.overallBrand["BMW"][2023], data.overallBrand["BMW"][2024], data.overallBrand["BMW"][2025]]
        },
        {
          name: 'INFINITI',
          data: [data.overallBrand["INFINITI"][2022], data.overallBrand["INFINITI"][2023], data.overallBrand["INFINITI"][2024], data.overallBrand["INFINITI"][2025]]
        },
        {
          name: 'Lexus',
          data: [data.overallBrand["Lexus"][2022], data.overallBrand["Lexus"][2023], data.overallBrand["Lexus"][2024], data.overallBrand["Lexus"][2025]]
        },
        {
          name: 'Mercedes-Benz',
          data: [data.overallBrand["Mercedes-Benz"][2022], data.overallBrand["Mercedes-Benz"][2023], data.overallBrand["Mercedes-Benz"][2024], data.overallBrand["Mercedes-Benz"][2025]]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: { enabled: false }
      },
      dataLabels: { enabled: false },
      stroke: {
        width: [5, 7, 5, 3, 6],
        curve: 'smooth',
        dashArray: [0, 8, 5]
      },
      title: {
        text: 'Total Mention of Car Brand Sentiments (2022-2025)',
        align: 'left'
      },
      xaxis: {
        categories: ['2022', '2023', '2024', '2025']
      }
    };
    
    new ApexCharts(document.querySelector('#sentiment'), sentimentYearOptions).render();
    
   
  // 7. Line Chart - Total Aspects (2023-2025)
  const aspectTotalOptions = {
    series: [
        { name: 'Comfort', data: [data.AspectsCounts["comfort"]["2022"], data.AspectsCounts["comfort"]["2023"], data.AspectsCounts["comfort"]["2024"], data.AspectsCounts["comfort"]["2025"]] },
        { name: 'Fuel Efficiency', data: [data.AspectsCounts["fuel efficiency"]["2022"], data.AspectsCounts["fuel efficiency"]["2023"], data.AspectsCounts["fuel efficiency"]["2024"], data.AspectsCounts["fuel efficiency"]["2025"]] },
        { name: 'Performance', data: [data.AspectsCounts["performance"]["2022"], data.AspectsCounts["performance"]["2023"], data.AspectsCounts["performance"]["2024"], data.AspectsCounts["performance"]["2025"]] },
        { name: 'Quality', data: [data.AspectsCounts["quality"]["2022"], data.AspectsCounts["quality"]["2023"], data.AspectsCounts["quality"]["2024"], data.AspectsCounts["quality"]["2025"]] },
        { name: 'Safety', data: [data.AspectsCounts["safety"]["2022"], data.AspectsCounts["safety"]["2023"], data.AspectsCounts["safety"]["2024"], data.AspectsCounts["safety"]["2025"]] }
    ],
    chart: { height: 350, type: 'line', zoom: { enabled: false } },
    dataLabels: { enabled: false },
    stroke: { width: [5, 3, 5, 3, 5], curve: 'straight', dashArray: [0, 8, 5, 1, 2] },
    title: { text: 'Total Mention of Car Brand Aspects (2022-2025)', align: 'left'  },
    xaxis: { categories: ['2022', '2023', '2024', '2025'] },
      // Adding line colors here
  colors: ['#06AED5', '#086788', '#F0C808', '#DD1C1A', '#51344D', '#36558F']
};

new ApexCharts(document.querySelector('#aspect'), aspectTotalOptions).render();

    
  })
  .catch(error => console.error('Error loading data:', error));

////


var options = {
  series: [
    {
      name: 'Positive',
      group: 'budget',
      data: [4691, 11040, 2145, 1887, 4808, 3345]
    },
    {
      name: 'Neutral',
      group: 'actual',
      data: [2222, 1701, 467, 383, 679, 645]
    },
    {
      name: 'Negative',
      group: 'actual',
      data: [4666, 1847, 922, 559, 1003, 691]
    },
  ],
  chart: {
    type: 'bar',
    height: 360,
    
 
  },
  title: {
    text: "Total Sentiment of Each Aspect", // Added chart title
    align: 'left', // Align title to center
    //style: { fontSize: '16px', fontWeight: 'bold', color: '#333'}
  },
  stroke: {
    width: 0,
    colors: ['#fff']
  },
  plotOptions: {
    bar: {
      horizontal: false
    }
  },
  xaxis: {
    categories: [
      'Performance',
      'Comfort',
      'Fuel Efficiency',
      'Safety',
      'Quality',
      'Price'
    ]
  },
 
  colors: ['#3E7B27', '#E5D0AC', '#8E1616'],
  yaxis: {
    labels: {
      formatter: (val) => {
        return val / 1000 + 'K'
      }
    }
  },
  legend: {
    horizontalAlign: 'center'
  }
};

var chart = new ApexCharts(document.querySelector("#aspect-sentiment-chart"), options);
chart.render();














 
