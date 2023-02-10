import PropTypes from 'prop-types';
import { memo } from 'react';

import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ pictures, showPicture }) => {
  const elements = pictures.map(({ id, largeImageURL, tags, webformatURL }) => (
    <ImageGalleryItem
      key={id}
      webformatURL={webformatURL}
      tags={tags}
      onClick={() => showPicture({ largeImageURL })}
    />
  ));

  return <ul className={css.ImageGallery}>{elements}</ul>;
};

export default memo(ImageGallery);

ImageGallery.defaultProps = {
  pictures: [],
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  showPicture: PropTypes.func.isRequired,
};
