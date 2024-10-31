import { memo, useRef, useState } from "react";
import { Header, Loading, ModalProject, Project } from "../components";
import { IProject, useProjects } from "../hooks";

interface ModalProject {
  isOpen: boolean;
  type: "create" | "edit";
  selected: IProject | null;
}

const MainPage = memo(() => {
  const { loading, projects, updateProjects, removeProject } = useProjects();

  const [modalInput, setModalInput] = useState<ModalProject>({
    isOpen: false,
    type: "create",
    selected: null,
  });

  return (
    <div className="h-full w-full overflow-auto">
      <Header />
      <div
        className="w-max px-4 py-2 rounded-lg border shadow-md bg-blue-500 cursor-pointer mb-4"
        onClick={() =>
          setModalInput({ isOpen: false, type: "create", selected: null })
        }
      >
        <p className="text-white font-semibold">Add Project</p>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full h-full grid grid-cols-2 gap-4 overflow-auto">
          {projects.map((item) => (
            <Project
              key={item.id}
              {...item}
              onRemove={async () => {
                const confirmed = confirm(
                  "Do you want to remove this project?"
                );
                if (confirmed) await removeProject(item.id);
              }}
              onEdit={() => {
                setModalInput({ isOpen: true, type: "edit", selected: item });
              }}
            />
          ))}
        </div>
      )}
      <ModalProject
        isOpen={modalInput.isOpen}
        onClose={() =>
          setModalInput({ isOpen: false, type: "create", selected: null })
        }
        callback={updateProjects}
        type={modalInput.type}
        extraData={modalInput.selected}
      />
    </div>
  );
});

export default MainPage;
