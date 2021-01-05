import React from "react";
import { connect } from "react-redux";
import SingleMessage from "./SingleMessage";
import "./Message.scss";

const mapStateToProps = store => {
  return {
    sentLetters: store.form.sentLetters,
  };
};

const Messages = ({ sentLetters }) => {

  return (
    <div className="messages-container">
      <h1>Отправленные сообщения</h1>
      {sentLetters.length ? (
        <>
          <ul className="message-nav">
            <li>Дата</li>
            <li>Тема</li>
            <li>Статус</li>
          </ul>
          {sentLetters.map((letter, index) => (
            <SingleMessage key={index}
              trackId={letter.trackId}
              date={letter.date}
              theme={letter.theme}
              status={letter.status}
            />
          ))}
        </>
      ) : (
        <p className="no-messages">Сообщения еще не отправлялись</p>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(Messages);
