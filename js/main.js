chartIt()

async function getData() {
  const xValues = []
  const yValues = []

  const response = await fetch('ZonAnn.Ts+dSST.csv')
  const data = await response.text()

  const tableValues = data.split('\n').slice(1)
  tableValues.forEach((row) => {
    const columns = row.split(',')
    const year = columns[0]
    xValues.push(year)
    const meanTempDif = columns[1]
    yValues.push(parseFloat(meanTempDif) + 14)
  })
  return { xValues, yValues }
}

async function chartIt() {
  const data = await getData()
  const ctx = document.querySelector('[data-id-chart]').getContext('2d')
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.xValues,
      datasets: [
        {
          label:
            'Combined Land-Surface Air and Sea-Surface Water Temperature Anomalies (°C) from 1880',
          data: data.yValues,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          pointRadius: 0,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Combined Land-Surface Air and Sea-Surface Water Temperature Anomalies (°C) from 1880',
        },
        legend: {
          display: false,
        },
      },
    },
  })
}
