import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { IEmptyCellsProps } from '../../props';

const EmptyCells: React.FunctionComponent<IEmptyCellsProps> = ({ count, isTh, isColGroup }) => {
  return (
    <>
      {[...Array(count)].map((item, index) =>
        isColGroup ?
          <col key={index} />
          : isTh ?
            <th key={index} className={`ka-empty-cell ${defaultOptions.css.theadBackground}`} /> :
            <td key={index} className='ka-empty-cell'/>)}
    </>
  );
};

export default EmptyCells;
