import PropTypes from 'prop-types';
import useForm from 'shared/hooks/useForm';
import { memo } from 'react';

import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const { search, handleChange, handleSubmit } = useForm(onSubmit);

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          onChange={handleChange}
          value={search}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
