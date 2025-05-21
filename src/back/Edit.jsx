import React, { useRef, useState } from "react";

const FolderIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#363636" strokeWidth="2">
    <rect x="3" y="8" width="18" height="10" rx="2"/>
    <polyline points="9 12 12 15 15 12" />
  </svg>
);

function Edit({ image, title: initialTitle, desc: initialDesc, onSave }) {
  const fileInput = useRef();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(initialTitle || "");
  const [desc, setDesc] = useState(initialDesc || "");
  const [saved, setSaved] = useState(false);

  const isTitleValid = title.length > 0 && title.length <= 20;
  const isDescValid = desc.length > 0 && desc.length <= 200;
  const isFileValid = !!(file || image);
  const canSave = isTitleValid && isDescValid && isFileValid;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      if (onSave) {
        onSave({
          image: file ? URL.createObjectURL(file) : image,
          title,
          desc,
        });
      }
    }, 800); // 저장 효과 후 상세로 이동
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: 0, margin: 0 }}>
      <header style={{ textAlign: "center", padding: "64px 0 0 0" }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 64,
          fontWeight: 400,
          margin: 0
        }}>
          Image Gallery
        </h1>
      </header>
      <main style={{ maxWidth: 700, margin: "80px auto 0 auto", padding: "0 16px" }}>
        {/* Image Upload */}
        <div style={{ marginBottom: 40 }}>
          <label style={{ fontWeight: 600, fontSize: 22, display: "block", marginBottom: 16 }}>
            Image <span style={{ color: "#000" }}>*</span>
          </label>
          <div
            style={{
              border: "1px solid #B2B2B2",
              borderRadius: 2,
              background: "#fff",
              minHeight: 380,
              minWidth: 380,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              cursor: "pointer"
            }}
            onClick={() => fileInput.current.click()}
          >
            {file || image ? (
              <img
                src={file ? URL.createObjectURL(file) : image}
                alt="preview"
                style={{ width: 380, height: 380, objectFit: "cover" }}
              />
            ) : (
              <span style={{ display: "flex", alignItems: "center", color: "#363636", fontSize: 20 }}>
                <FolderIcon />
                <span style={{ marginLeft: 12 }}>
                  Drag and drop your file here.
                </span>
              </span>
            )}
            <input
              type="file"
              accept="image/png"
              style={{ display: "none" }}
              ref={fileInput}
              onChange={handleFileChange}
            />
          </div>
          <button
            type="button"
            style={{
              border: "1px solid #000",
              background: "#fff",
              borderRadius: 2,
              fontSize: 20,
              padding: "12px 32px",
              marginBottom: 0
            }}
            onClick={() => fileInput.current.click()}
          >
            My PC
          </button>
        </div>
        {/* Title */}
        <div style={{ marginBottom: 40 }}>
          <label style={{ fontWeight: 600, fontSize: 22, display: "block", marginBottom: 8 }}>
            Title <span style={{ color: "#000" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Text Filled"
            value={title}
            maxLength={20}
            onChange={e => setTitle(e.target.value)}
            style={{
              width: "100%",
              fontSize: 22,
              padding: "14px 12px",
              border: "1px solid #B2B2B2",
              borderRadius: 2,
              marginBottom: 4,
              background: "#fff"
            }}
          />
          <div style={{ fontSize: 14, color: "#363636" }}>
            *Please enter no more than 20 characters.
          </div>
        </div>
        {/* Description */}
        <div style={{ marginBottom: 80 }}>
          <label style={{ fontWeight: 600, fontSize: 22, display: "block", marginBottom: 8 }}>
            Description <span style={{ color: "#000" }}>*</span>
          </label>
          <textarea
            placeholder="Description"
            value={desc}
            maxLength={200}
            onChange={e => setDesc(e.target.value)}
            style={{
              width: "100%",
              fontSize: 20,
              padding: "18px 12px",
              border: "1px solid #B2B2B2",
              borderRadius: 2,
              marginBottom: 4,
              background: "#fff",
              minHeight: 80,
              resize: "none"
            }}
          />
          <div style={{ fontSize: 14, color: "#363636" }}>
            *Please enter no more than 200 characters.
          </div>
        </div>
        {/* Save Button */}
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <button
            style={{
              border: "1px solid #363636",
              background: canSave ? "#000" : "#fff",
              borderRadius: 2,
              fontSize: 22,
              padding: "14px 40px",
              color: canSave ? "#fff" : "#B2B2B2",
              cursor: canSave ? "pointer" : "not-allowed",
              transition: "all 0.2s"
            }}
            disabled={!canSave}
            onClick={handleSave}
          >
            {saved ? "Changes Saved" : "Save Changes"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Edit;