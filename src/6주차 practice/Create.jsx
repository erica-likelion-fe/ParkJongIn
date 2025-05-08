import React, { useState } from 'react';

export function Create(props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    props.onCreate(title, body);
    setTitle('');
    setBody('');
  };

  return (
    <article className="create-form">
      <h2>새 항목 추가</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">내용</label>
          <textarea
            id="body"
            name="body"
            placeholder="내용을 입력하세요"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">저장</button>
      </form>
    </article>
  );
}