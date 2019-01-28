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
        name: "CIA-01-1207-001_USA_Rockets_AUTH",
        country: "United States",
        duedate: getDate("2019-02-01")
    },
    {
        name: "CIA-01-1307-001_USA_Trump",
        country: "United States",
        duedate: getDate("2019-02-07")
    },
    {
        name: "CIA-01-1407-001_USA_Rockets_Trump",
        country: "United States",
        duedate: getDate("2019-02-12")
    },
    {
        name: "CIA-01-1507-001_USA_Ships_AUTH",
        country: "United States",
        duedate: getDate("2019-02-12")
    },
    {
        name: "CIA-01-1607-001_USA_Boats_AUTH",
        country: "United States",
        duedate: getDate("2019-02-19")
    },
    {
        name: "CIA-01-1707-001_USA_BiggerRockets_AUTH",
        country: "United States",
        duedate: getDate("2019-02-20")
    },
    {
        name: "CIA-01-1807-001_USA_Nuke_AUTH",
        country: "United States",
        duedate: getDate("2019-02-18")
    },
    {
        name: "CIA-01-1902-001_USA_Obama_AUTH",
        country: "United States",
        duedate: getDate("2019-02-22")
    },
    {
        name: "CIA-01-2101-001_USA_Tango_AUTH",
        country: "United States",
        duedate: getDate("2019-02-28")
    },
    {
        name: "CIA-01-2207-001_USA_Rockets_AUTH",
        country: "United States",
        duedate: getDate("2019-03-01")
    },
    {
        name: "CIA-01-2817-001_USA_Trump",
        country: "United States",
        duedate: getDate("2019-03-04")
    },
    {
        name: "CIA-01-2917-001_USA_Rockets_Trump",
        country: "United States",
        duedate: getDate("2019-03-06")
    },
    {
        name: "CIA-01-3197-001_USA_Ships_AUTH",
        country: "United States",
        duedate: getDate("2019-03-12")
    },
    {
        name: "CIA-01-0107-001_USA_BiggerRockets_AUTH",
        country: "United States",
        duedate: getDate("2019-03-19")
    },
    {
        name: "CIA-01-3100-001_USA_Nuke_AUTH",
        country: "United States",
        duedate: getDate("2019-03-18")
    },
    {
        name: "CIA-01-0007-001_USA_Obama_AUTH",
        country: "United States",
        duedate: getDate("2019-03-25")
    },
    {
        name: "CIA-01-3199-001_USA_Kelvin_AUTH",
        country: "United States",
        duedate: getDate("2019-03-25")
    },
    {
        name: "CIA-01-9907-001_USA_Tango_AUTH",
        country: "United States",
        duedate: getDate("2019-03-26")
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
