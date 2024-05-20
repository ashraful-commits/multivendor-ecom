import React from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const QuillEditor = ({ value, setValue }: { value: string; setValue: (value: string) => void }) => {
  return (
    <div className="w-full">
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
};

export default QuillEditor;
