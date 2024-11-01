import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProjectList } from "../store/projects";
import { RootState, AppDispatch } from "../store";
import { IProject } from "../types";

export const useProjects = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const dispatch: AppDispatch = useDispatch();
  const projectSelector = useSelector((state: RootState) => state.projects);
  const projectList = projectSelector.projectList;

  const onFetchProjectList = async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:3000/projects?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const json = await response.json();
    setProjects(json.data);
    dispatch(updateProjectList(json.data));
    setLoading(false);
  };

  const removeProject = async (projectId: string) => {
    try {
      await fetch(`http://localhost:3000/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      onFetchProjectList();
    } catch (error) {
      console.log(error);
    }
  };

  const memoizedProjects = useMemo(() => projects, [projects]);

  return {
    projects: memoizedProjects,
    projectList,
    loading,
    removeProject,
    onFetchProjectList,
    page,
    setPage,
  };
};
