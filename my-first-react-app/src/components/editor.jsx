import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import "./editor.css"
import { useNoteEditor } from '../hooks/useNoteEditor';
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

export default function Editor() {
  const { state, dispatch, removeTags, addTags, handleSubmit} = useNoteEditor();

  return (
    <form onSubmit={handleSubmit} style={{backgroundColor: "white", display: "flex", flexDirection: "column", margin: "1em", gap: "1em", borderRadius: "6px" }}>
      <input
        style={{height: "50px", fontSize: "18px", marginLeft: "1em", marginTop: "1em", marginRight: "1em"}}
        type="text"
        value={state.title}
        onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
        placeholder="Enter title here"
      />
      <ReactQuill
        theme="snow"
        value={state.content}
        onChange={(content) => dispatch({ type: 'SET_CONTENT', payload: content })}
        modules={modules}
        className="ql-lightbg"
        style={{ height: "5in", margin: "1em"}}
      />
      <div className="flex items-center justify-between">
        <div className="tags-input mt-16 ml-4 mb-5">
          <ul id="tags">
            {state.displayTags.map((tag, index) => (
              <li key={index} className="tag">
                <span className='tag-title'>{tag}</span>
                <span className='tag-close-icon' onClick={() => removeTags(index, tag)}>x</span>
              </li>
            ))}
          </ul>
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); 
                addTags(e);
              }
            }}
            placeholder="Press enter to add tags"
          />
        </div>
        <button className="mt-10 mr-4 rounded-md border border-transparent py-2 px-4 flex items-center text-center transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">
          Back
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
            <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </form>
  );
}