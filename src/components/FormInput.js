import { useState } from "react";

const FormInput = ({ label, errorMessage, onChange, id, classNameLabel, ...inputProps }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };
  //   console.log(focused);
  return (
    <div className="relative flex flex-col lg:flex-row gap-2 ">
      {label && (
        <label className={classNameLabel} htmlFor={inputProps && inputProps.name}>
          {label}
        </label>
      )}
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => setFocused(false)}
        focused={focused.toString()}
        id={inputProps && inputProps.name}
      />
      {/* <span>{errorMessage}</span> */}
    </div>
  );
};

export default FormInput;
