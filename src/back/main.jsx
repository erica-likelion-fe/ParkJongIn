import React, { useState } from "react";
import PostingDisabled from "./Posting-Disabled";

// 예시 아이콘 컴포넌트 (SVG)
const LeftIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#363636" strokeWidth="2"><polyline points="15 6 9 12 15 18" /></svg>
);
const RightIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#363636" strokeWidth="2"><polyline points="9 6 15 12 9 18" /></svg>
);

function MainPage() {
  // 게시글 목록 상태
  const [posts, setPosts] = useState([]);
  // 선택된 게시글 id (상세/수정/생성 화면 전환용)
  const [selectedPostId, setSelectedPostId] = useState(null);
  // 새 글 생성 모드
  const [isCreating, setIsCreating] = useState(false);

  // Create Post 버튼 클릭 시
  const handleCreatePost = () => {
    setIsCreating(true);
    setSelectedPostId(null);
  };

  // 새 글 저장
  const handleSaveNewPost = ({ image, title, desc, file }) => {
    const newPost = {
      id: Date.now(), // 고유 id
      image,
      file,
      title,
      desc,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
    };
    setPosts([newPost, ...posts]);
    setIsCreating(false);
    setSelectedPostId(newPost.id);
  };

  // 기존 글 수정
  const handleEditPost = ({ id, image, title, desc, file }) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, image, title, desc, file } : post
    ));
    setSelectedPostId(id);
  };

  // 삭제
  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    setSelectedPostId(null);
    setIsCreating(false);
  };

  // 상세/수정/생성 화면
  if (isCreating) {
    return (
      <PostingDisabled
        onGoMain={() => setIsCreating(false)}
        onSave={handleSaveNewPost}
        mode="create"
      />
    );
  }
  if (selectedPostId !== null) {
    const post = posts.find(p => p.id === selectedPostId);
    if (!post) {
      setSelectedPostId(null);
      return null;
    }
    return (
      <PostingDisabled
        post={post}
        onGoMain={() => setSelectedPostId(null)}
        onEdit={handleEditPost}
        onDelete={() => handleDeletePost(post.id)}
        mode="view"
      />
    );
  }

  // 메인(갤러리) 화면
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
          onClick={handleCreatePost}
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
          {posts.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "#aaa", marginTop: 80 }}>
              No posts yet. Click "Create Post" to add one!
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedPostId(post.id)}
              >
                <div style={{
                  background: "#D9D9D9",
                  borderRadius: 8,
                  width: "100%",
                  aspectRatio: "3/4",
                  marginBottom: 6,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {post.image ? (
                    <img
                      src={post.file ? URL.createObjectURL(post.file) : post.image}
                      alt={post.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : null}
                </div>
                <div style={{ fontWeight: 600, fontSize: 12 }}>{post.title}</div>
                <div style={{
                  color: "#363636",
                  fontSize: 10,
                  marginTop: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  {post.desc}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* 페이지네이션 (디자인 유지용, 실제 기능 없음) */}
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