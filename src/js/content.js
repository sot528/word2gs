import GoogleSpreadsheet from 'google-spreadsheet';
import async from 'async';
var creds = require('./credentials.json');
var doc = new GoogleSpreadsheet('1UFxQhn13EB8odKOQSDaGgZbSzBVavfnorvjlkUOCq-4');
var sheet;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.text == "send") {
        const selection = window.getSelection().toString().replace(/\n/g, "<br/>");
        addWordToSheet(selection)
    }
});

function addWordToSheet(word) {
    async.series([
        function setAuth(step) {
            doc.useServiceAccountAuth(creds, step)
        },
        function getInfoAndWorksheets(step){
            doc.getInfo(function(err, info) {
                console.log(err);
                console.log(info);
                sheet = info.worksheets[0];
                step();
            });
        },
        function workingWithCells(step) {
            sheet.getCells({
                'min-col': 1,
                'max-col': 1,
                'return-empty': true
            }, function(err, cells) {
                var cell;
                for (var i = 0; i < cells.length; i++) {

                    if (cells[i].value != '') {
                        continue;
                    }

                    cell = cells[i];
                    break
                }
                cell.value = word;
                cell.save(); //async

                step();
            });
        }
    ], function(err){
        if( err ) {
            console.log('Error: '+err);
        }
    });
}
