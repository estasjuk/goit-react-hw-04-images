import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useCallback } from 'react';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  const closeModalWindow = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModalWindow);
    return () => document.removeEventListener('keydown', closeModalWindow);
  }, [closeModalWindow]);

  return createPortal(
    <div className={css.Overlay} onClick={closeModalWindow}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
