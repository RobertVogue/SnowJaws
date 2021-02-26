import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';
import './Modal.css'

function ReviewFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className="link2" onClick={() => setShowModal(true)}>Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm />
        </Modal>
      )}
    </div>
  );
}

export default ReviewFormModal;
