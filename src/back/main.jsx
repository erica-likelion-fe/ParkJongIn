import React, { useState } from "react";
import PostingDisabled from "./Posting-Disabled";

// 예시 아이콘 컴포넌트 (SVG)
const LeftIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#363636" strokeWidth="2"><polyline points="15 6 9 12 15 18" /></svg>
);
const RightIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#363636" strokeWidth="2"><polyline points="9 6 15 12 9 18" /></svg>
);

// 샘플 이미지 데이터
const images = Array.from({ length: 16 }).map((_, i) => ({
  title: "Lorem ipsum",
  desc: 
  "Lorem ipsum dolor sit amet consectetur. At dignissim or..."
  
}));

function MainPage() {
  const [showPosting, setShowPosting] = useState(false);

  if (showPosting)
    return <PostingDisabled onGoMain={() => setShowPosting(false)} />;

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: 0, margin: 0 }}>
      {/* 헤더 */}
      <header style={{ textAlign: "center", padding: "24px 0 0 0" }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 32,
          fontWeight: 400,
          margin: 0
        }}>
          Image Gallery
        </h1>
        <button
          style={{
            margin: "16px auto 0 auto",
            display: "block",
            padding: "6px 18px",
            fontSize: 15,
            border: "1px solid #000",
            borderRadius: 4,
            background: "#fff",
            boxShadow: "0 1px 4px 0 #00000022",
            cursor: "pointer",
          }}
          onClick={() => setShowPosting(true)}
        >
          Create Post
        </button>
      </header>

      {/* 갤러리 */}
      <main style={{
        maxWidth: 1200,
        margin: "24px auto 0 auto",
        padding: "0 8px"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24
        }}>
          {images.map((img, idx) => (
            <div key={idx}>
              <div style={{
                background: "#D9D9D9",
                borderRadius: 8,
                width: "100%",
                aspectRatio: "3/4",
                marginBottom: 6,
              }} />
              <div style={{ fontWeight: 600, fontSize: 12 }}>{img.title}</div>
              <div style={{
                color: "#363636",
                fontSize: 10,
                marginTop: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}>
                {img.desc}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 페이지네이션 */}
      <footer style={{ margin: "24px 0 0 0", textAlign: "center" }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          fontSize: 14
        }}>
          <span style={{ cursor: "pointer" }}><LeftIcon /></span>
          {[...Array(10)].map((_, i) => (
            <span key={i} style={{
              fontWeight: i === 0 ? 700 : 400,
              textDecoration: i === 0 ? "underline" : "none",
              cursor: "pointer",
              minWidth: 16,
              display: "inline-block",
              textAlign: "center"
            }}>{i + 1}</span>
          ))}
          <span style={{ cursor: "pointer" }}><RightIcon /></span>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;