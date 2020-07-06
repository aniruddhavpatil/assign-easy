import React from 'react';
import { useBase, useRecords } from '@airtable/blocks/ui';

const Temp = () => {
  const base = useBase();
  const table = base.tables[0];
  const records = useRecords(table, { fields: ['Name'] });
  return (
    <ul>
      {records.map((record) => <li key={record.id}>{record.getCellValueAsString('Name')}</li>)}
    </ul>
  );
};

export default Temp;
