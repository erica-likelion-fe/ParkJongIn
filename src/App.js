import React, { useState } from 'react';
import { Header } from './6주차 practice/Header';
import { Nav } from './6주차 practice/Nav';
import { Create } from './6주차 practice/Create';
import './App.css';

function App() {
  const [topics, setTopics] = useState([
    { id: 1, title: 'HTML', body: 'HTML is ...' },
    { id: 2, title: 'CSS', body: 'CSS is ...' },
    { id: 3, title: 'JS', body: 'JavaScript is ...' },
    { id: 4, title: 'React', body: 'React is ...' },
  ]);

  const [nextId, setNextId] = useState(topics.length + 1);

  const handleCreateTopic = (title, body) => {
    const newTopic = { id: nextId, title: title, body: body };
    setTopics([...topics, newTopic]);
    setNextId(nextId + 1);
  };

  return (
    <div className="container">
      <Header title="ERICA x React Props State" />
      <Nav topics={topics} />
      <div className="content-area">
        <Create onCreate={handleCreateTopic} />
      </div>
    </div>
  );
}

export default App;