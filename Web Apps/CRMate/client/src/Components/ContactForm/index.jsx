import React, { useEffect, useState } from "react";
import "./index.css";
import apiService from "../../Tools/apiIndex";
import { InlineForm } from "./InlineForm";
import { Loader } from "../Presentational/Loader";
import { getUserId } from "../../Tools/utils";
import { ENTER_KEY } from "../../Tools/utils";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { validatePhone, validateEmail } from "./helpers";
import { toast } from "react-toastify";

function ContactForm({ cancelHandler, comingInfo, editing = false }) {
  let history = useHistory();
  let [loading, setLoading] = useState(false);
  let [formValues, setFormValues] = useState(false);
  const toastID = React.useRef(null);
  const createToast = (msg) => {
    if (!toast.isActive(toastID.current)) {
      toastID.current = toast.warning(msg);
    }
  };

  editing
    ? localStorage.setItem("nav-selector", "People")
    : localStorage.setItem("nav-selector", "AddContact");

  useEffect(() => {
    // sets the initial values based on whether this is used for editing or adding
    // editing => accept from route params.
    // adding => initialise to empty fields.
    let init = editing
      ? comingInfo
      : {
          firstName: "",
          lastName: "",
          email: [],
          phone: [],
          tags: [],
          notes: "",
        };
    setFormValues(init);
  }, [comingInfo, editing]);

  // Whenever an input changes
  const handleChange = (e) => {
    // remove blur on any elements
    document.getElementById(`first-name`).classList.remove("incomplete");
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === ENTER_KEY) {
      if (keyEvent.target.type !== "textarea") {
        keyEvent.preventDefault();
      }
    }
  };

  // Edit or Add Contact
  const submit = () => {
    setLoading(true);
    localStorage.setItem("nav-selector", "People");
    if (editing) {
      apiService
        .updateContact(getUserId(), comingInfo._id, formValues)
        .then((res) => {
          setLoading(false);
          cancelHandler();
        });
      window.location.reload();
    } else {
      apiService
        .makeNewContact(getUserId(), formValues)
        .then((res) => {
          setLoading(false);
          document.getElementById("contact-form").reset();
          history.push("/People");
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  };

  // performs basic validation and ensures all changes have been saved to multi-input fields
  // ie. the user has pressed enter and successfully added the new element to the
  // tag, email, phoneNumber list.
  const handleSubmitClick = (e) => {
    e.preventDefault();
    // Don't submit the form if enter is pressed
    // Enter is used in this form to create new tags
    if (e.target.keycode === ENTER_KEY) {
      return false;
    }
    if (!formValues.firstName) {
      // If the user hasn't included a first name, don't submit the form as the entry is invalid
      createToast("Please enter a first name!");
      document.getElementById("first-name").classList.add("incomplete");
      document.getElementById("first-name").focus();
      return;
    } else {
      // check anywhere where the user hasn't pressed enter
      let emailInput = document.getElementById("email-input");
      let phoneInput = document.getElementById("phone-input");
      let tagInput = document.getElementById("tags-input");
      // now warn the user on the display that their inputs have not been saved
      if (emailInput.value || phoneInput.value || tagInput.value) {
        if (tagInput.value) {
          tagInput.classList.add("incomplete");
          createToast("Please ensure you have pressed enter to save this tag.");
        }
        if (phoneInput.value) {
          phoneInput.classList.add("incomplete");
          createToast(
            "Please ensure you have pressed enter to save this phone number."
          );
        }
        if (emailInput.value) {
          emailInput.classList.add("incomplete");
          createToast(
            "Please ensure you have pressed enter to save this email."
          );
          emailInput.focus();
        }
        return;
      }
      submit();
    }
  };

  if (loading) {
    <div>
      {" "}
      <NavBar />
      return <Loader />
    </div>;
  }

  return (
    <div>
      <div className="contact-form-wrapper" />
      {editing ? <></> : <NavBar />}
      <div className={editing ? "body-wrapper-popup" : "body-wrapper"}>
        <form
          id="contact-form"
          onSubmit={handleSubmitClick}
          onKeyDown={onKeyDown}
        >
          <div className="form-container">
            <h1
              style={{
                fontSize: "calc(3vw + 2vh)",
                textDecoration: "underline",
                lineHeight: "0px",
              }}
            >
              {editing ? "Edit Contact" : "Add Contact"}
            </h1>
            <h2>
              {!editing && "Add people to your CRM to never forget them."}
            </h2>

            <div className={"form-container__fields"}>
              <div className="form-container__fields__field">
                <label className="form-label" htmlFor="firstName">
                  First name
                </label>
                <input
                  className="form-input form-input-firstname"
                  id="first-name"
                  value={formValues.firstName || ""}
                  onChange={handleChange}
                  name="firstName"
                ></input>
              </div>

              <div className="form-container__fields__field">
                <label className="form-label" htmlFor="lastName">
                  Last name
                </label>

                <input
                  className="form-input"
                  onChange={handleChange}
                  name="lastName"
                  value={formValues.lastName || ""}
                ></input>
              </div>

              <div className="form-container__fields__field">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <InlineForm
                  validate={validateEmail}
                  value={formValues.email || ""}
                  name="email"
                  formValues={formValues}
                  setFormValues={setFormValues}
                  toaster={createToast}
                />
              </div>

              <div className="form-container__fields__field">
                <label className="form-label" htmlFor="phone">
                  Phone
                </label>

                <InlineForm
                  maxLength={30}
                  validate={validatePhone}
                  value={formValues.phone || ""}
                  name="phone"
                  formValues={formValues}
                  setFormValues={setFormValues}
                  toaster={createToast}
                />
              </div>

              <div className="form-container__fields__field">
                <label className="form-label" htmlFor="notes">
                  Notes
                </label>
                <textarea
                  value={formValues.notes || ""}
                  onChange={handleChange}
                  name="notes"
                ></textarea>
              </div>

              <div className="form-container__fields__field">
                <label className="form-label" htmlFor="tags">
                  Tags
                </label>
                <InlineForm
                  value={formValues.tags || ""}
                  name="tags"
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              </div>
            </div>
            <div>
              <div className="btn-wrapper btn-wrapper-right">
                <button
                  className="btn-with-shadow  form-cancel"
                  onClick={(e) => {
                    e.preventDefault();
                    cancelHandler ? cancelHandler() : history.goBack();
                  }}
                >
                  Cancel
                </button>
                <button
                  id="form-submit"
                  className="btn-with-shadow  form-submit"
                  type="submit"
                >
                  {editing ? "Save" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
