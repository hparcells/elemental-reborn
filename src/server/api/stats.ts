import { app } from 'fullstack-system';

import { elementExists } from '../database/elements';
import { getElementCount, getFlowchartData, getSankeyData } from '../database/stats';

app.get('/api/element-count', async (req, res) => {
  res.send(await getElementCount());
});

app.get('/api/sankey/:elementId', async (req, res) => {
  const elementId = Number(req.params.elementId);

  if (elementExists(elementId)) {
    res.send(await getSankeyData(elementId));
  }
  res.end();
});

app.get('/api/flowchart/:elementId', async (req, res) => {
  const elementId = Number(req.params.elementId);

  if (elementExists(elementId)) {
    res.send(await getFlowchartData(elementId));
  }
  res.end();
});
