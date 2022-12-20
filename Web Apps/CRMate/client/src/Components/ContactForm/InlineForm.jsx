import React from "react";
import { Tag } from "./Tag";
/**
 * @description An inline form element that facilitates addition of multiple elements
 * @param {} name: Name of the nested element in the formValue object
 * @param {} values: Initial values
 * @param {*} setValues: Setter function that allows changes to be saved.
 */

export const InlineForm = ({
  maxLength,
  validate = () => true,
  name,
  formValues,
  setFormValues,
  toaster,
}) => {
  let handleRemoveBlur = () => {
    document.getElementById(`${name}-input`) &&
      document.getElementById(`${name}-input`).classList.remove("incomplete");
  };

  let handleRemove = (index) => {
    setFormValues({
      ...formValues,
      [name]: formValues[name].filter((f, i) => i !== index),
    });
  };

  let handleAddTag = (e) => {
    handleRemoveBlur();
    if (e.key !== "Enter" || e.target.value === "") {
      return;
    }

    if (!validate(e.target.value)) {
      // then don't submit
      let currInput = document.getElementById(`${name}-input`);
      currInput.classList.add("incomplete");
      toaster("Invalid input!");

      return;
    }

    let currTags = formValues[name];
    let currTag = document.getElementById(`${name}-input`).value;
    if (!currTag) return;
    currTags ? currTags.push(currTag) : (currTags = [currTag]);
    setFormValues({ ...formValues, [name]: currTags });
    document.getElementById(`${name}-input`).value = "";
  };

  return (
    <div className="tag-wrapper">
      <ul className="tag-wrapper__tags">
        {formValues[name] &&
          formValues[name].map((t, i) => (
            <Tag key={i} name={t} index={i} handleRemoveTag={handleRemove} />
          ))}
      </ul>

      <input
        type="text"
        maxLength={maxLength}
        id={`${name}-input`}
        className="tag-wrapper__input"
        name={name}
        onKeyUp={handleAddTag}
        onChange={handleRemoveBlur}
        placeholder="Add"
      />
    </div>
  );
};
