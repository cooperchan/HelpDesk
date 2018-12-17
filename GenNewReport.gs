function onEdit() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var column1;
  var column2;
  var lastModifiedRange = sheet.getRange("E:G");
  var input =  lastModifiedRange.getValues(); 
  
  for (var j=0; j<input.length; j++) {
    if (input[j][0] && !input[j][1]) {
      column1 =  lastModifiedRange.getCell(j+1, 2);
      column1.setValue(createTimestamp()+('00'+column1.getRow()).slice(-3));
    }
    else if (input[j][0] && input[j][1] && !input[j][2]) {
      column2 =  lastModifiedRange.getCell(j+1, 3);
      column2.setValue(createTimestamp()+('00'+column2.getRow()).slice(-3));
    }
  } 
}

function createTimestamp() {
  var m;
  var d;
  var fullDate = new Date();
  
  m = ('0'+(fullDate.getUTCMonth()+1)).slice(-2);
  d = ('0'+fullDate.getUTCDate()).slice(-2);
  
    return fullDate.getUTCFullYear() + m + d;
}

function elements(range,element) {
  if(range != undefined){ 
  var elementsArray = range.join().split(',').filter(Boolean);
    
	for (var n= 0; n < elementsArray.length; n++) {
		if (elementsArray[n+1] == element) {
			return elementsArray[n-2] + "," + elementsArray[n-1] + "," + elementsArray[n] + "," + element; 
		}
	}
	return false;
  
  }
}
