function addRow() {
  var table = document.getElementById("data-table");
  var tbody = document.getElementById("data-table-body");

  var newRow = tbody.insertRow();
  newRow.innerHTML = `
        <td>${document.getElementById("file_name").value}</td>
        <td>${document.getElementById("file_versao").value}</td>
        <td>${document.getElementById("file_line_code_pos").value}</td>
        <td>${document.getElementById("file_line_header_code").value}</td>
        <td>${document.getElementById("file_line_trailer_code").value}</td>
        <td>${document.getElementById("file_col_separator").value}</td>
        <td>${document.getElementById("file_desc").value}</td>
        <td>${document.getElementById("file_natural_keys").value}</td>
        <td>${document.getElementById("file_date_mask").value}</td>
        <td>${document.getElementById("file_version_col_name").value}</td>
        <td>${document.getElementById("file_table_name_prefix").value}</td>
        <td>${document.getElementById("file_info").value}</td>
        
     
        <td class="line-info">${document.getElementById("line_code").value}</td>
        <td class="line-info">${
          document.getElementById("line_level").value
        }</td>
        <td class="line-info">${
          document.getElementById("line_parente").value
        }</td>
        <td class="line-info">${
          document.getElementById("line_table_sulfix").value
        }</td>
        <td class="line-info">${
          document.getElementById("line_descr").value
        }</td>


        <td class="column-info">${
          document.getElementById("col_name").value
        }</td>
        <td class="column-info">${
          document.getElementById("col_tipo").value
        }</td>
        <td class="column-info">${document.getElementById("col_pos").value}</td>
        <td class="column-info">${
          document.getElementById("col_size").value
        }</td>
        <td class="column-info">${
          document.getElementById("col_decimal").value
        }</td>
        <td class="column-info">${
          document.getElementById("col_literal").value
        }</td>
        <td class="column-info">${
          document.getElementById("col_check").value
        }</td>
        <td class="column-info">${
          document.getElementById("col_descr").value
        }</td>
      `;
  /*
  document.getElementById("file_name").value = "";
  document.getElementById("file_versao").value = "";
  document.getElementById("file_line_code_pos").value = "";
  document.getElementById("file_line_header_code").value = "";
  document.getElementById("file_line_trailer_code").value = "";
  document.getElementById("file_col_separator").value = "";
  document.getElementById("file_desc").value = "";
  document.getElementById("file_natural_keys").value = "";
  document.getElementById("file_date_mask").value = "";
  document.getElementById("file_version_col_name").value = "";
  document.getElementById("file_table_name_prefix").value = "";
  document.getElementById("file_info").value = "";
  document.getElementById("line_code").value = "";
  document.getElementById("line_level").value = "";
  document.getElementById("line_parente").value = "";
  document.getElementById("line_table_sulfix").value = "";
  document.getElementById("line_descr").value = "";
  document.getElementById("col_name").value = "";
  document.getElementById("col_tipo").value = "";
  document.getElementById("col_pos").value = "";
  document.getElementById("col_size").value = "";
  document.getElementById("col_decimal").value = "";
  document.getElementById("col_literal").value = "";
  document.getElementById("col_check").value = "";
  document.getElementById("col_descr").value = "";*/
}

function generateCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  let rows = document.querySelectorAll("#data-table-body tr");

  let csvRows = [];

  let fileTypeRow = [];
  let lineTypeRow = [];
  let colTypeRow = [];

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
          lineTypeData.push(rowData);
        }
      }
    } else {
      let colType = row.querySelector(".column-info");

      if (colType) {
        if (colType.parentElement.parentElement.nodeName === "TBODY") {
          if (colType.parentElement.parentElement.id === "data-table-body") {
            colTypeData.push(rowData);
          }
        }
      } else {
        fileTypeData.push(rowData);
      }
    }
  });

  console.table(csvContent);

  fileTypeRow.push(fileTypeData.join("\r\n"));
  lineTypeRow.push(lineTypeData.join("\r\n"));
  colTypeRow.push(colTypeData.join("\r\n"));

  csvRows.push(fileTypeRow.join(";"));
  console.log(csvRows);
  csvRows.push(lineTypeRow.join(";"));
  console.log(csvRows);
  csvRows.push(colTypeRow.join(";"));
  console.log(csvRows);

  csvContent += csvRows.join("\r\n");

  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  let fileName = rows[0].cells[1].innerText;
  const csvFileName = "layout - " + fileName + ".csv";
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", csvFileName);
  document.body.appendChild(link);
  link.click();
}
