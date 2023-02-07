import React, { FC } from 'react';
import { renderToString } from 'react-dom/server';
import defaultOptions from '../../defaultOptions';
import { ISummaryHeadRow } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';

export const SummaryHeadRow: FC<ISummaryHeadRow> = (props) => {
  const {childComponents, columns, groupColumnsCount} = props;
  const {
    elementAttributes,
    content,
    customCells,
  } = getElementCustomization({className: defaultOptions.css.summaryHeadRow}, props, childComponents.summaryHeadRow)

  return (
    <>
      <tr {...elementAttributes}>
        {content ||
          <th colSpan={columns.length + groupColumnsCount - (customCells?.length ?? 0)} className={`${defaultOptions.css.summaryHeadCell} ${defaultOptions.css.cell}`}>
            All
          </th>
        }
        {customCells?.map((customCell, index) => (
          <th key={`${renderToString(customCell)}:${index}`} className={`${defaultOptions.css.summaryHeadCell} ${defaultOptions.css.cell}`}>
            {customCell}
          </th>
        ))}
      </tr>
    </>
  )
}
