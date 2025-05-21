import React from "react";

// 좌측 화살표 아이콘
const LeftIcon = () => (
  <svg width="36" height="36" fill="none" stroke="#000" strokeWidth="3">
    <polyline points="24 10 14 18 24 26" />
  </svg>
);

function Posting({ image, title, desc, date, onBack }) {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: 0, margin: 0 }}>
      {/* 헤더 */}
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
      {/* Back 버튼 */}
      <div style={{ margin: "40px 0 0 120px" }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0
          }}
          aria-label="Back"
        >
          <LeftIcon />
        </button>
      </div>
      {/* 본문 */}
      <main style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        maxWidth: 1200,
        margin: "32px auto 0 auto",
        gap: 48
      }}>
        {/* 이미지 */}
        <div>
          <img
            src={image}
            alt={title}
            style={{
              width: 380,
              height: 380,
              objectFit: "cover",
              borderRadius: 0,
              background: "#eee"
            }}
          />
        </div>
        {/* 텍스트 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: 120,
            marginBottom: 0,
          }}>
            <div style={{
              fontWeight: 700,
              fontSize: 56,
              lineHeight: 1.1,
              textAlign: "left",
              flex: 1,
              wordBreak: "break-all"
            }}>{title}</div>
            <div style={{
              textAlign: "right",
              fontSize: 16,
              color: "#363636",
              marginLeft: 24,
              minWidth: 120
            }}>{date}</div>
          </div>
          <div style={{
            fontSize: 15,
            color: "#222",
            marginBottom: 0,
            lineHeight: 1.4,
            marginTop: 24
          }}>{desc}</div>
        </div>
      </main>
      {/* 버튼 */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 40,
        marginTop: 80
      }}>
        <button style={{
          border: "1px solid #363636",
          background: "#fff",
          borderRadius: 2,
          fontSize: 22,
          padding: "14px 40px",
          color: "#363636"
        }}>
          Delete Post
        </button>
        <button style={{
          border: "1px solid #363636",
          background: "#fff",
          borderRadius: 2,
          fontSize: 22,
          padding: "14px 40px",
          color: "#363636"
        }}>
          Edit Post
        </button>
      </div>
    </div>
  );
}

export default Posting;