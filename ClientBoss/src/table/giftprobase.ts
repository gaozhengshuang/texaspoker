// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TGiftPro : table.ITGiftProDefine[] = [
		{ Id : 1, Limitmin : 0, Limitmax : 100, Pro : [ "1-2000", "2-2000", "3-1500", "4-1500", "5-800", "6-800", "7-500", "8-500", "9-200", "10-100", "11-50", "12-50", "13-0", "14-0", "15-0", "16-0", "17-0", "18-0" ] 	},
		{ Id : 2, Limitmin : 101, Limitmax : 500, Pro : [ "1-1790", "2-1500", "3-1300", "4-1300", "5-1000", "6-1000", "7-800", "8-800", "9-200", "10-100", "11-50", "12-50", "13-50", "14-25", "15-25", "16-10", "17-0", "18-0" ] 	},
		{ Id : 3, Limitmin : 501, Limitmax : 999999, Pro : [ "1-1334", "2-1300", "3-1200", "4-1200", "5-1000", "6-1000", "7-1000", "8-1000", "9-350", "10-200", "11-100", "12-100", "13-100", "14-50", "15-50", "16-10", "17-5", "18-1" ] 	}
	]


// Id
export var TGiftProById : game.Dictionary<table.ITGiftProDefine> = {}
function readTGiftProById(){
  for(let rec of TGiftPro) {
    TGiftProById[rec.Id] = rec; 
  }
}
readTGiftProById();
}

