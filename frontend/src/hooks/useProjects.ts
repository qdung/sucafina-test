import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProjectList } from "../store/projects";
import { RootState, AppDispatch } from "../store";

export interface IProject {
  id: string;
  title: string;
  description: string;
}

export const useProjects = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const projectSelector = useSelector((state: RootState) => state.projects);
  const projectList = projectSelector.projectList;

  const onFetchProjectList = useCallback(async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/projects", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const json = await response.json();
    setProjects(json.data);
    dispatch(updateProjectList(json.data));
    setLoading(false);
  }, [dispatch]);

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

  useEffect(() => {
    onFetchProjectList();
  }, []);

  const memoizedProjects = useMemo(() => projects, [projects]);

  return {
    projects: memoizedProjects,
    projectList,
    loading,
    updateProjects: onFetchProjectList,
    removeProject,
  };
};
