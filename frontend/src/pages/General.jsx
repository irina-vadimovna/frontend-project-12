import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Container, Row } from 'react-bootstrap';
import useAuth from "../hooks";
import { addServerChannels, selectChannels } from "../store/channelsSlice.js";
import { addServerMessages, selectMessages } from "../store/messagesSlice.js";
import ChannelsList from "../components/generalPage/ChannelsList.jsx";
import MessagesList from "../components/generalPage/MessagesList.jsx";


export const General = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const channels = useSelector(selectChannels);
  const messages = useSelector(selectMessages);
  
  const [selectedChannelId, setSelectedChannelId] = useState(null);

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

  useEffect(() => {
    if (channels.length > 0 && selectedChannelId === null) {
      setSelectedChannelId(channels[0].id);
    }
  }, [channels, selectedChannelId]);

  const handleChannelClick = (channelId) => {
    setSelectedChannelId(channelId);
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsList 
          channels={channels} 
          selectedChannelId={selectedChannelId} 
          handleChannelClick={handleChannelClick} 
        />
        <MessagesList
          channels={channels}
          selectedChannelId={selectedChannelId}
          messages={messages}
        />
      </Row>
    </Container>
  );
}
