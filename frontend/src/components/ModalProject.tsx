import { useEffect, useState } from "react";
import { IModal, Modal } from "./Modal";

export const ModalProject = (props: IModal & { type: string }) => {
  const [data, setData] = useState({
    title: props?.extraData?.title ?? "",
    description: props?.extraData?.description ?? "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError("");
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(data);
    try {
      if (!data.title.length || !data.description.length) {
        setError("Title, description are required field");
        return;
      }
      const url =
        props.type === "create"
          ? "http://localhost:3000/projects"
          : `http://localhost:3000/projects/${props.extraData.id}`;
      const response = await fetch(url, {
        method: props.type === "create" ? "POST" : "PUT",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });
      const json = await response.json();
      props.callback && props.callback();
    } catch (error) {}
  };

  useEffect(() => {
    if (props.isOpen && props.extraData) {
      setData({
        title: props.extraData.title,
        description: props.extraData.description,
      });
    }
  }, [props.isOpen]);

  return (
    <Modal {...props}>
      <div className="flex flex-col items-center justify-center w-max">
        <div className="flex items-center justify-between mb-4 p-2 w-full">
          <label className="text-left w-1/3">Title</label>
          <input
            onChange={handleChange}
            className="w-2/3 ml-2 border p-2 rounded-lg h-10"
            name="title"
            placeholder="title"
            defaultValue={props?.extraData?.title}
          />
        </div>
        <div className="flex items-center justify-between mb-4 p-2 w-full">
          <label className="text-left w-1/3">Description</label>
          <textarea
            onChange={handleChange}
            className="w-2/3 ml-2 border p-2 rounded-lg h-20"
            name="description"
            placeholder="description"
            defaultValue={props?.extraData?.description}
          />
        </div>
      </div>
      {error.length > 0 &&
        ((<p className="text-red-400 mb-4">{error}</p>) as any)}
      <p
        onClick={onSubmit}
        className="mt-2 w-full p-2 rounded-lg border shadow bg-blue-500 font-semibold text-white cursor-pointer"
      >
        Submit
      </p>
    </Modal>
  );
};

const FormInput = ({
  label,
  name,
  onChange,
}: {
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <div className="flex items-center justify-between mb-4 p-2 w-full">
    <label className="text-left">{label}</label>
    <input
      onChange={onChange}
      className="w- ml-2 border p-2 rounded-lg"
      name={name}
      placeholder={`${name} of project`}
    />
  </div>
);
