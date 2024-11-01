import { memo, useEffect, useState } from "react";
import { Header, Loading, ModalProject, Project } from "../components";
import { useProjects } from "../hooks";
import { IModalProject } from "../types";

const MainPage = memo(() => {
  const {
    loading,
    projects,
    onFetchProjectList,
    removeProject,
    page,
    setPage,
  } = useProjects();

  const [modalInput, setModalInput] = useState<IModalProject>({
    isOpen: false,
    type: "create",
    selected: null,
  });

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page - 1);

  useEffect(() => {
    onFetchProjectList();
  }, [page]);

  return (
    <div className="h-full w-full overflow-auto">
      <Header />
      <div
        className="w-max px-4 py-2 rounded-lg border shadow-md bg-blue-500 cursor-pointer mb-4"
        onClick={() =>
          setModalInput({ isOpen: true, type: "create", selected: null })
        }
      >
        <p className="text-white font-semibold">Add Project</p>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full h-full grid grid-cols-2 gap-4 overflow-auto">
          {!projects.length ? (
            <p className="text-center">There is no more project to fetch</p>
          ) : (
            projects.map((item) => (
              <Project
                key={item.id.toString()}
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
            ))
          )}
          <div className="absolute bottom-4 right-[10%] w-40 flex justify-between">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`p-2 ${
                page > 1 ? "cursor-pointer" : "text-gray-500"
              } `}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={!projects.length}
              className={`p-2 ${
                projects.length > 0
                  ? "text-black cursor-pointer"
                  : "text-gray-500"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
      <ModalProject
        isOpen={modalInput.isOpen}
        onClose={() =>
          setModalInput({ isOpen: false, type: "create", selected: null })
        }
        callback={onFetchProjectList}
        type={modalInput.type}
        extraData={modalInput.selected}
      />
    </div>
  );
});

export default MainPage;
