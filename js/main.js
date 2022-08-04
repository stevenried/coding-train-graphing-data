async function getData() {
  const response = await fetch('ZonAnn.Ts+dSST.csv')
  const data = await response.text()

  const tableValues = data.split('\n').slice(1)
  tableValues.forEach((row) => {
    const columns = row.split(',')
    const year = columns[0]
    const meanTempDif = columns[1]
    console.log(year, meanTempDif)
  })
}

getData()
