import React, { FC } from 'react';
import defaultOptions from '../../defaultOptions';
import { ISummaryLine } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';

export const SummaryLine: FC<ISummaryLine> = (props) => {
  const {childComponents, columns, groupColumnsCount, customColumns} = props;
  const {
    elementAttributes,
    content
  } = getElementCustomization({className: defaultOptions.css.summaryLineRow}, props, childComponents.summaryLine)

  return (
    <>
      <tr {...elementAttributes}>
        {content ||
          <th colSpan={columns.length + groupColumnsCount} className={`${defaultOptions.css.summaryLineCell} ${defaultOptions.css.theadCell}`}>
            All
          </th>
        }
        {customColumns?.map((column) => <th className={`${defaultOptions.css.summaryLineCell} ${defaultOptions.css.theadCell}`}>{column}</th>)}
      </tr>
    </>
  )
}
