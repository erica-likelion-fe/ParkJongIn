import React, { useRef, useState } from "react";
import Posting from "./Posting";
import Edit from "./Edit";

// 좌측 상단 메인으로 버튼
function MainButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        top: 24,
        left: 24,
        background: "#fff",
        border: "1px solid #363636",
        borderRadius: 8,
        padding: "8px 18px",
        fontSize: 18,
        fontWeight: 600,
        zIndex: 2000,
        boxShadow: "0 2px 8px #0001",
        cursor: "pointer"
      }}
    >
      🏠 메인으로
    </button>
  );
}

const FolderIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#363636" strokeWidth="2">
    <rect x="3" y="8" width="18" height="10" rx="2"/>
    <polyline points="9 12 12 15 15 12" />
  </svg>
);

function Popup({ onClose, onViewPost }) {
  return (
    <div style={{
      position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.18)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 32, padding: "48px 32px 32px 32px", minWidth: 400, textAlign: "center", boxShadow: "0 4px 32px #0002"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", right: 32, top: 32, background: "none", border: "none", fontSize: 32, cursor: "pointer"
        }}>&times;</button>
        <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 16, marginTop: 16 }}>Post published!<br />Do you want to see it?</div>
        <button style={{
          width: "100%", background: "#000", color: "#fff", border: "none", borderRadius: 32, fontSize: 26, padding: "16px 0", margin: "24px 0 0 0", fontWeight: 600
        }} onClick={onViewPost}>VIEW POST !</button>
        <div style={{ fontSize: 26, marginTop: 32, cursor: "pointer" }} onClick={onClose}>CANCEL</div>
      </div>
    </div>
  );
}

function DeletePopup({ onClose, onDelete }) {
  return (
    <div style={{
      position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.18)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 32, padding: "48px 32px 32px 32px", minWidth: 400, textAlign: "center", boxShadow: "0 4px 32px #0002"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", right: 32, top: 32, background: "none", border: "none", fontSize: 32, cursor: "pointer"
        }}>&times;</button>
        <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, marginTop: 16 }}>
          Are you sure you want to<br />delete this post?
        </div>
        <button style={{
          width: "100%", background: "#000", color: "#fff", border: "none", borderRadius: 32, fontSize: 20, padding: "14px 0", margin: "24px 0 0 0", fontWeight: 600
        }} onClick={onDelete}>DELETE</button>
        <div style={{ fontSize: 20, marginTop: 32, cursor: "pointer" }} onClick={onClose}>CANCEL</div>
      </div>
    </div>
  );
}

function PostingDisabled({ post, onGoMain, onSave, mode = "create" }) {
  const fileInput = useRef();
  const [file, setFile] = useState(post?.file || null);
  const [title, setTitle] = useState(post?.title || "");
  const [desc, setDesc] = useState(post?.desc || "");
    React.useEffect(() => {
    setFile(post?.file || null);
    setTitle(post?.title || "");
    setDesc(post?.desc || "");
    setShowPosting(!!post); // post가 바뀔 때 showPosting도 동기화
  }, [post]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPosting, setShowPosting] = useState(!!post);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const isTitleValid = title.length > 0 && title.length <= 20;
  const isDescValid = desc.length > 0 && desc.length <= 200;
  const isFileValid = !!file;
  const canSubmit = isTitleValid && isDescValid && isFileValid;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleBackToForm = () => {
    setShowPosting(false);
    setFile(null);
    setTitle("");
    setDesc("");
    setShowPopup(false);
    setShowEdit(false);
  };

  const handleEdit = () => {
    setShowEdit(true);
  };

  // Edit 저장 시
  const handleSaveEdit = ({ image, title, desc, file: newFile }) => {
    setShowEdit(false);
    setTitle(title);
    setDesc(desc);
    if (newFile) {
      setFile(newFile);
    }
    setShowPosting(true);
  };

  // 삭제 버튼 클릭 시 팝업 오픈
  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  // 삭제 팝업에서 DELETE 클릭 시
  const handleDelete = () => {
    setFile(null);
    setTitle("");
    setDesc("");
    setShowPosting(false);
    setShowEdit(false);
    setShowDeletePopup(false);
    setShowPopup(false);
    if (onGoMain) onGoMain();
  };
    // Submit Post 버튼 클릭 시
  const handleSubmit = () => {
    if (onSave) {
      onSave({
        image: file ? URL.createObjectURL(file) : "",
        title,
        desc,
        file,
      });
    }
    setShowPopup(false);
    setShowPosting(true);
  };

  // 1. 수정 모드
  if (showEdit) {
    return (
      <>
        <MainButton onClick={onGoMain} />
        <Edit
          image={file ? URL.createObjectURL(file) : ""}
          title={title}
          desc={desc}
          onSave={handleSaveEdit}
        />
      </>
    );
  }

  // 2. 상세 보기 모드
  if (showPosting) {
    const imageUrl = file ? URL.createObjectURL(file) : "";
    return (
      <>
        <MainButton onClick={onGoMain} />
        <Posting
          image={imageUrl}
          title={title}
          desc={desc}
          date={new Date().toISOString().slice(0, 10).replace(/-/g, ".")}
          onBack={handleBackToForm}
          onEdit={handleEdit}
          onDeleteClick={handleDeleteClick}
        />
        {showDeletePopup && (
          <DeletePopup
            onClose={() => setShowDeletePopup(false)}
            onDelete={handleDelete}
          />
        )}
      </>
    );
  }

  // 3. 생성/입력 화면
  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: 0, margin: 0 }}>
      <MainButton onClick={onGoMain} />
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
              height: 90,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              cursor: "pointer"
            }}
            onClick={() => fileInput.current.click()}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            <span style={{ display: "flex", alignItems: "center", color: "#363636", fontSize: 20 }}>
              <FolderIcon />
              <span style={{ marginLeft: 12 }}>
                {file ? file.name : "Drag and drop your file here."}
              </span>
            </span>
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
            placeholder="Text"
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
          <input
            type="text"
            placeholder="Description"
            value={desc}
            maxLength={200}
            onChange={e => setDesc(e.target.value)}
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
            *Please enter no more than 200 characters.
          </div>
        </div>
        {/* Submit Button */}
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <button
            style={{
              border: "1px solid #363636",
              background: canSubmit ? "#000" : "#fff",
              borderRadius: 2,
              fontSize: 22,
              padding: "14px 40px",
              color: canSubmit ? "#fff" : "#B2B2B2",
              cursor: canSubmit ? "pointer" : "not-allowed",
              transition: "all 0.2s"
            }}
            disabled={!canSubmit}
            onClick={() => setShowPopup(true)}
          >
            Submit Post
          </button>
        </div>
      </main>
      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)}
          onViewPost={handleSubmit}  /* 여기서 handleSubmit 호출 */
        />
      )}
    </div>
  );
}

export default PostingDisabled;