/**
 * Встановлення полок
 */

// Установка полок в секцию
ShelfCount = NewNumberInput('Количество полок');
ShelfCount.Value = 2;

// Отступ по краям
OffsetCount = NewNumberInput('Отступ по краям');
OffsetCount.Value = 0;

// Отступ от фронта
FrontOffsetCount = NewNumberInput('Отступ от фронта');
FrontOffsetCount.Value = 0;

SetCamera(p3dFront);
LeftPanel = GetPanel('Укажите левую панель');
RightPanel = GetPanel('Укажите правую панель');
Left = LeftPanel.GabMax.x;
Right = RightPanel.GabMin.x;
Top = GetEdge('Укажите верхнюю границу', AxisX).First.y;
Bottom = GetEdge('Укажите нижнюю границу', AxisX).First.y;

SetCamera(p3dLeft);
Back = GetEdge('Укажите заднюю границу', AxisY).First.z;
Front = GetEdge('Укажите переднюю границу', AxisY).First.z;

Count = ShelfCount.Value;
Offset = OffsetCount.Value;
FrontOffset = FrontOffsetCount.Value;
Thick = ActiveMaterial.Thickness;

PosY = Bottom;
SectionHeight = Top - Bottom;
YInc = (SectionHeight - Count * Thick) / (Count + 1);

// LCorner = OpenFurniture('Крепёж\\Уголок.f3d');

for (var k = 0; k < Count; k++) {
  PosY += YInc;
  Panel = AddHorizPanel(Left + Offset, Back, Right - Offset,
      Front - FrontOffset, PosY);
  // LCorner.Mount(Panel, LeftPanel, Left, PosY, Back + 32);
  // LCorner.Mount(Panel, RightPanel, Right, PosY, Back + 32);
  // LCorner.Mount(Panel, LeftPanel, Left, PosY, Front - 32);
  // LCorner.Mount(Panel, RightPanel, Right, PosY, Front - 32);
  PosY += Thick;
}

SetCamera(p3dFront);