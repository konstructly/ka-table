import { Column } from '../models';
import { Group } from '../Models/Group';
import { FormatFunc } from '../types';
import { getValueByColumn } from './DataUtils';
import { objectToString } from './CommonUtils';

export const groupMark = {};
export const groupSummaryMark = {};

const getGroupSummary = (groupData: any[], key: any, groupIndex: any) => ({ groupData, groupSummaryMark, key: JSON.stringify([key, '--:+summary--']), groupIndex });

export const updateExpandedGroups = (groupsExpanded: any[][], groupKey: any[]): any[][] => {
  const newGroupsExpanded =
    groupsExpanded.filter((ge) => JSON.stringify(ge) !== JSON.stringify(groupKey));
  if (newGroupsExpanded.length === groupsExpanded.length) {
    newGroupsExpanded.push(groupKey);
  }
  return newGroupsExpanded;
};

export const getExpandedGroups = (groupedData: any[]): any[][] => {
  return groupedData
    .filter((g) => g.groupMark === groupMark)
    .map((g) => g.key);
};

export const getGroupedData = (
  data: any[],
  groups: Group[],
  groupedColumns: Column[],
  groupsExpanded?: any[]): any[] => {
  const grouped = getGroupedStructure(data, groups, groupedColumns, 0, groupsExpanded) as Map<any, any>;
  return convertToFlat(grouped);
};

export const convertToFlat = (grouped: Map<any, any>, key: any[] = []) => {
  let result: any[] = [];
  grouped.forEach((value: any, groupValue: any) => {
    if (groupValue === groupSummaryMark){
      result.push(value);
    } else {
      const groupKey = [...key];
      groupKey.push(groupValue);
      result.push({ groupMark, key: groupKey, value: groupValue });
      result = [...result, ...(Array.isArray(value) ? value : convertToFlat(value, groupKey))];
    }
  });
  return result;
};

export const getGroupedStructure = (
  data: any[],
  groups: Group[],
  groupedColumns: Column[],
  expandedDeep: number = 0,
  groupsExpanded?: any[],
  parentGroupKey: any[] = []
): Map<any, any> | void => {
  groups = [...groups];
  const group = groups.shift();
  if (group) {
    const column = groupedColumns && groupedColumns.find((g) => g.key === group.columnKey);
    if (column) {
      const grouped = groupBy(data, (item: any) => getValueByColumn(item, column), false, column.getGroupKey);
      grouped.forEach((groupData, key) => {
        const groupExpandedItems = groupsExpanded && groupsExpanded.filter((ge) => ge[expandedDeep] === key);
        const isGroupExpanded = !groupExpandedItems
          || groupExpandedItems.some((ge) => ge.length === expandedDeep + 1);
        if (isGroupExpanded) {
          const fullKey =  [...parentGroupKey, key];
          const newStructure = getGroupedStructure(
            groupData,
            groups,
            groupedColumns,
            expandedDeep + 1,
            groupExpandedItems && groupExpandedItems.filter((ge) => ge.length > expandedDeep + 1),
            fullKey
          );

          if (newStructure) {
            if (group.enableSummary){
              newStructure.set(groupSummaryMark, getGroupSummary(groupData, fullKey, expandedDeep));
            }
            grouped.set(key, newStructure);
          } else if (group.enableSummary) {
            groupData.push(getGroupSummary([...groupData], fullKey, expandedDeep));
          }
        } else {
          grouped.set(key, []);
        }
      });
      return grouped;
    }
  }
};

export const groupBy = (data: any[], keyGetter: any, isEmptyValue: boolean = false, groupKeyGetter?: (item: any) => string) => {
  const map = new Map();
  data.forEach((item) => {
    const key = (() => {
      if (typeof item !== 'object') {
        return keyGetter(item)
      }

      if (groupKeyGetter) {
        return groupKeyGetter(keyGetter(item))
      }

      return objectToString(keyGetter(item))
    })();

    if (isEmptyValue) {
      map.set(key, []);
    } else {
      const collection = map.get(key);
      if (!collection) {
          map.set(key, [item]);
      } else {
          collection.push(item);
      }
    }
  });
  return map;
};

export const getGroupMark = () => groupMark;

export const getGroupText = (value: any, column: Column, format?: FormatFunc) => {
  return format ? format({ column, value }) : `${(column && column.title ? column.title + ': ' : '')}${value}`;
};
