import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import peopleService from "./helper";
import "./People.css";
import { ContactCard } from "../Presentational/ContactCard";
import { useMediaQuery } from "react-responsive";
import { Loader } from "../Presentational/Loader";

function Favorite() {
  const [people, setPeople] = useState();
  localStorage.setItem("nav-selector", "Favorite");

  useEffect(() => {
    peopleService.getFavorites().then((response) => {
      setPeople(response);
    });
  }, []);

  const updatePeople = async () => {
    peopleService.getFavorites().then((response) => {
      setPeople(response);
    });
  };

  const isNotMobile = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  return (
    <div className="favorite-page">
      <div className="people-wrapper">
        <NavBar />
        <div className="people-box">
          <div className="pageTitle">Favorite</div>
          {isNotMobile ? (
            <h2 style={{ paddingLeft: "100px" }}>
              {" "}
              Heart people to come back to them whenever you need to
            </h2>
          ) : (
            <div />
          )}
          <div>
            {people ? (
              <div
                className="people-cards"
                style={{ height: "calc(90vh - 150px)" }}
              >
                {people.length === 0 ? (
                  <div> Favorite your contacts to easily access them. </div>
                ) : (
                  people.map((d, i) => (
                    <ContactCard
                      contactInformation={d}
                      isFunctional={true}
                      key={i}
                      handler={updatePeople}
                    />
                  ))
                )}
              </div>
            ) : (
              <div
                className="people-cards"
                style={{ height: "calc(90vh - 150px)" }}
              >
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorite;
