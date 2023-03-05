import { useState } from "react";
import { sellMovie } from "../api/movies";

const DEFAULT_ALERT = { msg: undefined, type: "success" };

function useSellMovieModal(onSuccess, onFailure) {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState({ ...DEFAULT_ALERT });

  const handleSellMovie = (movieId, selectedStudio) => {
    sellMovie(movieId, selectedStudio.id)
      .then(() => {
        setIsOpen(false);
        setNotification({ msg: "Sale succesfully completed", type: "success" });
        onSuccess && onSuccess();
      })
      .catch(() => {
        setIsOpen(false);
        setNotification({ msg: "Sorry try again latter", type: "error" });
        onFailure && onFailure();
      });
  };

  const closeNotification = () =>
    setNotification((prev) => ({ ...prev, message: undefined }));

  return {
    isOpen,
    setIsOpen,
    handleSellMovie,
    notification,
    closeNotification,
  };
}

export default useSellMovieModal;
