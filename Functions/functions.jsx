export const handleGetYear = () => {
  let thisYear = new Date().getFullYear()
  let lastYear = thisYear - 1
  let nextYear = thisYear + 1
  // let currentDate = new Date()

  //fake current date for testing
  let currentDate = new Date("2024-02-04T00:00:00+0100")
  //placeholder start date
  let startDate = new Date(`${thisYear}-10-01T00:00:00+0100`)
  //end date is end of sept next year
  let endDate = new Date(`${nextYear}-09-30T23:59:59+0100`)

  if (currentDate >= startDate && currentDate <= endDate) {
    console.log(`current date ${currentDate} is between`)
    // console.log(thisYear)
    return thisYear
  } else {
    console.log("isnt in range")
    // console.log(lastYear)
    return lastYear
  }
}
