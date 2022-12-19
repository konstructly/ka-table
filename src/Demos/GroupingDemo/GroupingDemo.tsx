import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType, EditingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

const dataArray = [
  { id: 1, type: 'Cat', name: { firstName: 'Kas', lastName: 'KasKas'}, country: 'Czech Republic', age: 2, location: { street: 'Some street', building: 5 } },
  { id: 2, type: 'Dog', name: { firstName: 'Rex', lastName: 'RexRex'}, country: 'Montenegro', age: 6, location: { street: 'Some street 2', building: 2 } },
  { id: 3, type: 'Cat', name: { firstName: 'Simba', lastName: 'SimbaSimba'}, country: 'France', age: 12, location: { street: 'Some street 2', building: 3 } },
  { id: 4, type: 'Dog', name: { firstName: 'Beethoven', lastName: 'BeethovenBeethoven'}, country: 'Czech Republic', age: 3, location: { street: 'Some street', building: 5 } },
  { id: 5, type: 'Cat', name: { firstName: 'Hash', lastName: 'HashHash'}, country: 'Czech Republic', age: 8, location: { street: 'Some street', building: 4 } },
];

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'type', title: 'TYPE', dataType: DataType.String },
    { key: 'name', title: 'NAME', dataType: DataType.Object, getGroupKey: (item: any) => `${item.firstName} ${item.lastName}` },
    { key: 'country', title: 'COUNTRY', dataType: DataType.String },
    { key: 'age', title: 'AGE', dataType: DataType.Number, width: '50%' },
    { key: 'location', title: 'Location', dataType: DataType.Object, getGroupKey: (item: any) => `${item.street} ${item.building}` },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  groups: [{ columnKey: 'location' }, { columnKey: 'name' }],
  rowKeyField: 'id',
};

const GroupingDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <Table
      {...tableProps}
      dispatch={dispatch}
    />
  );
};

export default GroupingDemo;
