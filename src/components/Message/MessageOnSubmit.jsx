import React from "react";
import { connect } from "react-redux";
import "./Message.scss";

const mapStateToProps = store => {
  return {
    sentLetters: store.form.sentLetters,
  };
};

const MessageOnSubmit = ({ sentLetters }) => {

  const lastLetter = sentLetters[sentLetters.length - 1];
  
  
  return (
    <div className="onSubmit">
      <h1>Сообщение отправлено в очередь на отправку</h1>
      <p>
        Совсем скоро сообщение вылетит из сервера, и будет двигаться в сторону
        почты получателя {`«${lastLetter.toEmail[0]}»`} со скоростью электронов.
      </p>
    </div>
  );
};

export default connect(mapStateToProps, null)(MessageOnSubmit);
