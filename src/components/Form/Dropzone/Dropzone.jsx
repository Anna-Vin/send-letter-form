import React, { useState} from "react";
import { connect } from "react-redux";
import { addFile } from "./../../../actions/form.actions";
import "./Dropzone.scss";


// Redux setup

const mapDispatchToProps = dispatch => {
  return {
    addFile: file => dispatch(addFile(file))
  };
};

// Component itself
const DropZone = ({ setDropOpen, addFile, setErrorMessage }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
   

  //Drag events
  const dragOver = e => {
    e.preventDefault();
  };

  const dragEnter = e => {
    e.preventDefault();
  };

  const dragLeave = e => {
    e.preventDefault();
  };

  const fileDrop = e => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files); //validate file, see below
    }
  };

  // const fileSize = size => {
  //   if (size === 0) return "0 Bytes";
  //   const k = 1024;
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  //   const i = Math.floor(Math.log(size) / Math.log(k));
  //   return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  // };

  //Validate and check file sizes
  const handleFiles = files => {
    const selectedFilesArray = selectedFiles;

    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        // add to an array so we can display the name of file
        selectedFilesArray.push(files[i]);
      } else {
        // add a new property called invalid
        files[i]["invalid"] = true;
        // add to the same array so we can display the name of the file
        selectedFilesArray.push(files[i]);
        // set error message
        setErrorMessage("File type/size not permitted");
      }
    }

    setSelectedFiles(selectedFilesArray);
    addFile(selectedFilesArray);
    setDropOpen(false);
  };

  const validateFile = file => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/xls",
      "application/doc",
      "application/zip",
    ];
    if (validTypes.indexOf(file.type) === -1 || file.size > 5242880)  {
      return false;
    }
    return true;
  };


  return (
    <>
      <div
        className="drop-container file-upload field-row"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        <div className="drop-message">
          <h3>Бросайте файлы сюда, я ловлю</h3>
          <p>
            Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls, pdf)
            и zip-архивы.
          </p>
          <span>Размеры файла до 5МБ</span>
        </div>
      </div>
    </>
  );
};

export default connect(null, mapDispatchToProps)(DropZone);
