/**
 * Скрипт на сортування елементів всередині моделі
 */

UnSelectAll();

const forEachInList = (list) => {
  // Рекурсивний обхід об'єкту
  for (let i = list.Count - 1; i >= 0; i--) {
    const elem = list[i];
    if (
      (elem instanceof TFurnBlock || elem instanceof TDraftBlock) &&
      !elem.JointData
    ) {
      forEachInList(elem);
    }
  }

  // Лічильник
  let counter = 0;

  // Об'єкт для структурованого сортування
  let obj = {
    arrSystem: [],
    arrTFurnPanel: [],
    arrTExtrusionBody: [],
    arrT2DTrajectoryBody: [],
    arrTFurnBlock: [],
    arrFastSchemes: [],
    arrTFurnAsm: [],
    arrTFastener: [],
    arrOther: [],
  };

  // Сортування посилань на об'єкти по типам
  for (let i = 0; i < list.Count; i++) {
    const item = list[i];
    if (item instanceof TModelLimits) {
      obj.arrSystem.push(item);
    } else if (item instanceof TFurnPanel) {
      obj.arrTFurnPanel.push(item);
    } else if (item instanceof TExtrusionBody) {
      obj.arrTExtrusionBody.push(item);
    } else if (item instanceof T2DTrajectoryBody) {
      obj.arrT2DTrajectoryBody.push(item);
    } else if (item instanceof TFurnBlock && !item.JointData) {
      obj.arrTFurnBlock.push(item);
    } else if (item instanceof TDraftBlock) {
      obj.arrTFurnBlock.push(item);
    } else if (item instanceof TFurnBlock && item.JointData) {
      obj.arrFastSchemes.push(item);
    } else if (item instanceof TFurnAsm) {
      obj.arrTFurnAsm.push(item);
    } else if (item instanceof TFastener) {
      obj.arrTFastener.push(item);
    } else {
      obj.arrOther.push(item);
    }
  }

  for (let key in obj) {
    if (obj[key].lenght > 0) {
      if (key == "arrTFurnPanel" || key == "arrTExtrusionBody") {
        // Приміняємо функцію сортування об'єктів по матеріалу
        obj[key].sort(sortByField("MaterialName"));
      }

      if (
        key == "arrFastSchemes" ||
        key == "arrTFurnAsm" ||
        key == "arrTFastener"
      ) {
        // Приміняємо функцію сортування об'єктів по імені
        obj[key].sort(sortByField("Name"));
      }
    }
  }

  // Змінюємо індекси елементів в структурі блока
  for (const key in obj) counter = changeOwnerIndex(obj[key], counter);

  // Записуємо зміни в історію
  Undo.Changing(list);
  list.Build();
};

/**
 * Функція зміни позиції елемента в структурі блока (моделі)
 * @param {List} arr
 * @param {Number} counter
 * @returns {Number}
 */

const changeOwnerIndex = (arr, counter) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    item.OwnerIndex = counter;
    counter++;
    Undo.Changing(item);
    item.Build();
  }
  return counter;
};

/**
 * Функція сортування по полю
 * @param {String} Field
 * @returns
 */

const sortByField = (field) => {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
};

const main = () => {
  Action.BlinkHint = "Йде обробка";

  if (Model.SelectionCount === 0) {
    forEachInList(Model);
  } else {
    for (let i = 0; i < Model.SelectionCount; i++) {
      const elem = Model.Selections[i];
      if (
        (elem instanceof TFurnBlock || elem instanceof TDraftBlock) &&
        !elem.JointData
      ) {
        forEachInList(elem.asList());
      }
    }
  }
  alert("Скрипт успішно здійснив обробку");
};

main();

Action.Finish();
