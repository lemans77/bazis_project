var weight = 0;

Model.forEachPanel(function (panel){
    if ((panel.AsPanel) && (panel.Selected)) {
        V = (panel.GSize.x) *
            (panel.GSize.y) *
            (panel.GSize.z) / 1000 / 1000;

        den = 0;
        if (panel.MaterialName.indexOf("ДСП") >=0)
        {
           den = 0.8;
        } else
            {
            if (panel.MaterialName.indexOf("ДВП") >=0)
              {
                 den = 0.35;
              }
              else
                if (panel.MaterialName.indexOf("МДФ") >=0)
                {
                   den = 0.9;
                }

            }
        weight = weight + V * den;
    }

})

alert('Примерный вес панелей: ' + weight.toFixed(3) + ' кг');