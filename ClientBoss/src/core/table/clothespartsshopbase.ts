// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TClothesPartsShop : table.ITClothesPartsShopDefine[] = [
	]


// Id
export var TClothesPartsShopById : game.Dictionary<table.ITClothesPartsShopDefine> = {}
function readTClothesPartsShopById(){
  for(let rec of TClothesPartsShop) {
    TClothesPartsShopById[rec.Id] = rec; 
  }
}
readTClothesPartsShopById();
}

