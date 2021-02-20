import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './Modal.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className="link2" onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal;
