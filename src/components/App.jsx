import React, {  useEffect, useState } from 'react';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchBar from 'components/Searchbar/Searchbar';
import LoadMoreBtn from './Button/Button';
import Loader from './Loader/Loader';

export  function App() {
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [totalHits, setTotalHits] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [ error, setError] = useState(null);
  

  const fetchImages = () => {
    setStatus('pending');
    setError(null);

    fetch(
      `https://pixabay.com/api/?key=34990122-c9c933059a0835fdbbbaed835&q=${searchQuery}&page=${page}&per_page=${perPage}`
    )
      .then(response => response.json())
      .then(data => {
        setHits(prevHits => [...prevHits, ...data.hits]);
        setTotalHits(data.totalHits);
        setStatus('resolved');
      })
      .catch(error => {
        setStatus('rejected');
        setError(error);
      });
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    fetchImages();
  }, [searchQuery, page, perPage]);

  const handleSubmit = searchValue => {
    setSearchQuery(searchValue);
    setPage(1);
    setHits([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

    return (
      <div>
        {status === 'pending' && <Loader/>}
        <SearchBar onSubmit={handleSubmit} />
        {hits.length > 0 && (
          <>
            <ImageGallery hits={hits} />
            {status === 'resolved' && totalHits >= page * perPage && (<LoadMoreBtn onClick={handleLoadMore} />)}            
          </>
        )}
      </div>
    );
  
}


