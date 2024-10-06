import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.css"
import { tags } from "../../notes";

const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
  
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
  
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
  
      ["clean"],
    ],
  };

export default function Editor(){
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);

	function removeTags (indexToRemove) {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};

	function addTags (event) {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};

    return (
        <form style={{backgroundColor: "white", display: "flex", flexDirection: "column", margin: "1em", gap: "1em", borderRadius: "6px" }}>
            <input
                style={{height: "50px", fontSize: "18px", marginLeft: "1em", marginTop: "1em", marginRight: "1em"}}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title here"
            />

            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                className="ql-lightbg"
                style={{ height: "5in", margin: "1em"}}
            />
            <div className="flex items-center justify-between">
            <div className="tags-input mt-16 ml-4 mb-5">
                <ul id="tags">
                    {tags.map((tag, index) => (
                        <li key={index} className="tag">
                            <span className='tag-title'>{tag}</span>
                            <span className='tag-close-icon'
                                onClick={() => removeTags(index)}
                            >
                                x
                            </span>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                    placeholder="Press enter to add tags"
                />
            </div>
    
            <button class="mt-10 mr-4 rounded-md border border-transparent py-2 px-4 flex items-center text-center transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                Back
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 ml-1.5">
                    <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
            </button>
            </div>
            
        </form>
      );
}


function TagsInput(){
	const [tags, setTags] = useState([]);

	function removeTags (indexToRemove) {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};

	function addTags (event) {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};

	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
				placeholder="Press enter to add tags"
			/>
		</div>
	);
};