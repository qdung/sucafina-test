export interface IProject {
  id: string;
  title: string;
  description: string;
  onRemove?: () => void;
  onEdit?: () => void;
}

export interface IModalProject {
  isOpen: boolean;
  type: "create" | "edit";
  selected: IProject | null;
}
