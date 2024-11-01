import { memo } from "react";
import { IProject } from "../types";

export const Project = memo(
  ({ title, description, onRemove, onEdit }: IProject) => {
    return (
      <div className="w-full flex flex-col items-start py-4 px-8 rounded-lg shadow-md border relative">
        <div className="absolute right-2 z-10 flex flex-col items-end">
          <p
            className="cursor-pointer text-red-500"
            onClick={() => onRemove && onRemove()}
          >
            Remove
          </p>
          <p
            className="cursor-pointer text-gray-600"
            onClick={() => onEdit && onEdit()}
          >
            Edit
          </p>
        </div>
        <span className="flex items-center">
          <p className="font-semibold mr-2">Title:</p>
          <p className="w-max">{title}</p>
        </span>
        <span className="flex items-center">
          <p className="font-semibold mr-2"> Description:</p>
          <p className="w-max">{description}</p>
        </span>
      </div>
    );
  }
);
