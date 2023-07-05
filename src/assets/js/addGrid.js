var fileData = [];
var linhaData = [];
var colunaData = [];

function addToFileTable() {
  var formData = new FormData(document.getElementById("fileForm"));
  var data = {};
  for (var [key, value] of formData.entries()) {
    data[key] = value;
  }
  fileData.push(data);
  displayDataInTable(data, "fileTable");
}

function addToTable(tableId, data, rowData) {
  var table = document.getElementById(tableId);
  var newRow = table.insertRow();
  for (var i = 0; i < rowData.length; i++) {
    var cell = newRow.insertCell();
    cell.textContent = data[rowData[i]];
  }
  return newRow;
}

function addToLinhaTable() {
  var rowData = ["codigo", "nivel", "parente", "sulfixo", "descricao"];
  var linha = {};
  rowData.forEach(function (key) {
    var value = document.getElementById("linha_" + key).value;
    linha[key] = value;
  });

  var newRow = addToTable("linhaTable", linha, rowData);
  newRow.setAttribute("data-linha", linha.codigo);
  linhaData.push(linha);
  rowData.forEach(function (key) {
    document.getElementById("linha_" + key).value = "";
  });

  addDeleteButton(newRow, function () {
    deleteRow(newRow);
  });
}

function addToColunaTable() {
  var rowData = [
    "linha",
    "nome",
    "tipo",
    "posicao",
    "tamanho",
    "decimal",
    "literal",
    "check",
    "desc",
  ];
  var coluna = {};

  rowData.forEach(function (key) {
    var value = document.getElementById("coluna_" + key).value;
    coluna[key] = value;
  });

  var newRow = addToTable("colunaTable", coluna, rowData);
  colunaData.push(coluna);
  rowData.forEach(function (key) {
    document.getElementById("coluna_" + key).value = "";
  });

  newRow.setAttribute("data-linha", coluna.linha); // Movido após a criação da nova linha

  addDeleteButton(newRow, function () {
    deleteRow(newRow);
  });
}

function addDeleteButton(row, onDelete) {
  var deleteCell = row.insertCell();
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Excluir";
  deleteButton.addEventListener("click", onDelete);
  deleteCell.appendChild(deleteButton);
}

function deleteRow(row) {
  var table = row.parentNode;
  var rowIndex = row.rowIndex;
  table.deleteRow(rowIndex);
}

function displayDataInTable(data, tableId) {
  var table = document.getElementById(tableId);
  var newRow = table.insertRow();
  for (var key in data) {
    var cell = newRow.insertCell();
    cell.innerHTML = data[key];
  }
}

function generateCSV() {
  var csvContent = "data:text/csv;charset=utf-8,";
  var nomeArquivo = document.getElementById("file_name").value;
  // Add file data to CSV (as the first row)
  if (fileData.length > 0) {
    var fileRow = Object.values(fileData[0]).join(";");
    csvContent += fileRow + "\r\n";
  }

  // Add linha and coluna data to CSV
  linhaData.forEach(function (linha) {
    var linhaRow = Object.values(linha).join(";");
    csvContent += linhaRow + "\r\n";

    // Find coluna data for the current linha
    var colunaRows = colunaData.filter(function (coluna) {
      return coluna.linha === linha.codigo;
    });

    // Add coluna data for the current linha to CSV
    colunaRows.forEach(function (coluna) {
      var colunaRow = Object.values(coluna).join(";");
      csvContent += colunaRow + "\r\n";
    });
  });

  // Create a temporary link to download the CSV file
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "layout - " + nomeArquivo + ".csv");
  document.body.appendChild(link);

  // Trigger the link to start downloading
  link.click();
}
