import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEdit,
  faPlus,
  faMinus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { getname, getUserId } from "../../Tools/utils";
import apiService from "../../Tools/apiIndex";
import EditPopup from "../ContactForm/index";

/* Pass in the contact card information */

export const ContactCard = ({
  contactInformation,
  isFunctional,
  handler,
  toaster,
}) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  const [isFullView, setIsFullView] = useState(false);
  const [togglePopup, setTogglePopup] = useState(false);

  const cancelHandler = () => {
    setTogglePopup(false);
    handler();
  };

  const favorite = async () => {
    await apiService
      .updateContact(getUserId(), contactInformation._id, {
        favorite: !contactInformation.favorite,
      })
      .then((res) => {});

    handler();
  };

  const checkDelete = (info) => {
    toaster(<p onClick={deleteContact}>Click here to confirm deletion...</p>);
  };

  const deleteContact = async () => {
    await apiService
      .deleteContact(getUserId(), contactInformation._id)
      .then((res) => {
        toaster("Deleted contact.");
      });

    handler();
  };

  return isFullView || isDesktopOrLaptop ? (
    <div className="contact-card">
      <div className="contact-card__header">
        {isFunctional && (
          <div className="contact-card__header__icons">
            {contactInformation.favorite === true ? (
              <button className="btn" onClick={() => favorite()}>
                <div className="heart-btn">
                  <FontAwesomeIcon icon={faHeart} className="fa-heart-1" />
                </div>
              </button>
            ) : (
              <button className="btn" onClick={() => favorite()}>
                <div className="heart-btn">
                  <FontAwesomeIcon icon={faHeart} className="fa-heart-2" />
                </div>
              </button>
            )}

            <div className="contact-card__edit">
              <button className="btn" onClick={() => setTogglePopup(true)}>
                <div className="fa-edit">
                  <FontAwesomeIcon icon={faEdit} />
                </div>
              </button>
              <button
                className="btn"
                onClick={() => checkDelete(contactInformation)}
              >
                <div className="fa-edit" style={{ paddingTop: "30px", paddingRight:"1vw"}}>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </button>
            </div>
          </div>
        )}
        {togglePopup && (
          <EditPopup
            cancelHandler={cancelHandler}
            comingInfo={contactInformation}
            editing={true}
          />
        )}

        <div className="contact-card__image">
          <img src={contactInformation.profilePic} alt="User profile"></img>
        </div>
        <div style={{fontFamily: "Sanchez One"}} className="contact-card__name"> {getname(contactInformation)}</div>
      </div>

      <div className="contact-card__properties">
        <div className="contact-card__property">
          <span className="contact-card__property__label">Email</span>
          <span className="contact-card__property__field">
            {contactInformation.email &&
              contactInformation.email.map((t, i) => (
                <div className="contact-card__tag" title={t} key={i}>
                  {t}
                </div>
              ))}
          </span>
        </div>
        <div className="contact-card__property">
          <span className="contact-card__property__label">Phone</span>
          <span className="contact-card__property__field">
            {contactInformation.phone &&
              contactInformation.phone.map((t, i) => (
                <div className="contact-card__tag" titke={t} key={i}>
                  {t}
                </div>
              ))}
          </span>
        </div>
        <div className="contact-card__property">
          <span className="contact-card__property__label">Notes</span>
          <span
            className="contact-card__property__field"
            style={{ overflowX: "scroll" }}
          >
            {contactInformation.notes}
          </span>
        </div>
        <div className="contact-card__property">
          <span className="contact-card__property__label">Tags</span>
          <span className="contact-card__property__field">
            {contactInformation.tags &&
              contactInformation.tags.map((t, i) => (
                <div className="contact-card__tag" key={i}>
                  {t}
                </div>
              ))}
          </span>
        </div>
      </div>
      {!isDesktopOrLaptop ? (
        <button
          className="contact-minus"
          onClick={() => setIsFullView(!isFullView)}
        >
          <FontAwesomeIcon icon={faMinus} /> Collapse
        </button>
      ) : (
        <div></div>
      )}
    </div>
  ) : (
    <div className="contact-card-abstract">
      <div className="contact-card-abstract__image">
        <img src={contactInformation.profilePic} alt="User profile"></img>
      </div>
      <div className="contact-card-abstract__name">
        {getname(contactInformation)}
      </div>
      <button
        className="contact-expand"
        onClick={() => setIsFullView(!isFullView)}
      >
        <FontAwesomeIcon icon={faPlus} /> Expand
      </button>
    </div>
  );
};
