import React, { useRef, useEffect } from 'react';

const MessagesList = ({ channels, selectedChannelId, messages }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  // Добавить useFormik для отслеживания вводимых сообщений + фокус на поле ввода выбранного канала

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">  
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
          {channels.map((channel) => (    
            selectedChannelId === channel.id ? <b># {channel.name}</b> : ''
          ))}
          </p>
          <span className="text-muted">0 сообщений</span>  {/* Добавить отрисовку количества сообщений */}
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">   {/* Проверить работоспособность */}
        {messages.filter(message => message.channelId === selectedChannelId).map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>`:` aaaaa {message.body}
          </div>
        ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form noValidate className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input name="body" 
                aria-label="Новое сообщение" 
                placeholder="Введите сообщение..." 
                className="border-0 p-0 ps-2 form-control"
                ref={inputEl}>
              </input>
              <button type="submit" disabled className="btn btn-group-vertical">
                <svg xmlns="" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" 
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 
                    2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 
                    0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 
                    0 1 0-.708.708L10.293 7.5z">
                  </path>
                </svg>
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesList;