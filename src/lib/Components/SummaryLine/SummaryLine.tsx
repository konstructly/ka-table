import React, { FC } from 'react';
import defaultOptions from '../../defaultOptions';
import { ISummaryLine } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';

export const SummaryLine: FC<ISummaryLine> = (props) => {
  const {childComponents, columns, groupColumnsCount} = props;
  const {
    elementAttributes,
    content,
    customCells,
  } = getElementCustomization({className: defaultOptions.css.summaryLineRow}, props, childComponents.summaryLine)

  return (
    <>
      <tr {...elementAttributes}>
        {content ||
          <th colSpan={columns.length + groupColumnsCount} className={`${defaultOptions.css.summaryLineCell} ${defaultOptions.css.theadCell}`}>
            All
          </th>
        }
        {customCells?.map((customCell, index) => (
          <th key={customCell ? Object.entries(customCell).flat().join("-") : index} className={`${defaultOptions.css.summaryLineCell} ${defaultOptions.css.theadCell}`}>
            {customCell}
          </th>
        ))}
      </tr>
    </>
  )
}
