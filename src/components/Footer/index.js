import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 25px;
  background-color: #65879c;
  border-top: 1px solid rgba(0, 0, 0, 0.15);

  @media screen and (max-width: 500px) {
    justify-content: center;
  }
  & > a {
    color: white;
    font-weight: 700;
    font-size: 1.2em;
    margin: 0 25px 0 25px;
    text-decoration: none;
    border-bottom: 3px solid transparent;
    transition: all 125ms ease-in;

    @media screen and (max-width: 500px) {
      margin-bottom: 10px;
      font-size: 1em;
    }

    &:hover {
      text-decoration: none;
      border-bottom: 3px solid teal;
    }
  }
`;

const Footer = ({ links }) => {
  return (
    <StyledFooter>
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          target={link.target || '_blank'}
          alt={link.label}
        >
          {link.label}
        </a>
      ))}
    </StyledFooter>
  );
};

export default Footer;
