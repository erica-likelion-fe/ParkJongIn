import React from 'react';

export function Nav(props) {
  const { topics } = props;

  const listItems = topics.map((topic) => (
    <li key={topic.id}>
      <a
        href={`/topic/${topic.id}`}
        onClick={(e) => {
          e.preventDefault();
          console.log(`Nav item clicked: ${topic.title}`);
        }}
      >
        {topic.title}
      </a>
    </li>
  ));

  return (
    <nav className="app-nav">
      <ul>
        <li>
          <a href="/create" onClick={(e) => { e.preventDefault(); console.log("Create link in Nav clicked"); }}>
            create
          </a>
        </li>
        {listItems}
      </ul>
    </nav>
  );
}