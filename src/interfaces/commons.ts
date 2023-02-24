export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  rules: any;
}

export interface ListProps {
  size: number
  page: number
}

export interface PageInfoProps {
  size: number,
  page: number,
  total?: number
}