import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react"; // Ensure correct import

// eslint-disable-next-line react/prop-types
const TextEditor = ({ handleChange, editorValue = "" }) => {
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content) => {
    setEditorContent(content); // Save content to the state
    handleChange(content); // Pass the content to the parent component (optional)
  };

  useEffect(() => {
    setEditorContent(editorValue);
  }, [editorValue]);

  return (
    <div>
      <Editor
        apiKey="20yyf3kmcyczhw2uf1wzl8dhegyzhzimodm879yxo82yxghz" // Replace with your API key
        value={editorContent} // Bind value to the state
        onEditorChange={handleEditorChange} // Update the state on content change
        init={{
          height: 500,
          menubar: true,
          plugins: [
            // Core editing features
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
            // Your account includes a free trial of TinyMCE premium features
            // Try the most popular premium features until Nov 22, 2024:
            "checklist",
            "mediaembed",
            "casechange",
            "export",
            "formatpainter",
            "pageembed",
            "a11ychecker",
            "tinymcespellchecker",
            "permanentpen",
            "powerpaste",
            "advtable",
            "advcode",
            "editimage",
            "advtemplate",
            "mentions",
            "tableofcontents",
            "footnotes",
            "mergetags",
            "autocorrect",
            "typography",
            "inlinecss",
            "markdown",
            "importword",
            "exportword",
            "exportpdf",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        }}
      />
    </div>
  );
};

export default TextEditor;
