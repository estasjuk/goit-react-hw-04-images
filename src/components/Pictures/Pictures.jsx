import { useState, useEffect } from 'react';

import css from './Pictures.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { searchPictures } from 'shared/services/pictures-api';
import Button from 'shared/components/Button/Button/Button';
import Modal from 'shared/components/Modal/Modal';
import LargeImage from './ImageGallery/LargeImage/LargeImage';
import Loader from 'shared/components/Loader/Loader';

const Pictures = () => {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  const onSearchPictures = search => {
    setSearch(search);
    setPage(1);
    setPictures([]);
  };

  useEffect(() => {
    const checkData = ({ totalHits, hits }) => {
      const PER_PAGE = 12;
      if (page === 1 && totalHits !== 0) {
        setIsLoadMore(true);
      }
      if (totalHits === 0) {
        setIsLoadMore(false);
      } else if (hits.length < PER_PAGE) {
        alert('Oops! This is a finish, try something else');
        setIsLoadMore(false);
      }
    };
    if (search) {
      const fetchPictures = async () => {
        try {
          setLoading(true);
          const data = await searchPictures(search, page);
          setPictures(prevPictures => [...prevPictures, ...data.hits]);
          checkData(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPictures();
    }
  }, [search, page, setIsLoadMore]);

  const showPicture = largeImageURL => {
    setLargeImage(largeImageURL);
    setShowModal(true);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImage(null);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSearchPictures} />
      {pictures.length !== 0 && (
        <ImageGallery pictures={pictures} showPicture={showPicture} />
      )}
      {loading && <Loader />}
      {error && <p>Something goes wrong...</p>}
      {isLoadMore && <Button onClick={loadMore} />}
      {showModal && (
        <Modal close={closeModal}>
          <LargeImage {...largeImage} />
        </Modal>
      )}
    </div>
  );
};

export default Pictures;
