

import PropTypes from "prop-types";
import { useEffect, useState } from "react";


function DelayFallback({ delay = 500, children }) {
  const [show, setShow] = useState(false);
  console.log(delay);

  useEffect(() => {
    // sau 1s thì setShow là true
    console.log("fallback timer start");
    const timer = setTimeout(() => {
      console.log("fallback timer visible");

      setShow(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  //   chạy lần đầu khi mà time < 1s
  if (!show) {
    console.log("không hiện loading");
    return null;
  }

  console.log("hiện loading");

  // nếu mà sau 1s thì hiện children loading
  return children;
}

DelayFallback.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

export default DelayFallback;
