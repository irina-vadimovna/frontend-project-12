import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addChannel } from '../../../store/channelsSlice'

const AddChannelModal = ({ show, handleClose, currentUser }) => {
    const dispatch = useDispatch();
    const inputEl = useRef(null);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: Yup.object({
      channelName: Yup.string()
        .min(3, 'Имя канала должно содержать минимум 3 символа')
        .max(20, 'Имя канала не может превышать 20 символов')
        .required('Обязательное поле')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const newChannel = { name: values.channelName };
        const response = await axios.post('/api/v1/channels', newChannel, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        // await moveUserToChannel(currentUser.username, response.data.id)
        handleClose();
        // inputEl.current.focus();
        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const socket = io();
  const handleNewChannel = (payload) => {
    dispatch(addChannel(payload));
  };

  useEffect(() => {
    socket.on('newChannel', handleNewChannel);
  }, []);
  useEffect(() => {
    if (show) {
      inputEl.current.focus();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              name="channelName"
              id="channelName"
              ref={inputEl}
              className={`mb-2 form-control ${formik.touched.channelName && formik.errors.channelName ? 'is-invalid' : ''}`}
              {...formik.getFieldProps('channelName')} // посмотреть
            />
            <label htmlFor="channelName" className="visually-hidden">Имя канала</label>
            {formik.touched.channelName && formik.errors.channelName ? (
              <div className="invalid-feedback">{formik.errors.channelName}</div>
            ) : null}
          </div>
          <div className='d-flex justify-content-end'>
            <Button type="button" className='me-2 btn btn-secondary' onClick={handleClose}>Отменить</Button>
            <Button type="submit" className='btn btn-primary'>Добавить</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

// const moveUserToChannel = async (userId, channelId) => {
//   await axios.post(`/api/v1/users/${userId}/channels/${channelId}`);
// };

export default AddChannelModal;
