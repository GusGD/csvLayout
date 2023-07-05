function generateCSV() {
  var csvContent = "data:text/csv;charset=utf-8,";

  // Add file data to CSV
  fileData.forEach(function (data) {
    var row = Object.values(data).join(";");
    csvContent += row + "\r\n";
  });

  // Add linha data to CSV
  linhaData.forEach(function (data) {
    var row = Object.values(data).join(";");
    csvContent += row + "\r\n";
  });

  // Add coluna data to CSV
  colunaData.forEach(function (data) {
    var row = Object.values(data).join(";");
    csvContent += row + "\r\n";
  });

  // Create a temporary link to download the CSV file
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link);

  // Trigger the link to start downloading
  link.click();
}
