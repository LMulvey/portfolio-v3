import React from 'react';
import { Link } from 'gatsby';

const LinkWrapper = ({ children, to, ...other }) => {
  const internal = /^\/(?!\/)/.test(to);

  if (internal) {
    return (
      <Link to={to} {...other}>
        {children}
      </Link>
    );
  }

  return (
    <a href={to} {...other}>
      {children}
    </a>
  );
};

export default LinkWrapper;
