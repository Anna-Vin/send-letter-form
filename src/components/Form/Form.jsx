import React, { useState, useEffect } from "react";
import "./Form.scss";
import { connect } from "react-redux";
import DropZone from "./Dropzone/Dropzone";
import FilePreview from "./Dropzone/FilePreview";
import { sendLetter } from "../../actions/form.actions";




const mapStateToProps = store => {
  return {
    files: store.form.files,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendLetter: letter => dispatch(sendLetter(letter))
  }
}

const Form = ({ files, sendLetter, }) => {
  const [isDropOpen, setDropOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); //Message for invalid file type
  const [formInitialValue, setFormInitialValue] = useState({
    fromName: "",
    fromEmail: "",
    toName: "",
    toEmail: "",
    theme: "",
    message:
      "",
    files: [],
  });



  useEffect(() => {
    const formValueWFiles = {...formInitialValue, files};
    setFormInitialValue(formValueWFiles);
    // eslint-disable-next-line
  }, [files]);

  const fieldOnChangeHandler = (fieldName, value) => {
    const updatedFormValue = { ...formInitialValue, [fieldName]: value };
    validateField(fieldName, value);
    setFormInitialValue(updatedFormValue);
  };

  const sendLetterHandler = (e) => {
    e.preventDefault()
    sendLetter(formInitialValue)
  }

  //Validation
  const [formValidation, setformValidation] = useState({
    formErrors: {
      fromName: "",
      fromEmail: "",
      toName: "",
      toEmail: "",
      theme: "",
      message: "",
    },
    fromNameValid: false,
    fromEmailValid: false,
    toNameValid: false,
    toEmailValid: false,
    themeValid: false,
    messageValid: false,
    formValid: false,
  });

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formValidation.formErrors;
    let fromNameValid = formValidation.fromNameValid;
    let fromEmailValid = formValidation.fromEmailValid;
    let toNameValid = formValidation.toNameValid;
    let toEmailValid = formValidation.toEmailValid;
    let themeValid = formValidation.themeValid;
    let messageValid = formValidation.messageValid;

    switch (fieldName) {
      case "fromName":
        fromNameValid = value.length >= 3;
        fieldValidationErrors.fromName = fromNameValid
          ? ""
          : "Имя слишком короткое";
        break;
      case "toName":
        toNameValid = value.length >= 3;
        fieldValidationErrors.toName = toNameValid
          ? ""
          : "Имя слишком короткое";
        break;
      case "fromEmail":
        fromEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.fromEmail = fromEmailValid
          ? ""
          : "Некорректный email";
        break;
      case "toEmail":
        toEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.toEmail = toEmailValid
          ? ""
          : "Некорректный email";
        break;
      case "theme":
        themeValid = value.length > 0;
        fieldValidationErrors.theme = themeValid
          ? ""
          : "Поле не может быть пустым";
        break;
      case "message":
        messageValid = value.length > 0;
        fieldValidationErrors.message = messageValid
          ? ""
          : "Поле неможет быть пустым";
        break;
      default:
        break;
    }

    setformValidation({
      formErrors: fieldValidationErrors,
      fromNameValid,
      fromEmailValid,
      toNameValid,
      toEmailValid,
      themeValid,
      messageValid,
      formValid:
        fromNameValid &&
        fromEmailValid &&
        toNameValid &&
        toEmailValid &&
        themeValid &&
        messageValid,
    });
  };

  const validateLetterSize = (files) => {
    const totalSize = files.reduce((a, b) => a += b.size, 0);
    if (totalSize >  20971520) {
      return false
    } else {
      return true
    }
  }

  const errorClass = error => {
    return error.length === 0 ? "" : "is-invalid";
  };
  //

  const uploadHandle = () => {
    setDropOpen(!isDropOpen);
  };

  return (<>
    <form className="form">
      <h1>Отправлялка сообщений</h1>
      <div className="field-row form-group ">
        <label htmlFor="fromN">От кого</label>
        <div className="input-group">
          <div className="input-wrapper">
            <input
              type="text"
              id="fromN"
              className={`form-control ${errorClass(
                formValidation.formErrors.fromName
              )}`}
              placeholder="Имя"
              value={formInitialValue.fromName}
              onChange={e => fieldOnChangeHandler("fromName", e.target.value)}
            />
            {formValidation.formErrors.fromName && (
              <div className="error">{formValidation.formErrors.fromName}</div>
            )}
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              className={`form-control ${errorClass(
                formValidation.formErrors.fromEmail
              )}`}
              placeholder="Email"
              value={formInitialValue.fromEmail}
              onChange={e => fieldOnChangeHandler("fromEmail", e.target.value)}
            />
            {formValidation.formErrors.fromEmail && (
              <div className="error">{formValidation.formErrors.fromEmail}</div>
            )}
          </div>
        </div>
      </div>
      <div className="field-row form-group">
        <label htmlFor="toN">Кому</label>
        <div className="input-group">
          <div className="input-wrapper">
            <input
              type="text"
              id="toN"
              className={`form-control ${errorClass(
                formValidation.formErrors.toName
              )}`}
              placeholder="Имя"
              value={formInitialValue.toName}
              onChange={e => fieldOnChangeHandler("toName", e.target.value)}
            />
            {formValidation.formErrors.toName && (
              <div className="error">{formValidation.formErrors.toName}</div>
            )}
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className={`form-control ${errorClass(
                formValidation.formErrors.toEmail
              )}`}
              placeholder="Email"
              value={formInitialValue.toEmail}
              onChange={e => fieldOnChangeHandler("toEmail", e.target.value)}
            />
            {formValidation.formErrors.toEmail && (
              <div className="error">{formValidation.formErrors.toEmail}</div>
            )}
          </div>
        </div>
      </div>
      <div className="field-row form-group">
        <label htmlFor="theme">Тема письма</label>
        <input
          type="text"
          id="theme"
          className={`form-control ${errorClass(
            formValidation.formErrors.theme
          )}`}
          value={formInitialValue.theme}
          onChange={e => fieldOnChangeHandler("theme", e.target.value)}
        />
        {formValidation.formErrors.theme && (
          <div className="error">{formValidation.formErrors.theme}</div>
        )}
      </div>
      <div className="field-row form-group message">
        <label htmlFor="message">Сообщение</label>
        <textarea
          id="message"
          cols="10"
          rows="5"
          className={`form-control ${errorClass(
            formValidation.formErrors.message
          )}`}
          value={formInitialValue.message}
          onChange={e => fieldOnChangeHandler("message", e.target.value)}
        ></textarea>
        {formValidation.formErrors.message && (
          <div className="error">{formValidation.formErrors.message}</div>
        )}
      </div>
      
      <div className="file-display-container">
        <FilePreview errorMessage={errorMessage} />
      </div>

      <div className="field-row">
        <button
          className="btn upload"
          type="button"
          onClick={() => uploadHandle()}
        >
          <i className="fas fa-paperclip "></i> Прикрепить файл
        </button>
      </div>
      {isDropOpen && (
        <>
          <DropZone
            setDropOpen={setDropOpen}
            setErrorMessage={setErrorMessage}
          />{" "}
          <button
            type="button"
            className="btn btn-secondary back"
            onClick={() => setDropOpen(false)}
          >
            ←
          </button>
        </>
      )}

      <button className="btn btn-primary" disabled={!formValidation.formValid || !validateLetterSize(files)} onClick={(e) => sendLetterHandler(e)}>
        Отправить
      </button>
      {validateLetterSize(files) || <p className="size-error">Letter size not permitted. Please, remove 1 or more files</p>}
    </form>
  </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
