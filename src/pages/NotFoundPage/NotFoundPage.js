import React from "react";
import { useLocation, NavLink } from "react-router-dom";

function NotFoundPage() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="not-found">
      <h1 className="not-found__title" data-testid="not-found-path-value">
        404 page not found
      </h1>
      <p>
        The page &quot;{currentPath}&quot; has not been found.{" "}
        <span role="img" aria-label="Sad face.">
          😟
        </span>
        <br />
        You may find what you are looking for on the&nbsp;
        <NavLink to="/">Homepage</NavLink>.
      </p>
    </div>
  );
}

export default NotFoundPage;
