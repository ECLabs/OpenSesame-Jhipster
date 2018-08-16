/*Document follows the following format:

  {
    name: String
    country: String
    duedate: date
  }
  
use getDate() to convert strings (YYYY-MM-DD) to formatted ngbDatepicker date and make sure
the value of country exists in ./countries.json
*/

export const mock_documents = [
    {
        name: "JCITA RFI",
        country: "United States",
        duedate: getDate("2018-07-31")
    },
    {
        name: "DIA-01-3107-001_USA_Rockets_AUTH",
        country: "United States",
        duedate: getDate("2018-08-23")
    },
    {
        name: "DIA-01-3107-001_USA_Ships_AUTH",
        country: "United States",
        duedate: getDate("2018-07-31")
    },
    {
        name: "DIA-01-3107-001_USA_Boats_AUTH",
        country: "United States",
        duedate: getDate("2018-08-27")
    },
    {
        name: "DIA-01-3107-001_USA_BiggerRockets_AUTH",
        country: "United States",
        duedate: getDate("2018-08-26")
    },
    {
        name: "DIA-01-3107-001_USA_Nuke_AUTH",
        country: "United States",
        duedate: getDate("2018-07-30")
    },
    {
        name: "DIA-01-3107-001_USA_Obama_AUTH",
        country: "United States",
        duedate: getDate("2018-08-01")
    },
    {
        name: "DIA-01-3107-001_USA_Kelvin_AUTH",
        country: "United States",
        duedate: getDate("2018-07-26")
    },
    {
        name: "DIA-01-3107-001_USA_Tango_AUTH",
        country: "United States",
        duedate: getDate("2018-09-01")
    },

]

// converts string to formatted ngbDatepicker date
function getDate(date) {
    let date_arr = date.split('-');
    let formatted_date = {
        year: date_arr[0],
        month: date_arr[1],
        day: date_arr[2],
    };
    return formatted_date
}
