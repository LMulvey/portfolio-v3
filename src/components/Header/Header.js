import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import HeaderButton from './HeaderButton';

const descriptors = [
  'Weird Dad 👨🏼‍💻',
  'Super Weird Dad 💁🏼‍♂️',
  'Mentor 👨🏼‍🏫',
  'Surfboard, Surfboard 🐝',
  'Ghost 👻',
  'Just Frontend 🐥',
  'Bike Dad 🚲',
  'Sunflower 🌻',
  'Big Daddy Developer 👱🏻‍♂️',
  'Ask Me About GraphQL',
  'Secretly Loves AWS',
  'Misses Apollo',
  'Maybe Full Stack',
  'Master Description Writer',
  'Ponderer of Meowing Cats',
  'F5 Inspiration Driver',
  'Edmonton > Calgary',
  'YYC DT Library Lover'
];

const randomDescriptor = () =>
  descriptors[Math.floor(Math.random() * (descriptors.length - 1))];

const Header = () => (
  <HeaderContainer fluid>
    <Row justify="between" align="center">
      <Col xl={6} lg={8} md={12}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <LogoContainer>
            <Wordmark>Lee Mulvey</Wordmark>
            <Submark>Developer && {randomDescriptor()}</Submark>
          </LogoContainer>
        </Link>
      </Col>
      <Col xl={6} lg={4} md={12} justify="center">
        <ButtonsContainer>
          <HeaderButton
            title="Blog"
            link="http://www.leemulvey.com/blog"
            icon="fal fa-newspaper"
          />
          <HeaderButton
            title="Twitter"
            theme={{ main: '#1dcaff', contrast: 'white' }}
            link="http://www.twitter.com/LeeMulvey"
            icon="fab fa-twitter"
          />
          <HeaderButton
            title="GitHub"
            link="http://www.github.com/LMulvey"
            icon="fab fa-github"
          />
          <HeaderButton
            title="StackOverflow"
            theme={{
              main: '#FF9900',
              contrast: 'white',
              color: '#FF6922',
            }}
            link="https://stackoverflow.com/users/8246359"
            icon="fab fa-stack-overflow"
          />
        </ButtonsContainer>
      </Col>
    </Row>
  </HeaderContainer>
);

export default Header;

const HeaderContainer = styled(Container)`
  padding: 44px 20px;
`;

const LogoContainer = styled.div`
  display: block;
  position: relative;
  @media (max-width: 991px) {
    margin-bottom: 25px;
    text-align: center;
  }
`;

const Wordmark = styled.h1`
  display: inline-block;
  font-family: 'flood-std', sans-serif;
  font-size: 5rem;
  text-align: center;
  text-shadow: -5px -5px 0px white;
  background: #1a2a6c;
  background: linear-gradient(to right, #fdbb2d, #b21f1f, #4f424c);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border: 0;
  padding: 20px 5px;
  @media (max-width: 525px) {
    font-size: 3.5rem;
  }
`;

const Submark = styled.p`
  display: inline-block;
  position: absolute;
  bottom: -1.5rem;
  left: 25px;
  min-width: 120px;

  font-size: 22px;
  font-weight: 700;
  text-align: center;
  color: white;
  text-decoration: italic;
  text-shadow: 2px 2px 0px rgba(255, 82, 0, 0.8);

  @media (max-width: 991px) {
    width: 100%;
    left: 0;
    font-size: 18px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  @media (max-width: 991px) {
    justify-content: center;
  }
`;
