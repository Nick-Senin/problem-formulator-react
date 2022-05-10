import { useLayoutEffect ,  useEffect , useState , useCallback } from "react";
import { store } from "../store";

export function useSubscribe (func){
  useEffect( () => {
    const unsubscribe = store.subscribe(() => {
      func(); 
    }); 
    return () => unsubscribe();
  } , []);
}

export const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    
    const toggle = useCallback(() => setState(state => !state), []);
    
    return [state, toggle]
}

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export function useParentSize(parentRef){
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);

  function checkSize (){
    setWidth(prev=>parentRef.current.offsetWidth);
    setHeight(prev=>parentRef.current.offsetHeight);
  };

  useLayoutEffect(()=>{
    checkSize(); 
    window.addEventListener("resize", checkSize);
    return () => {window.removeEventListener('resize', checkSize)}
  },[]); 

  return [width , height]; 
}

export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

