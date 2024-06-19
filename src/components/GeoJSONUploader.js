import React from "react";
import { MdUploadFile } from "react-icons/md";

const GeoJSONUploader = ({ onUpload }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result;
      const jsonData = JSON.parse(fileContent);
      onUpload(jsonData);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <button
        style={{
          marginLeft: "15px",
          borderRadius: "54%",
          border: "none",
          height: "2em",
          width: "2em",
          cursor: "pointer",
          verticalAlign: "middle",
        }}
      >
        <label htmlFor="file-upload">
          <MdUploadFile
            style={{
              color: "#4CB963",
              verticalAlign: "bottom",
              marginBottom: "2px",
              fontSize: "16px",
            }}
          />
        </label>
        <input
          id="file-upload"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </button>
    </div>
  );
};

export default GeoJSONUploader;
