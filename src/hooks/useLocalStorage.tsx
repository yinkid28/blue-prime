import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const isLoaded = typeof window !== "undefined";
      const item = isLoaded ? window.localStorage.getItem(key) : null;
      return item ? { ...initialValue, ...JSON.parse(item) } : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    setStoredValue((prevValue: any) => {
      try {
        const isLoaded = typeof window !== "undefined";
        const item = isLoaded ? window.localStorage.getItem(key) : null;
        return item ? { ...prevValue, ...JSON.parse(item) } : prevValue;
      } catch (error) {
        console.log(error);
        return prevValue;
      }
    });
  }, [key]);

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
