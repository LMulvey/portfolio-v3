import React from 'react';
import styled from 'styled-components';

const HeaderButton = ({ link, icon, title, theme }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <Button theme={theme}>
      <i className={`${icon} fa-fw`} /> {title}
    </Button>
  </a>
);

const Button = styled.button`
  margin: 5px 10px;
  padding: 5px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  border: none;
  color: rgba(0, 0, 0, 0.8);
  transition: all 75ms ease-in;
  transition-property: border, background-color, color, transform;
  cursor: pointer;

  & ${props => props.icon}.fa-fw {
    color: ${props => props.theme.main};
    transition: all 75ms ease-in;
    transition-property: border, background-color, color, transform;
  }

  :hover {
    background-color: ${props => props.theme.main};
    color: ${props => props.theme.contrast};
    transform: scale(1.04);
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
