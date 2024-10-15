import React, { useEffect, useState } from 'react';
import { fetchChapterDetails } from '../services/api';
import { toast } from 'react-hot-toast';
const MangaViewer = ({ chapterId }) => {
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [lesson, setLesson] = useState(chapterId); 
  const [moveToLastPage, setMoveToLastPage] = useState(false);
  const [start,setstart] = useState(false);

  useEffect(() => {
    const getPages = async () => {
      if (lesson) {
        const data = await fetchChapterDetails(lesson);
        setPages(data.pages);
        if (moveToLastPage && !start) {
          setCurrentPageIndex(data.pages.length - 1);
          setMoveToLastPage(false); // Reset this flag
        } 
        else {
          setCurrentPageIndex(0);
        }
      }
    };
    getPages();
  }, [lesson]);

  useEffect(() => {
    setLesson(chapterId);  
  },[chapterId]);

  const nextPage = () => {
    if (currentPageIndex < pages.length - 1 && lesson < 12) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else if (lesson < 11) {
      setstart(true);
      setLesson((prevId) => prevId + 1); 
    } else {
      toast.error('End of the book');
    }
  };

  const previousPage = () => {
    if (currentPageIndex > 0 && lesson > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    } 
    else if (lesson > 1) {
      setMoveToLastPage(true);
      setstart(false);
      setLesson((prevId) => prevId - 1);
    } else {
      toast.error('Start of the book');
    }
  };

  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Display the current image */}
        {pages.length > 0 && pages[currentPageIndex] ? (
          <img 
            src={pages[currentPageIndex].image.file} 
            alt={`Page ${currentPageIndex + 1}`} 
            style={{ width: '20%', height: 'auto' }} 
          />
        ) : (
          <p>Loading...</p> // Optional loading state
        )}
        {/* Left click area */}
        <div 
          onClick={previousPage} 
          style={{ 
            position: 'absolute', 
            left: 0, 
            top: 0, 
            width: '50%', 
            height: '100%', 
            cursor: 'pointer' 
          }} 
        />

        {/* Right click area */}
        <div 
          onClick={nextPage} 
          style={{ 
            position: 'absolute', 
            right: 0, 
            top: 0, 
            width: '50%', 
            height: '100%', 
            cursor: 'pointer' 
          }} 
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>{`Lesson ${lesson}`}</p>
        <br></br>
        <p>{`Page ${currentPageIndex + 1}`}</p>
      </div>
    </div>
  );
};

export default MangaViewer;
