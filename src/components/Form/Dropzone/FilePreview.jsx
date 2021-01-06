import React, { useRef } from "react";
import { connect } from "react-redux";
import { deleteFile } from "./../../../actions/form.actions";
import "./Dropzone.scss";

const mapStateToProps = store => {
  return {
    files: store.form.files,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFile: fileName => dispatch(deleteFile(fileName)),
  };
};

const FilePreview = ({ files, errorMessage, deleteFile }) => {
  const modalImageRef = useRef();
  const modalRef = useRef();

  const cropFileName = name => {
    if (name.length > 20) {
      const nameWOFormat = name.split(".").slice(0, 1).join("");
      const format = name.split(".").slice(1).join("");
      return nameWOFormat.split("").slice(0, 15).join("") + "..." + format;
    }
    return name;
  };

  const openImageModal = file => {
    const reader = new FileReader();
    modalRef.current.style.display = "block";
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
    };
  };

  const closeModal = () => {
    modalRef.current.style.display = "none";
    modalImageRef.current.style.backgroundImage = 'none';
}

  return (
    <>
      {files &&
        files.map((data, i) => (
          <div key={i + Math.random()} className="file-status-bar">

              <i className="fas fa-paperclip"></i>
              <div
                className={!data.invalid ? `file-name` : `file-name invalid`}
                onClick={() => openImageModal(data)}
              >
                {cropFileName(data.name)}
              </div>
              {data.invalid && (
                <span className="file-error-message">({errorMessage})</span>
              )}

              <div className="file-remove" onClick={() => deleteFile(i)}>
                <i className="fas fa-trash-alt"></i>Удалить
              </div>

            <div className="modal" ref={modalRef}>
              <div className="overlay"></div>
              <span className="close" onClick={() => closeModal()}>✖</span>
              <div className="modal-image" ref={modalImageRef}></div>
            </div>
          </div>
        ))}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilePreview);
