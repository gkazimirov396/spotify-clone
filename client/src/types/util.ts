export type Callback = () => void;

export type Update<T extends object> = {
  id: string;
  changes: Partial<T>;
};
