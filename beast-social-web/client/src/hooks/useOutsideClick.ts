import { useEffect } from "react";

type useOutsideClickType = (
  ref: React.MutableRefObject<any>,
  cb: () => void
) => void;

const useOutsideClick: useOutsideClickType = (ref, cb) => {
  useEffect(() => {
    function handleClickOutside(ev: _MouseEvent): any {
      if (ref.current && !ref.current.contains(ev.target)) {
        cb();
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, cb]);
};

export default useOutsideClick;
