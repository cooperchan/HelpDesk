function myFunction() 
{
//Creates and formats dates to find the last day of the current month
  var date = new Date(); // Debugger will work here because its undefind
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var monthDay = new Date().getDate();
  var lastdayFormat = Utilities.formatDate(new Date(lastDay), "GMT-4", "dd");
  var monthdayFormat = Utilities.formatDate(new Date(monthDay), "GMT-4", "dd");
 
  //Checks if current day is last day of current month. If true, runs the whole script.
  if(lastdayFormat - monthdayFormat == 0)
  {
  //Gets current spreadsheet data and and makes a copy of the monthly report template.
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Input Report');
    var data = sheet.getDataRange().getValues();
    
    var outputSheet = ss.getSheetByName('Output Report');
    
    //Code for getting the current date, name of current month and the month of the report, as well as a regular expression to verify that the ticket was submitted during the report month.
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var currentMonth = new Date().getMonth() + 1;
    var reportMonth = currentMonth - 0;
    var reportMonthName = monthNames[new Date().getMonth()];
    var monthRegEx = new RegExp(reportMonth + '\\/([0-3]?[0-9])\\/(19|20)\\d\\d');
    
    
    //Code for testing that the data is being retrieved properly from the spreadsheet, displays in logs (Commented out because its not used in normal operation).
    /*
    for (var i = 1; i < data.length; i++) 
    {
      var formattedDate = Utilities.formatDate(new Date(data[i][0]), "GMT-4", "MM/dd/yyyy");
      Logger.log('Date: ' + formattedDate);
      Logger.log('Department: ' + data[i][1]);
      Logger.log('Issue: ' + data[i][2]);
      Logger.log('Employee ID: 0' + data[i][3]);
      Logger.log('Priority: ' + data[i][4]);
      Logger.log('Description: ' + data[i][5]);
      Logger.log('Status: ' + data[i][6]);
      Logger.log('---------------------------');
      
    }
    */
    
    
    //Calculates the number of tickets in spreadsheet submitted during the month that the report is generated for.
    var monthlyTickets = 0;
    for (var i = 1; i < data.length; i++)
    {
      var formattedDate = Utilities.formatDate(new Date(data[i][0]), "GMT-4", "MM/dd/yyyy");
      if (monthRegEx.test(formattedDate) == true)
      {
        monthlyTickets++;
      }
    }
    //Logger.log(monthlyTickets);
    
    //Breaks down the number of tickets submitted during the month by department, type of issue, and priority.
    var financeTickets = 0;
    var salesTickets = 0;
    var custrelationTickets = 0;
    var hrTickets = 0;
    
    for (var i = 1; i < data.length; i++)
    {
      if (data[i][1] == 'Finance')
      {
        financeTickets++;
      }
      if (data[i][1] == 'Sales')
      {
        salesTickets++;
      }
      if (data[i][1] == 'Customer Relation')
      {
        custrelationTickets++;
      }
      if (data[i][1] == 'Human Resource')
      {
        hrTickets++;
      }
    }
    var bydepartmentTickets = financeTickets + salesTickets + custrelationTickets + hrTickets;

    /*
    Logger.log('Finance: ' + financeTickets);
    Logger.log('Sales: ' + salesTickets);
    Logger.log('Customer Relation: ' + custrelationTickets);
    Logger.log('Human Resource:' + hrTickets);
    */
    
    var issue1Tickets = 0;
    var issue2Tickets = 0;
    var issue3Tickets = 0;
    var issue4Tickets = 0;
    var otherissueTickets = 0;
    
    for (var i = 1; i < data.length; i++)
    {
      if (data[i][2] == 'Employee Account Login Problem')
      {
        issue1Tickets++;
      }
      if (data[i][2] == 'Computer Workstation Problem')
      {
        issue2Tickets++;
      }
      if (data[i][2] == 'Office Equipment Problem (i.e. Printer/Scanner, etc)')
      {
        issue3Tickets++;
      }
      if (data[i][2] == 'Network Problem (Internet)')
      {
        issue4Tickets++;
      }
      else
      {
        otherissueTickets++;
      }
    }
    var byissueTickets = issue1Tickets + issue2Tickets + issue3Tickets + issue4Tickets + otherissueTickets;
    
    /*
    Logger.log('Issue 1: ' + issue1Tickets);
    Logger.log('Issue 2: ' + issue2Tickets);
    Logger.log('Issue 3: ' + issue3Tickets);
    Logger.log('Issue 4: ' + issue4Tickets);
    */
    
    var lowPTickets = 0;
    var mediumPTickets = 0;
    var highPTickets = 0;
    var noPTickets = 0;
    
    for (var i = 1; i < data.length; i++)
    {
      if (data[i][4] == 'Low')
      {
        lowPTickets++;
      }
      if (data[i][4] == 'Normal')
      {
        mediumPTickets++;
      }
      if (data[i][4] == 'High')
      {
        highPTickets++;
      }
      else
      {
        noPTickets++;
      }
    }
    var bypriorityTickets = lowPTickets + mediumPTickets + highPTickets + noPTickets;
    
    var openTickets = 0;
    var workingTickets = 0;
    var closedTickets = 0;
    
    for (var i= 1; i < data.length; i++)
    {
      if (data[i][6] == 'Open')
      {
        openTickets++;
      }
      if (data[i][6] == 'Underway')
      {
        workingTickets++;
      }
      if (data[i][6] == 'Closed')
      {
        closedTickets++;
      }
    }
    var bystatusTickets = openTickets + workingTickets + closedTickets;
    
    /*
    Logger.log('Low Priority ' + lowPTickets);
    Logger.log('Medium Priority ' + mediumPTickets);
    Logger.log('High Priority ' + highPTickets);
    Logger.log('No Priority ' + noPTickets);
    */
    
    //All the code below is for outputting the calculated data onto a second spreadsheet.
    outputSheet.getRange(1,9).setValue('Total Tickets For ' + reportMonthName);
    outputSheet.getRange(1,10).setValue(monthlyTickets);
    
    
    outputSheet.getRange(2,2).setValue(financeTickets);
    outputSheet.getRange(3,2).setValue(salesTickets);
    outputSheet.getRange(4,2).setValue(custrelationTickets);
    outputSheet.getRange(5,2).setValue(hrTickets);
    
    outputSheet.getRange(2,3).setValue(((financeTickets/bydepartmentTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(3,3).setValue(((salesTickets/bydepartmentTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(4,3).setValue(((custrelationTickets/bydepartmentTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(5,3).setValue(((hrTickets/bydepartmentTickets)*100).toFixed(0)+'%')
    
    outputSheet.getRange(2,4).setValue(((financeTickets/monthlyTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(3,4).setValue(((salesTickets/monthlyTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(4,4).setValue(((custrelationTickets/monthlyTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(5,4).setValue(((hrTickets/monthlyTickets)*100).toFixed(0)+'%')
    
    
    outputSheet.getRange(8,2).setValue(issue1Tickets);
    outputSheet.getRange(9,2).setValue(issue2Tickets);
    outputSheet.getRange(10,2).setValue(issue3Tickets);
    outputSheet.getRange(11,2).setValue(issue4Tickets);
    outputSheet.getRange(12,2).setValue(otherissueTickets);
    
    outputSheet.getRange(8,3).setValue(((issue1Tickets/byissueTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(9,3).setValue(((issue2Tickets/byissueTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(10,3).setValue(((issue3Tickets/byissueTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(11,3).setValue(((issue4Tickets/byissueTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(12,3).setValue(((otherissueTickets/byissueTickets)*100).toFixed(0)+'%')
    
    outputSheet.getRange(8,4).setValue(((issue1Tickets/monthlyTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(9,4).setValue(((issue2Tickets/monthlyTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(10,4).setValue(((issue3Tickets/monthlyTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(11,4).setValue(((issue4Tickets/monthlyTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(12,4).setValue(((otherissueTickets/monthlyTickets)*100).toFixed(0)+'%')
    
    
    outputSheet.getRange(15,2).setValue(lowPTickets);
    outputSheet.getRange(16,2).setValue(mediumPTickets);
    outputSheet.getRange(17,2).setValue(highPTickets);
    outputSheet.getRange(18,2).setValue(noPTickets);
    
    outputSheet.getRange(15,3).setValue(((lowPTickets/bypriorityTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(16,3).setValue(((mediumPTickets/bypriorityTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(17,3).setValue(((highPTickets/bypriorityTickets)*100).toFixed(0)+'%')
    outputSheet.getRange(18,3).setValue(((noPTickets/bypriorityTickets)*100).toFixed(0)+'%')
    }
}

/* 
Modifications from original code are below
*/

// Function for Data Validation
function customDataValidation() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Input Report');
  //var data = sheet.getDataRange().getValues();
    

  var aRange = sheet.getRange('!A2:A');
  var validationRule = SpreadsheetApp.newDataValidation()
     .requireDateBetween(new Date('10/8/2018'),new Date('12/31/2018')) 
   //.setAllowInvalid(false)
     .build();
  aRange.setDataValidation(validationRule);
   
  var bRange = sheet.getRange('!B2:B');
  var validationRule = SpreadsheetApp.newDataValidation().requireValueInList(['Sales', 'Finance', 'Customer Relation', 'Human Resource'], false)
   //.setAllowInvalid(false)
     .build();
  bRange.setDataValidation(validationRule); 
  
  var cRange = sheet.getRange('!C2:C');
  var validationRule = SpreadsheetApp.newDataValidation().requireValueInList(['USB is not recognized', 'I accidentally deleted some files. Can I get them back?', 
                                                                              'Internet Connection is too slow', 
                                                                              'I can’t log in.',
                                                                              'The printer won’t work.'], false)
   //.setAllowInvalid(false)
     .build();
  cRange.setDataValidation(validationRule); 
  
  var dRange = sheet.getRange('!D2:D');
  var validationRule = SpreadsheetApp.newDataValidation().requireNumberGreaterThan(0)
   //.setAllowInvalid(false)
     .build();
  dRange.setDataValidation(validationRule); 
  
  var eRange = sheet.getRange('!E2:E');
  var validationRule = SpreadsheetApp.newDataValidation().requireValueInList(['Low', 'Normal', 'High'], false)
   //.setAllowInvalid(false)
     .build();
  eRange.setDataValidation(validationRule); 
  
  var gRange = sheet.getRange('!G2:G');
  var validationRule = SpreadsheetApp.newDataValidation().requireValueInList(['Open', 'Closed'], false)
   //.setAllowInvalid(false)
     .build();
  gRange.setDataValidation(validationRule); 
}
