import { useEffect, useRef } from 'react';

const useDidMount = (effect, dependencies) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      effect();
      hasMounted.current = true;
    }
  }, dependencies);
};

export default useDidMount;
