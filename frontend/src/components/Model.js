import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    const modalContentRef = useRef(null);

  useEffect(() => {
    const modalContent = modalContentRef.current;

    if (!modalContent) return;

    let isDragging = false;
    let startX, startY, initialX, initialY;

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = modalContent.offsetLeft;
      initialY = modalContent.offsetTop;
      modalContent.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        modalContent.style.left = `${initialX + dx}px`;
        modalContent.style.top = `${initialY + dy}px`;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      modalContent.style.cursor = 'move';
    };

    modalContent.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      modalContent.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;