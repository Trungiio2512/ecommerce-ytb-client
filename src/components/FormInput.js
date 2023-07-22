import { useState } from "react";

const FormInput = ({ label, value, errorMessage, onChange, name, id, classNameLabel, ...inputProps }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };
  //   console.log(focused);
  return (
    <div className="relative flex w-full sm:w-auto flex-col lg:flex-row gap-2 ">
      {label && (
        <label className={classNameLabel} htmlFor={name}>
          {label}
        </label>
      )}
      <div className="flex flex-col gap-2 w-full">
        <input
          value={value}
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() => setFocused(false)}
          focused={focused.toString()}
          id={name}
          name={name}
        />
        {errorMessage && !focused && <span className="text-xs text-main">{errorMessage}</span>}
      </div>
    </div>
  );
};

export default FormInput;
