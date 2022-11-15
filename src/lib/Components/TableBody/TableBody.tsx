import defaultOptions from '../../defaultOptions';
import { ITableBodyProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import TableBodyContent from '../TableBodyContent/TableBodyContent';
import React from 'react';

const TableBody: React.FunctionComponent<ITableBodyProps> = (props) => {
  const {
    childComponents,
    isTableBodyCollapsed
  } = props;

  const {elementAttributes, content} = getElementCustomization({
    className: defaultOptions.css.tbody,
  }, props, childComponents.tableBody);

  return (
    isTableBodyCollapsed === undefined || isTableBodyCollapsed ?
      (
        <tbody {...elementAttributes}>
          {content || <TableBodyContent {...props} />}
        </tbody>
      ) : null
  );
};

export default TableBody;
