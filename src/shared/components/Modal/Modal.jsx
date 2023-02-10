import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  const closeModalWindow = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModalWindow);
    return () => document.removeEventListener('keydown', closeModalWindow);
  }, [close]);

  return createPortal(
    <div className={css.Overlay} onClick={closeModalWindow}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
