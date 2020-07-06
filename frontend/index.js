import { initializeBlock } from '@airtable/blocks/ui';
import React from 'react';
import AssignEasy from './AssignEasy';

const App = () => (
  <AssignEasy />
);

initializeBlock(() => <App />);
