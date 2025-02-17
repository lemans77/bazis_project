/**
 * Зняття фаски по торцях
 */

Model.forEachPanel(function (panel){
	if ((panel.AsPanel) && (panel.Selected)) {

		Undo.Changing(panel);

		var t = panel.Thickness;
		var h = panel.ContourHeight;
		var w = panel.ContourWidth;
		var r = 1;

		// Паз 1
		{
			var cut = panel.AddCut('Паз 1');
			cut.Trajectory.AddLine(panel.GMin.x, panel.GMin.y, panel.GMax.x, panel.GMin.y);
			cut.Contour.AddArc(
				{ x: r, y: 0 },
				{ x: 0, y: r },
				{ x: r, y: r });
			cut.Contour.AddLine({ x: 0, y: r }, { x: 0, y: 0 });
			cut.Contour.AddLine({ x: 0, y: 0 }, { x: r, y: 0 })
		}

		// Паз 2
		{
			var cut = panel.AddCut('Паз 2');
			cut.Trajectory.AddLine(panel.GMin.x, panel.GMin.y, panel.GMax.x, panel.GMin.y);
			cut.Contour.AddArc(
				{ x: 0, y: t - r },
				{ x: r, y: t },
				{ x: r, y: t - r });
			cut.Contour.AddLine({ x: 0, y: t - r }, { x: 0, y: t });
			cut.Contour.AddLine({ x: 0, y: t }, { x: r, y: t })
		}

		// Паз 3
		{
			var cut = panel.AddCut('Паз 3');
			cut.Trajectory.AddLine(panel.GMin.x, panel.GMax.y, panel.GMax.x, panel.GMax.y);
			cut.Contour.AddArc(
				{ x: 0, y: r },
				{ x: -r, y: 0 },
				{ x: -r, y: r });
			cut.Contour.AddLine({ x: 0, y: r }, { x: 0, y: 0 });
			cut.Contour.AddLine({ x: 0, y: 0 }, { x: -r, y: 0 })

		}

		// Паз 4
		{
			var cut = panel.AddCut('Паз 4');
			cut.Trajectory.AddLine(panel.GMin.x, panel.GMax.y, panel.GMax.x, panel.GMax.y);
			cut.Contour.AddArc(
				{ x: -r, y: t },
				{ x: 0, y: t - r },
				{ x: -r, y: t - r });
			cut.Contour.AddLine({ x: 0, y: t - r }, { x: 0, y: t });
			cut.Contour.AddLine({ x: 0, y: t }, { x: -r, y: t })
		}

		// Паз 5
		{
			var cut = panel.AddCut('Паз 5');
			cut.Trajectory.AddLine(panel.GMin.x, panel.GMin.y, panel.GMin.x, panel.GMax.y);
			cut.Contour.AddArc(
				{ x: 0, y: r },
				{ x: -r, y: 0 },
				{ x: -r, y: r });
			cut.Contour.AddLine({ x: -r, y: 0 }, { x: 0, y: 0 });
			cut.Contour.AddLine({ x: 0, y: 0 }, { x: 0, y: r });
		}

		// Паз 6
		{
			var cut = panel.AddCut('Паз 6');
			cut.Trajectory.AddLine(panel.GMin.x, panel.GMin.y, panel.GMin.x, panel.GMax.y);
			cut.Contour.AddArc(
				{ x: -r, y: t },
				{ x: 0, y: t - r },
				{ x: -r, y: t - r });
			cut.Contour.AddLine({ x: -r, y: t }, { x: 0, y: t });
			cut.Contour.AddLine({ x: 0, y: t }, { x: 0, y: t - r });

		}

		// Паз 7
		{
			var cut = panel.AddCut('Паз 7');
			cut.Trajectory.AddLine(panel.GMax.x, panel.GMin.y, panel.GMax.x, panel.GMax.y);
			cut.Contour.AddArc(
				{ x: r, y: 0 },
				{ x: 0, y: r },
				{ x: r, y: r });
			cut.Contour.AddLine({ x: r, y: 0 }, { x: 0, y: 0 });
			cut.Contour.AddLine({ x: 0, y: 0 }, { x: 0, y: r });
		}

		// Паз 8
		{
			var cut = panel.AddCut('Паз 8');
			cut.Trajectory.AddLine(panel.GMax.x, panel.GMin.y, panel.GMax.x, panel.GMax.y);
			cut.Contour.AddArc(
				{ x: 0, y: t - r },
				{ x: r, y: t },
				{ x: r, y: t - r });
			cut.Contour.AddLine({ x: r, y: t }, { x: 0, y: t });
			cut.Contour.AddLine({ x: 0, y: t }, { x: 0, y: t - r });
		}

		panel.Build();

	}

})