import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getLetterInfo } from "../../actions/form.actions";
import "./Message.scss";

const mapDispatchToProps = dispatch => {
  return {
    getLetterInfo: letterId => dispatch(getLetterInfo(letterId)),
  };
};

const SingleMessage = ({ trackId, date, theme, getLetterInfo, status }) => {
  useEffect(() => {
    getLetterInfo(trackId);
    // eslint-disable-next-line
  }, [trackId]);

  const setStatus = status => {
    switch (status) {
      case "0":
        return "В процессе";
      case "1":
        return "Отправлено";
      case "-1":
        return "Ошибка";
      default:
        return "";
    }
  };

  const setClass = status => {
    switch (status) {
      case "0":
        return "status pending";
      case "1":
        return "status sent";
      case "-1":
        return "status error";
      default:
        return "status";
    }
  };

  const cropTheme = (theme) => {
    if (theme.length > 50) {
      return theme.split("").slice(0, 49).join("") + "...";
    }
    return theme;
  }

  console.log(status);

  return (
    <ul className="message">
      <li>{date}</li>
      <li>{cropTheme(theme)}</li>
      <li className={setClass(status)}>{setStatus(status)}</li>
    </ul>
  );
};

export default connect(null, mapDispatchToProps)(SingleMessage);
