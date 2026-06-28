import MidnightTemplate from './MidnightTemplate';
import AuroraTemplate from './AuroraTemplate';
import EmberTemplate from './EmberTemplate';

export const TEMPLATES = [
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Dark navy & purple glow. Sleek and futuristic.',
    palette: ['#070c1b', '#0f1629', '#6366f1', '#8b5cf6', '#e2e8f0'],
    component: MidnightTemplate,
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Clean white cards with teal & emerald accents.',
    palette: ['#f1f5f9', '#ffffff', '#0d9488', '#0891b2', '#0f172a'],
    component: AuroraTemplate,
  },
  {
    id: 'ember',
    name: 'Ember',
    description: 'Charcoal dark with warm amber. Editorial style.',
    palette: ['#111111', '#1c1c1c', '#f59e0b', '#fb923c', '#fafafa'],
    component: EmberTemplate,
  },
];

export function getTemplate(id) {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
}

export { MidnightTemplate, AuroraTemplate, EmberTemplate };
