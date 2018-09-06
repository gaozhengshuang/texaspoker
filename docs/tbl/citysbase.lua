// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TCitys : table.ITCitysDefine[] = [
		{ Id : 101, Type : 1, Superior : 0, Name : "北京市", Lat : 0, Lng : 0 	},
		{ Id : 102, Type : 1, Superior : 0, Name : "上海市", Lat : 31.231706, Lng : 121.472644 	},
		{ Id : 103, Type : 1, Superior : 0, Name : "天津市", Lat : 0, Lng : 0 	},
		{ Id : 104, Type : 1, Superior : 0, Name : "重庆市", Lat : 0, Lng : 0 	},
		{ Id : 105, Type : 1, Superior : 0, Name : "河北省", Lat : 0, Lng : 0 	},
		{ Id : 2001, Type : 2, Superior : 102, Name : "黄埔区", Lat : 31.22337, Lng : 121.49295 	},
		{ Id : 2002, Type : 2, Superior : 102, Name : "徐汇区", Lat : 31.18831, Lng : 121.43676 	},
		{ Id : 2003, Type : 2, Superior : 102, Name : "闵行区", Lat : 31.11246, Lng : 121.38162 	},
		{ Id : 2004, Type : 2, Superior : 102, Name : "青浦区", Lat : 31.14974, Lng : 121.12417 	},
		{ Id : 2005, Type : 2, Superior : 102, Name : "金山区", Lat : 30.74163, Lng : 121.34164 	},
		{ Id : 2006, Type : 2, Superior : 102, Name : "静安区", Lat : 31.22884, Lng : 121.4444 	},
		{ Id : 2007, Type : 2, Superior : 102, Name : "浦东新区", Lat : 31.22249, Lng : 121.5447 	},
		{ Id : 2008, Type : 2, Superior : 102, Name : "松江区", Lat : 31.03222, Lng : 121.22879 	},
		{ Id : 2009, Type : 2, Superior : 102, Name : "奉贤区", Lat : 30.9179, Lng : 121.47412 	},
		{ Id : 2010, Type : 2, Superior : 102, Name : "崇明区", Lat : 31.62278, Lng : 121.39758 	},
		{ Id : 2011, Type : 2, Superior : 102, Name : "虹口区", Lat : 31.27788, Lng : 121.48162 	},
		{ Id : 2012, Type : 2, Superior : 102, Name : "普陀区", Lat : 31.24951, Lng : 121.39703 	},
		{ Id : 2013, Type : 2, Superior : 102, Name : "宝山区", Lat : 31.4045, Lng : 121.4891 	},
		{ Id : 2014, Type : 2, Superior : 102, Name : "长宁区", Lat : 31.22036, Lng : 121.42462 	},
		{ Id : 2015, Type : 2, Superior : 102, Name : "杨浦区", Lat : 31.2595, Lng : 121.526 	},
		{ Id : 2016, Type : 2, Superior : 102, Name : "嘉定区", Lat : 31.37473, Lng : 121.2655 	}
	]


// Id
export var TCitysById : game.Dictionary<table.ITCitysDefine> = {}
function readTCitysById(){
  for(let rec of TCitys) {
    TCitysById[rec.Id] = rec; 
  }
}
readTCitysById();
}

