import React from 'react';

import { updateGroupsExpanded } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IGroupRowProps } from '../../props';
import { objectToString } from '../../Utils/CommonUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import EmptyCells from '../EmptyCells/EmptyCells';

const GroupRowContent: React.FunctionComponent<IGroupRowProps> = (props) => {
  const {
    childComponents,
    contentColSpan,
    dispatch,
    groupIndex,
    groupKey,
    isExpanded,
    text,
  } = props;

  const { elementAttributes, content, customCells } = getElementCustomization({
    className: defaultOptions.css.groupCell,
    colSpan: contentColSpan
  }, props, childComponents.groupCell);

  return (
    <>
      <EmptyCells count={groupIndex} key="emptyCells"/>
      <td {...{...elementAttributes, colSpan: (elementAttributes?.colSpan ?? 0) - (customCells?.length ?? 0)}}>
          <div className='ka-group-cell-content'>
            <div
              onClick={() => {
                dispatch(updateGroupsExpanded(groupKey));
              }}
              className={isExpanded
                ? defaultOptions.css.iconGroupArrowExpanded : defaultOptions.css.iconGroupArrowCollapsed}
            />
            {
              content || <div className='ka-group-text'>{text}</div>
            }
          </div>
      </td>
      {customCells?.map((customCell, index) => 
        <td {...{...elementAttributes, colSpan: undefined}} key={objectToString(customCell, index)}>
          {customCell}
        </td>
      )}
    </>
  );
};

export default GroupRowContent;
