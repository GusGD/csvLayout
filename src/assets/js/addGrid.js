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
