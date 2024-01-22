read = new FileReader;
read2 = new FileReader;

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
  const file = event.target.files[0];
  read.readAsText(file);
});

const fileSelector2 = document.getElementById('file-selector2');
fileSelector2.addEventListener('change', (event) => {
  const file = event.target.files[0];
  read2.readAsText(file);
});

function patch() {
  const data = JSON.parse(read.result);
  const patch = JSON.parse(read2.result);
  var names = [];
  for (let i of data.items) {
    names.push(i.japaneseText);
  }
  var patchNames = [];
  for (let i of patch.items) {
    patchNames.push([i.japaneseText, i.englishUsText, i.englishUsFontType, i.chineseTText, i.chineseTFontType, i.koreanText, i.koreanFontType, i.chineseSText, i.chineseSFontType]);
  }
  var patchedData = JSON.parse(JSON.stringify(data));
  for (let i of patchNames) {
    if (names.indexOf(i[0]) != -1 && i[0] != "") {
      let index = getAllIndexes(names, i[0]);
      
      for (let j of index) {
        if (i[1] != "") {
          patchedData.items[j].englishUsText = i[1];
          patchedData.items[j].englishUsFontType = i[2];
        }
        if (i[3] != "") {
          patchedData.items[j].chineseTText = i[3];
          patchedData.items[j].chineseTFontType = i[4];
        }
        if (i[5] != "") {
          patchedData.items[j].koreanText = i[5];
          patchedData.items[j].koreanFontType = i[6];
        }
        if (i[7] != "") {
          patchedData.items[j].chineseSText = i[7];
          patchedData.items[j].chineseSFontType = i[8];
        }
      }
    }
  }
  downloadObjectAsJson(patchedData, "wordlist");
}

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function getAllIndexes(arr, val) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
  }
  return indexes;
}