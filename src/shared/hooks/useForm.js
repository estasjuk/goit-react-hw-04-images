import { useState } from 'react';

const useForm = onSubmit => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    setSearch(target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  return { search, setSearch, handleChange, handleSubmit };
};

export default useForm;
