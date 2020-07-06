import { initializeBlock } from '@airtable/blocks/ui';
import React from 'react';
import OnlineClassroomLogistics from './OnlineClassroomLogistics';

const App = () => (
  <OnlineClassroomLogistics />
);

initializeBlock(() => <App />);
