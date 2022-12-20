import React, { useEffect, useState } from "react";
import { fields } from "../../Tools/utils";
import NavBar from "../NavBar/NavBar";
import { ContactCard } from "../Presentational/ContactCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import reversedTriangle from "../../Assets/reversedTriangle.svg";
import "./People.css";
import peopleService from "./helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../Presentational/Loader";

function People() {
  const [people, setPeople] = useState();
  const [searchBy, setSearchBy] = useState("Name");
  const [searchValue, setSearchValue] = useState("");
  const [fieldClicked, setFieldClicked] = useState(false);

  const toastID = React.useRef(null);

  localStorage.setItem("nav-selector", "People");

  useEffect(() => {
    peopleService.loadFullData().then((response) => {
      setPeople(response);
    });
  }, []);

  const search = async (by, value) => {
    // if search value is empty, load full data
    if (value === "") {
      peopleService.loadFullData().then((response) => {
        setPeople(response);
      });
      // otherwise query using by and value
    } else {
      peopleService
        .searchByParams(by, value)
        .then((results) => setPeople(results));
    }
  };

  const createToast = (msg) => {
    if (!toast.isActive(toastID.current)) {
      toastID.current = toast.warning(msg);
    }
  };

  // updates page when people are favorited or removed as a favorite
  const updatePeople = async () => {
    search(searchBy, searchValue);
    toast.dismiss();
  };

  return (
    <div>
      <div className="people-wrapper">
        <NavBar />
        <div className="people-box">
          <div className="pageTitle">People</div>

          <div className="searchOption">
            <div
              className="button"
              onClick={() => setFieldClicked(!fieldClicked)}
            >
              {/** display the selected field to search by */}
              {searchBy}
              <img
                className="reversed-triangle"
                src={reversedTriangle}
                alt=""
              />
            </div>
            {/** drop down of fields and clicking it sets it */}
            {fieldClicked && (
              <div id="option-fields">
                {fields.map((field) => {
                  if (field !== searchBy) {
                    return (
                      <div
                        id="option-field"
                        onClick={() => {
                          search(field, searchValue);
                          setSearchBy(field);
                          setFieldClicked(false);
                        }}
                      >
                        {field}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
          <div className="searchBar">
            <input
              type="text"
              className="input search-bar"
              name="searchValue"
              placeholder="Search for people by name, phone, email, or tags"
              onChange={(e) => {
                search(searchBy, e.target.value);
                setSearchValue(e.target.value);
              }}
            />
            <div className="searchIcon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
          <div>
            {people ? (
              <div className="people-cards">
                {people.map((d, i) => (
                  <ContactCard
                    contactInformation={d}
                    isFunctional={true}
                    key={i}
                    handler={updatePeople}
                    toaster={createToast}
                  />
                ))}
              </div>
            ) : (
              <div className="people-cards">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default People;
