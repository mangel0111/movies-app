import React, { useEffect, useRef } from "react";

import Loading from "./components/Loading";

function LoadingWrapper({ loading, children, withInitialLoading, className }) {
  const initialLoading = useRef(withInitialLoading);
  useEffect(() => {
    if (initialLoading.current && loading) {
      initialLoading.current = false;
    }
  }, [loading]);
  return initialLoading.current || loading ? (
    <Loading className={className} />
  ) : (
    <>{children}</>
  );
}

export default LoadingWrapper;
