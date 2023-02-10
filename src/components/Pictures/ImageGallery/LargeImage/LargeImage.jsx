import PropTypes from 'prop-types';

const LargeImage = ({ largeImageURL }) => {
  return (
    <div>
      <img src={largeImageURL} alt="" />
    </div>
  );
};

export default LargeImage;

LargeImage.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};
