import { PropsWithChildren, ReactNode } from 'react';

import { ChildAttributesItem } from '../types';

export class ChildComponent<TProps> {
  public elementAttributes?: (props: PropsWithChildren<TProps>) => (ChildAttributesItem<TProps> | void);
  public content?: (props: PropsWithChildren<TProps>) => any;
  public customCells?: (props: PropsWithChildren<TProps>) => (JSX.Element | ReactNode | string | null)[];
}
