import React from 'react';
import './Message.scss';

const MessageOnSubmit = () => {
  return (
    <div className="onSubmit">
      <h1>Сообщение отправлено в очередь на отправку</h1>
      <p>Совсем скоро сообщение вылетит из сервера, и будет двигаться в сторону почты получателя «abc@my.com» со скоростью электронов.</p>
    </div>
  )
}

export default MessageOnSubmit
