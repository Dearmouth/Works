import { ContactCard } from "../Presentational/ContactCard";
import { dummyData } from "../../Tools/dummyData";
import "./presentational.css";

/* Display for reg/login page */

export const CardDisplay = ({ backgroundColor }) => {
  return (
    <div
      style={{ background: backgroundColor }}
      className="wrapper__panel wrapper__panel--right"
    >
      {dummyData.map((d, i) => (
        <div key={`display-card-${i}`} className={`contact-card__wrapper-${i}`}>
          <ContactCard contactInformation={d} isFunctional={false} />
        </div>
      ))}
      <h2 className="wrapper__panel__footer">Never forget anyone.</h2>
    </div>
  );
};
