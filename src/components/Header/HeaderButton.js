import React from 'react';
import Link from '../Layout/mdx/Link';
import styled from 'styled-components';

const HeaderButton = ({ link, icon, title, theme, ...others }) => (
  <Link to={link} rel="noopener noreferrer" {...others}>
    <Button theme={theme}>
      <i className={`${icon} fa-fw`} /> {title}
    </Button>
  </Link>
);

const Button = styled.button`
  margin: 5px 10px;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  border: none;
  color: rgba(0, 0, 0, 0.8);
  transition: all 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-property: border, background-color, color, transform;
  cursor: pointer;

  & ${props => props.icon}.fa-fw {
    color: ${props => props.theme.main};
    transition: all 125ms ease-in;
    transition-property: border, background-color, color, transform;
  }

  :hover {
    background-color: ${props => props.theme.main};
    color: ${props => props.theme.contrast};
    transform: scale(1.2);
    & ${props => props.icon}.fa-fw {
      color: ${props => props.theme.contrast};
    }
  }

  @media (max-width: 340px) {
    font-size: 0.75rem;
    margin: 2px;
    padding: 8px;
  }
`;

Button.defaultProps = {
  theme: {
    main: '#3D5757',
    contrast: '#FFFFFF',
  },
};

export default HeaderButton;
