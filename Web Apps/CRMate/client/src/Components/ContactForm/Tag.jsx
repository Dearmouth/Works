/**
 *
 * @param {} param: Presentational Tag Element
 */

export const Tag = ({ name, index, handleRemoveTag }) => {


  return (
    <li className="tag-container">
      <div className="tag-container__name">
        {name}
      </div>
 
      <div className="tag-container__name-popout">
        {name}
      </div>
 
      <div
        onClick={() => handleRemoveTag(index)}
        className="tag-container__cross"
      >
        X
      </div>
    </li>
  );
};
