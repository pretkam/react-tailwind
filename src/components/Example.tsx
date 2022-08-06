import { useState } from "react";

export default function Example() {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(["React", "Tailwind", "TypeScript", "Vite"]);

  const addTag = () => {
    if (tag.trim() === "" || tags.find((t) => tag == t)) return;
    setTags((tags) => [...tags, tag]);
    setTag("");
  };

  const removeTag = (remove: string) =>
    setTags((tags) => tags.filter((tag) => tag !== remove));

  return (
    <div className="border rounded-lg h-fit p-5 bg-slate-50 w-full md:w-fit md:max-w-[50%] md:max-h-screen overflow-auto">
      <div className="text-center">
        <h2 className="font-semibold text-lg mb-2">Example Component</h2>
        <input
          type="text"
          className="px-1 border mr-2"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button
          className="border rounded-sm px-1 hover:cursor-pointer"
          onClick={addTag}
        >
          Add tag
        </button>
      </div>
      <div className="mt-2">
        <p className="font-medium mb-2 text-center">Tags</p>
        <div className="flex flex-wrap border rounded-md">
          {tags.map((tag) => (
            <span
              className="px-2 py-1 border rounded-sm m-1 bg-white break-all"
              key={tag}
            >
              {tag}{" "}
              <button className="border px-1" onClick={() => removeTag(tag)}>
                {" "}
                x
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
