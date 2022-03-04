import { useEffect } from 'react'

function useClickOutSide(ref,setter) {
  useEffect(() => {
 
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
          setter(false)
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref])}

export default useClickOutSide;