import { useState } from "react";

const FormInput = ({
  label,
  value,
  errorMessage,
  onChange,
  name,
  id,
  classNameLabel,
  ...inputProps
}) => {
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
      {/* <span>{errorMessage}</span> */}
    </div>
  );
};

export default FormInput;
