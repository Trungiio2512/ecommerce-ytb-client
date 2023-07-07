import { useRef, useState, useEffect, useCallback } from "react";

import Portal from "./Portal";
import Button from "./Button";
import icons from "../until/icon";
const { AiOutlineClose } = icons;

const defaultFn = () => {};

function Modal({
  isOpen = false,
  shouldCloseOverlayClick = true,
  children,
  id,
  onRequestClose = defaultFn,
}) {
  const [closesing, setClosing] = useState(false);
  const containerRef = useRef();

  const handleRequestClose = useCallback(() => {
    setClosing(true);
    containerRef.current.addEventListener(
      "animationend",
      (e) => {
        e.stopPropagation();
        setClosing(false);
        onRequestClose();
      },
      { once: true },
    );
  }, [onRequestClose]);

  useEffect(() => {
    const handleClickOnKeyboard = (e) => {
      if (isOpen && e.code === "Escape") {
        handleRequestClose();
      }
    };
    document.addEventListener("keydown", handleClickOnKeyboard);

    return () => {
      document.removeEventListener("keydown", handleClickOnKeyboard);
    };
  }, [isOpen, handleRequestClose]);

  if (!isOpen) return null;

  return (
    <Portal containerId={id}>
      <div className={`fixed w-full h-full top-0 left-0 z-10 flex items-center justify-center `}>
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-black-05"
          onClick={shouldCloseOverlayClick ? handleRequestClose : defaultFn}
        />
        <div
          className={`${
            closesing ? "animate-scale-down-center" : "animate-scale-up-center"
          } bg-white m-auto max-w-[800px] w-full mx-5 p-[30px] relative overflow-y-auto`}
          ref={containerRef}
        >
          <Button
            onHanldeClick={handleRequestClose}
            className="text-base float-right hover:text-main p-2 border border-gray-300 hover:border-red-500 rounded-md absolute top-2 right-2"
          >
            {/* <TimeIcon width={25} />} */}
            <AiOutlineClose />
          </Button>
          {children}
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
