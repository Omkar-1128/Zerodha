import React from "react";
import "./Model.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
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
