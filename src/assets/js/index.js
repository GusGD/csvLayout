const inputIds = [
  "file_name",
  "file_versao",
  "file_line_code_pos",
  "file_line_header_code",
  "file_line_trailer_code",
  "file_col_separator",
  "file_desc",
  "file_natural_keys",
  "file_date_mask",
  "file_version_col_name",
  "file_table_name_prefix",
  "file_info",
  "line_code",
  "line_level",
  "line_parente",
  "line_table_sulfix",
  "line_descr",
  "col_name",
  "col_tipo",
  "col_pos",
  "col_size",
  "col_decimal",
  "col_literal",
  "col_check",
  "col_descr",
];

function addRow() {
  const newRow = document.createElement("tr");

  inputIds.forEach(function (inputId) {
    const cell = document.createElement("td");
    cell.textContent = document.getElementById(inputId).value;
    newRow.appendChild(cell);
    document.getElementById(inputId).value = "";
  });

  const tbody = document.getElementById("data-table-body");
  tbody.appendChild(newRow);

  inputIds.forEach(function (inputId) {
    document.getElementById(inputId).value = "";
  });
}

function generateCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  let rows = document.querySelectorAll("#data-table-body tr");
  let csvRows = [];
  let fileTypeData = [];
  let lineTypeData = [];
  let colTypeData = [];

  rows.forEach(function (row) {
    let rowData = Array.from(row.cells)
      .map(function (cell) {
        return cell.innerHTML;
      })
      .join(";");

    let lineType = row.querySelector(".line-info");

    if (lineType) {
      if (lineType.parentElement.parentElement.nodeName === "TBODY") {
        if (lineType.parentElement.parentElement.id === "data-table-body") {
          lineTypeData.push(rowData + "\n");
        }
      }
    } else {
      let colType = row.querySelector(".column-info");

      if (colType) {
        if (colType.parentElement.parentElement.nodeName === "TBODY") {
          if (colType.parentElement.parentElement.id === "data-table-body") {
            colTypeData.push(rowData + "\n");
          }
        }
      } else {
        fileTypeData.push(rowData + "\n");
      }
    }
  });

  csvRows.push(fileTypeData.join("\r\n"));
  csvRows.push(lineTypeData.join("\r\n"));
  csvRows.push(colTypeData.join("\r\n"));

  csvContent += csvRows.join("\r\n\r\n");

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
