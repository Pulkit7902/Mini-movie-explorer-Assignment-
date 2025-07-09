import React from 'react';
import SearchBar from './SearchBar';

const Header = ({ fetchMovies }) => (
  <header>
    <div className='contain'>
    <h1 className='title'>Mini Movie Explorer 🎬</h1>
    <div id="search-container">
      <SearchBar onSearch={fetchMovies} />
    </div>
    </div>
  </header>
);

export default Header;