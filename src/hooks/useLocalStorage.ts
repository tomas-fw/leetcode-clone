import { useEffect, useState } from "react";

const getLocalValue = <R>(key: string, initialValue: R | (() => R)) => {
  if (typeof window === "undefined") return initialValue;

  const localValue = JSON.parse(localStorage.getItem(key) || "null");
  if (localValue) return localValue;

  if (initialValue instanceof Function) return initialValue();

  return initialValue;
};

const useLocalStorage = <T>(key: string, initialValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() =>
    getLocalValue<T>(key, initialValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [T, typeof setValue];
};

export default useLocalStorage;
