import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import cn from 'classnames';
import useAuth from "../hooks";
import { addServerChannels, selectChannels } from "../store/channelsSlice.js";
import { addServerMessages, selectMessages } from "../store/messagesSlice.js";


export const General = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();

  const channels = useSelector(selectChannels);
  const messages = useSelector(selectMessages);
  
  const [selectedChannelId, setSelectedChannelId] = useState(null);  // новое

  const fetchChannels = async () => {
    try {
      if (auth.logIn) {
        const response = await axios.get('/api/v1/channels', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        })
        console.log(response.data);
        dispatch(addServerChannels(response.data));
      }
    } catch (err) {
      console.log('Big error! NO CHANNELS')
    };
  };

  const fetchMessages = async () => {
    try {
      if (auth.logIn) {
        const response = await axios.get('/api/v1/messages', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        })
        console.log(response.data);
        dispatch(addServerMessages(response.data));
      }
    } catch (err) {
      console.log('Big error! NO MESSAGES')
    };
  };

  useEffect(() => {
    if (auth.logIn) {
      fetchChannels();
      fetchMessages();
    }
  }, [auth.logIn]);

  const handleChannelClick = (channelId) => {
    setSelectedChannelId(channelId);
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('channels.title')}</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {/* добавить отрисованные каналы */}
          {channels.map((channel) => (
            <li key={channel.id} className="nav-item w-100">
              <button type="button" className={cn('w-100 rounded-0 text-start btn', selectedChannelId === channel.id ? 'btn-secondary' : '')} onClick={() => handleChannelClick(channel.id)}>
                <span className="me-1">#</span>
                {channel.name}
              </button>
            </li>
          ))}
          </ul>
        </Col>

        <Col className="col p-0 h-100">
          <div className="d-flex flex-column h-100">  {/* добавить отрисованные сообщения */}
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                {channels.map((channel) => (
                  selectedChannelId === channel.id ? <b># {channel.name}</b> : ''
                ))}
              </p>
              <span className="text-muted">длина сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5">
            {messages.filter(message => message.channelId === selectedChannelId).map((message) => (
              <div key={message.id} className="text-break mb-2">
                <b>{message.username}</b>`:` a{message.body}
              </div>
            ))}
            </div>
            <div className="mt-auto px-5 py-3">
              <form noValidate className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control"></input>
                  {/* кнопка */}
                </div>
              </form>
            </div>


          </div>
        </Col>
      </Row>
    </Container>
  );
}
