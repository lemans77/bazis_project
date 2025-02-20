/**
 * Имя файла настроек
 */
const filename = "settings.xml";

// 0 - только имя
// 1 - только позицию
// 2 - позицию, а если ее нет, то имя
var addID = 0;
// 0 - менять имя
// 1 - менять позицию
var changeType = 0;
// 0 - только непосредственное вложение
// 1 - только корень
// 2 - вся иерархия
var recursionType = 0;
// Разделитель
var delimiter = "__";
/**
 * Выделенные на начало скрипта объекты
 * @type {Object3[]}
 */
var selection = [];

var props = Action.Properties;
var settings = props.NewGroup("Настройки");
var panelChange = settings.NewCombo("У панели менять");
panelChange.AddItem("Имя");
panelChange.AddItem("Позицию");
panelChange.OnValueChange = function () {
  changeType = panelChange.ItemIndex;
};
var delim = settings.NewString("Разделитель");
delim.Value = delimiter;
delim.OnValueChange = function () {
  delimiter = delim.Value;
};
var blockID = settings.NewCombo("Для формирования информации использовать");
blockID.AddItem("Только имя объекта");
blockID.AddItem("Только позицию объекта");
blockID.AddItem("Позицию при наличии, иначе имя");
blockID.ItemIndex = addID;
blockID.Value = blockID.ComboItems[addID];
blockID.OnValueChange = function () {
  addID = blockID.ItemIndex;
};
var recur = settings.NewCombo("Добавлять имя/позицию");
recur.AddItem("Блока, в который вложен объект");
recur.AddItem("Корневого блока");
recur.AddItem("Всех блоков в иерархии");
recur.ItemIndex = recursionType;
recur.Value = recur.ComboItems[recursionType];
recur.OnValueChange = function () {
  recursionType = recur.ItemIndex;
};
settings.Load(filename);
delimiter = delim.Value;
addID = blockID.ItemIndex;
recursionType = recur.ItemIndex;
changeType = panelChange.ItemIndex;

var finishBtn = props.NewButton("Применить");
finishBtn.OnClick = function () {
  Make();
  Action.Finish();
};

/**
 * @param {Object3} obj
 */
function GetID(obj) {
  switch (addID) {
    case 0:
      return obj.Name;
    case 1:
      return obj.ArtPos;
    case 2:
      return obj.ArtPos || obj.Name;
  }
}
/**
 * возвращает true если объект является корнем иерархии (модель, слой).
 * @param {Object3} obj
 */
function IsRoot(obj) {
  var result = false;
  if (typeof TLayer3D != "undefined") {
    result = obj instanceof TLayer3D;
  }
  if (!result) {
    result = !obj || obj instanceof TModel3D;
  }
  return result;
}

function MakeName(owner, prevName) {
  if (IsRoot(owner)) return prevName;
  var ownerOwner = owner.Owner;
  switch (recursionType) {
    case 0:
      return GetID(owner) + delimiter + prevName;
    case 1:
      if (IsRoot(ownerOwner)) {
        return GetID(owner) + delimiter + prevName;
      }
      break;
    case 2:
      prevName = GetID(owner) + delimiter + prevName;
  }
  return MakeName(ownerOwner, prevName);
}
function CheckObject(obj) {
  if (obj.AsPanel) {
    Undo.Changing(obj);
    switch (changeType) {
      case 0:
        obj.Name = MakeName(obj.Owner, obj.Name);
        break;
      case 1:
        obj.ArtPos = MakeName(obj.Owner, GetID(obj));
        break;
    }
  } else if (obj.List) {
    var list = obj.AsList();
    for (var i = 0; i < list.Count; i++) {
      CheckObject(list[i]);
    }
  }
}
function Make() {
  for (var i = 0; i < selection.length; i++) {
    CheckObject(selection[i]);
  }
}

for (var i = 0; i < Model.SelectionCount; i++) {
  selection.push(Model.Selections[i]);
}

Action.OnFinish = function () {
  settings.Save(filename);
};

Action.Continue();
