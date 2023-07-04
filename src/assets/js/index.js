function generateCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  let rows = document.querySelectorAll("#data-table-body tr");
  let csvRows = [];
  let fileTypeData = [];
  let lineTypeData = [];
  let colTypeData = [];

  rows.forEach(function (row, index) {
    let rowData = Array.from(row.cells)
      .map(function (cell) {
        return cell.innerHTML;
      })
      .join(";");

    if (index == 0) {
      fileTypeData.push(rowData);
      console.log("INDEX:", index);
    } else if (index == 1) {
      lineTypeData.push(rowData);
      console.log("INDEX:", index);
    } else if (index === 2) {
      colTypeData.push(rowData);
      console.log("INDEX:", index);
    } else {
      csvRows.push(rowData);
    }
  });

  csvRows.unshift(fileTypeData.join("\n"));
  csvRows.splice(1, 0, lineTypeData.join("\n"));
  csvRows.splice(2, 0, colTypeData.join("\n"));

  csvContent += csvRows.join("\n");

  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  let fileName = rows[0].cells[1].innerText;
  const csvFileName = "layout - " + fileName + ".csv";
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", csvFileName);
  document.body.appendChild(link);
  link.click();
  let tbody = document.getElementById("data-table-body");
  tbody.innerHTML = "";
}
