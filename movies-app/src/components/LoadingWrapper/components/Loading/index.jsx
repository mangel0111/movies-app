import React from "react";
import Lottie from "react-lottie";

import { getOptions } from "./constants";

import styles from "./styles.module.scss";

function Loading({ height, width, loop, autoplay, rendererSettings }) {
  return (
    <div className={styles.spinnerContainer} data-testid="movie-app-loader">
      <Lottie
        data-testid="movie-app-loader-lottie"
        height={height}
        options={getOptions({ loop, autoplay, rendererSettings })}
        width={width}
      />
    </div>
  );
}

export default Loading;
