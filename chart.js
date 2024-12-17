let barbellChart;
let connectorsVisible = true;

// Function to Render Barbell Chart
function renderChart(inputData) {
  const labels = inputData.map(item => item.label);
  const startValues = inputData.map(item => item.start);
  const endValues = inputData.map(item => item.end);

  const ctx = document.getElementById("barbellChart").getContext("2d");

  // Destroy previous chart instance if it exists
  if (barbellChart) {
    barbellChart.destroy();
  }

  // Prepare datasets for Start and End points
  const datasets = [
    {
      label: "Start",
      data: startValues.map((val, i) => ({ x: val, y: i })),
      backgroundColor: "blue",
	  borderColor: "black",
	  borderWidth: 3,
      pointRadius: 8,
      showLine: false,
    },
    {
      label: "End",
      data: endValues.map((val, i) => ({ x: val, y: i })),
      backgroundColor: "red",
	  borderColor: "black",
	  borderWidth: 3,
      pointRadius: 8,
      showLine: false,
    },
  ];

  // Add connector lines if connectorsVisible is true
  if (connectorsVisible) {
    inputData.forEach((item, i) => {
      datasets.push({
        label: `Connection ${item.label}`,
        data: [
          { x: item.start, y: i },
          { x: item.end, y: i },
        ],
        borderColor: "black",
        borderWidth: 3,
        pointRadius: 0,
        showLine: true,
        fill: false,
      });
    });
  }

  // Create Barbell Chart
  barbellChart = new Chart(ctx, {
    type: "scatter",
    data: { datasets },
    options: {
      scales: {
        x: { title: { display: true, text: "Value" } },
        y: {
          title: { display: true, text: "Categories" },
          ticks: { callback: (value) => labels[value] },
        },
      },
      plugins: {
        legend: { display: true, position: "top" },
      },
      responsive: true,
    },
  });
}

// Function to Update Chart with Input Data
function updateChart() {
  try {
    const inputData = JSON.parse(document.getElementById("dataInput").value);
    if (Array.isArray(inputData)) {
      renderChart(inputData);
    } else {
      alert("Please provide valid JSON input as an array.");
    }
  } catch (error) {
    alert("Invalid JSON format. Please check your input.");
    console.error(error);
  }
}

// Toggle Connectors and Re-render Chart
function toggleConnectors() {
  connectorsVisible = document.getElementById("toggleConnectors").checked;
  updateChart();
}

// Initial Chart Render with Default Data
const defaultData = [
  { label: "A", start: 10, end: 40 },
  { label: "B", start: 20, end: 70 },
  { label: "C", start: 30, end: 60 },
  { label: "D", start: 40, end: 80 },
];
renderChart(defaultData);
