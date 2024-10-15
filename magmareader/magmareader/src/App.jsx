import React, { useState } from 'react';
import BookList from './components/booklist.jsx';
import ChapterList from './components/chapterlist';
import MangaViewer from './components/mangaviewer';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  return (
    <div>
      <Toaster />
      <h1 style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Manga Viewer</h1>
      <br></br>
      <BookList onBookSelect={setSelectedBook} />
      <br></br>
      {selectedBook && <ChapterList bookId={selectedBook} onChapterSelect={setSelectedChapter} />}
      <br></br>
      <br></br>
      {selectedChapter && <MangaViewer chapterId={selectedChapter} />}
    </div>
  );
};

export default App;
