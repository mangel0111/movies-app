import { useEffect, useRef } from 'react';
const useMount = (func, deps = []) => {
  const mount = useRef(false);
  useEffect(() => {
    if (mount.current) func();
    mount.current = true;
  }, deps);
};

export default useMount;
