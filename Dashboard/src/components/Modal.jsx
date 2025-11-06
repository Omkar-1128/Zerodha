import React, { useRef } from "react";
import "./Model.css";

const Modal = ({ isOpen, onClose, title, children, ignoreFirstOverlayClickMs = 250 }) => {
  if (!isOpen) return null;

  const openedAtRef = useRef(Date.now());
  const handleOverlayClick = () => {
    const elapsed = Date.now() - openedAtRef.current;
    if (elapsed < ignoreFirstOverlayClickMs) return; // prevent immediate close from prior tap
    onClose?.();
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={handleOverlayClick}></div>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          ✕
        </button>
        {title && <h3 className="modal__header">{title}</h3>}
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
