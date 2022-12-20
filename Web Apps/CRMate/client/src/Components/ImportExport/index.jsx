import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./index.css";
import apiService from "../../Tools/apiIndex";
import { jsonToCSV, jsonToJSONFile } from "./helpers.js";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";

function ImportExport() {
  const [filename, setFilename] = useState("");
  const [type, setType] = useState("json");
  const [file, setFile] = useState("");
  localStorage.setItem("nav-selector", "Data");

  const toastID = React.useRef(null);

  const createToast = (msg, type = "warning") => {
    if (!toast.isActive(toastID.current)) {
      if (type === "warning") {
        toastID.current = toast.warning(msg);
      } else {
        toastID.current = toast.success(msg);
      }
    }
  };

  const handleExport = (e) => {
    e.preventDefault();
    if (!filename) {
      createToast("Please enter a filename for the export!");
      document.getElementById("export-filename").classList.add("incomplete");
      document.getElementById("export-filename").focus();
    } else {
      document.getElementById("export-filename").classList.remove("incomplete");
      apiService
        .exportData(filename, type)
        .then((res) => {
          if (type === "csv") {
            jsonToCSV(filename, res.data);
            return;
          } else {
            jsonToJSONFile(filename, res.data);
          }
        })
        .catch((e) => {
          createToast("Please add at least one contact before exporting.");
        });
    }
  };

  const uploadFile = (e) => {
    let file = e.target.files[0];
    setFile(file);
  };

  const handleImport = (e) => {
    e.preventDefault();
    if (!file) {
      createToast("Please upload a file.");
      return;
    }

    apiService
      .importData(file)
      .then((res) => {
        if (res.data.message === "Invalid Schema") {
          createToast("Please upload a file with the appropriate formatting.");
        } else {
          createToast(
            "Your contacts have been successfully imported!",
            "success"
          );
          setFile("");
          document.getElementById("file-upload").value = "";
        }
      })
      .catch((e) => {
        createToast(
          "Something went wrong importing your contacts. Please ensure your JSON/CSV file is properly formatted."
        );
      });
  };
  const isNotMobile = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  return (
    <div>
      <NavBar />
      <div className="contact-form-wrapper">
        <div className="people-wrapper">
          <div className="data-page">
            {isNotMobile ? (
              <div>
                <div className="pageTitle">Import/Export</div>
                <div className="pageSubTitle">
                  Transferring your data has never been easier.
                </div>
              </div>
            ) : (
              <div />
            )}

            <div className="export-content">
              <form className="export-form__content" onSubmit={handleImport}>
                <div className="export-filename-form-segment">
                  <label className="form-label" htmlFor="export-filename">
                    Import
                  </label>
                  <input
                    style={{ border: "none" }}
                    id="file-upload"
                    className="form-input"
                    type="file"
                    onChange={uploadFile}
                    accept="text/csv, .json"
                  />

                  <button className="file-btn btn import-btn" type="submit">
                    Import
                  </button>
                </div>
              </form>

              <form onSubmit={handleExport}>
                <div className="export-filename-form-segment">
                  <label className="form-label" htmlFor="export-filename">
                    Export
                  </label>
                  <input
                    className="form-input"
                    onChange={(e) => setFilename(e.target.value)}
                    placeholder="Enter file name"
                    name="export-filename"
                    id="export-filename"
                  />
                </div>
                <div className="export-filename-form-segment">
                  <label className="form-label" htmlFor="export-filename">
                    Format
                  </label>
                  <select
                    className="form-input"
                    onChange={(e) => setType(e.target.value)}
                    name="file-format"
                  >
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>
                <button
                  className="file-btn btn"
                  style={{ background: "#C5EFA4", color: "white" }}
                  type="submit"
                >
                  Export
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportExport;
