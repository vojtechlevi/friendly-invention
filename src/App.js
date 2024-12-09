import React, { useState } from 'react';
import useFetchImages from './hooks/useFetchImages';
import ImageGallery from './components/ImageGallery';
import InfiniteScroll from './components/InfiniteScroll';
import SearchBar from './components/SearchBar';

const App = () => {
  const [query, setQuery] = useState('');
  const { images, loading, error, loadMore } = useFetchImages(query);

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center p-4">Unsplash Image Gallery</h1>
      <SearchBar setQuery={setQuery} />
      <main className="p-4">
        {error && (
          <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg items-center flex flex-col">
              <p className="text-red-500">{error}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => window.location.reload()}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <ImageGallery images={images.map((img, idx) => ({ ...img, uniqueKey: `${img.id}-${idx}` }))} />
        {loading && <p>Loading...</p>}
        {query !== '' && !error && <InfiniteScroll loadMore={loadMore} loading={loading} />}
      </main>
    </div>
  );
};

export default App;
