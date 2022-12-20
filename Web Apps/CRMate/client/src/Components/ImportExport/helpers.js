export const jsonToCSV = (filename, csv) => {
  let hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = `${filename}.csv`;
  hiddenElement.click();
} 

export const jsonToJSONFile = (filename, json) => {
  let hiddenElement = document.createElement('a');
  const jsonFile = new Blob([JSON.stringify(json)], {type: 'text/plain'}); //pass data from localStorage API to blob
  hiddenElement.href = URL.createObjectURL(jsonFile);
  hiddenElement.download = `${filename}.json`
  document.body.appendChild(hiddenElement); 
  hiddenElement.click();
}
