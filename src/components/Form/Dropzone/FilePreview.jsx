import React from "react";
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
    deleteFile: fileName => dispatch(deleteFile(fileName))
  }
}



const FilePreview = ({ files, errorMessage, deleteFile }) => {

  const cropFileName = name => {
    if (name.length > 40) {
      const nameWOFormat = name.split(".").slice(0, 1).join("");
      const format = name.split(".").slice(1).join("");
      return nameWOFormat.split("").slice(0, 30).join("") + "..." + format;
    }
    return name;
  };

  


  return (
    <>
        {files &&
          files.map((data, i) => (

            <div className="file-status-bar" key={i * Math.random()}>
            <i className="fas fa-paperclip"></i>
              <div className={!data.invalid ? `file-name`: `file-name invalid`}>{cropFileName(data.name)}</div>
              {data.invalid && (
                  <span className="file-error-message">({errorMessage})</span>
                )}

              <div className="file-remove" onClick={() => deleteFile(i)}><i className="fas fa-trash-alt"></i>Удалить</div>
            </div>
          ))}
      
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilePreview);
