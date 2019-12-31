import React, { useState } from 'react';
import Link from 'gatsby-link';
import styled, { keyframes } from 'styled-components';
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
  'Misser of Apollo',
  'Maybe Full Stack',
  'Master Description Writer',
  'Ponderer of Meowing Cats',
  'F5 Inspiration Driver',
  'Edmonton > Calgary',
  'YYC DT Library Lover',
  'Combat. Ready for Combat',
  'Lover of All Love 🏳️‍🌈',
  'The Little Dark Age',
  'FIRE! Fire on the Mountain! 🔥',
  'Jazz Hands 🤗',
  'soundcloud.com/yevyev',
  'Your heroes may disappoint you',
  'Jugg Main',
  'Pond Taker',
  'Bean Dad',
  'Manatee Researcher 🐋',
  'Loki, go away',
  'Why do I have a cat?',
  '10k Grant Recipient',
  'One-time 10km Runner',
  'Hobbyist Hockey Player',
  'Magic Tricker',
  'Just check source for all the possibilities here',
];

const randomDescriptor = (descriptor = null) => {
  const newChoice =
    descriptors[Math.floor(Math.random() * (descriptors.length - 1))];
  return newChoice === descriptor
    ? randomDescriptor(descriptor)
    : newChoice;
};

const Header = ({ pathname = '' }) => {
  const [timer, setTimer] = useState(null);
  const isBlog = pathname.includes('blog');
  const intialDescriptor = isBlog
    ? 'Occasional Blog Writer'
    : randomDescriptor();
  const title = isBlog ? 'Dev Blog' : 'Lee Mulvey';
  const [descriptor, setDescriptor] = useState(intialDescriptor);
  const changeDescriptor = () => setDescriptor(randomDescriptor);
  const handleMouseOver = () => {
    if (!timer) {
      changeDescriptor();
      setTimer(setInterval(changeDescriptor, 700));
    }
  };
  const handleMouseOut = () => {
    clearInterval(timer);
    setTimer(null);
  };

  return (
    <HeaderContainer fluid>
      <Row justify="between" align="center">
        <Col xl={6} lg={8} md={12}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <LogoContainer
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseOut}
              onTouchStart={handleMouseOver}
              onTouchEnd={handleMouseOut}
            >
              {isBlog && <SubWordmark>Lee Mulvey's</SubWordmark>}
              <Wordmark>{title}</Wordmark>
              <Submark key={descriptor}>
                Developer && {descriptor}
              </Submark>
            </LogoContainer>
          </Link>
        </Col>
        <Col xl={6} lg={4} md={12} justify="center">
          <ButtonsContainer>
            {isBlog && (
              <HeaderButton
                title="Home"
                link="http://www.leemulvey.com/"
                icon="fal fa-home"
              />
            )}
            <HeaderButton
              title="Blog"
              link="http://www.leemulvey.com/blog"
              icon="fal fa-newspaper"
            />
            <HeaderButton
              title="Twitter"
              target="_blank"
              theme={{ main: '#1dcaff', contrast: 'white' }}
              link="http://www.twitter.com/LeeMulvey"
              icon="fab fa-twitter"
            />
            <HeaderButton
              title="GitHub"
              target="_blank"
              link="http://www.github.com/LMulvey"
              icon="fab fa-github"
            />
            <HeaderButton
              title="StackOverflow"
              target="_blank"
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
};

export default Header;

const HeaderContainer = styled(Container)`
  padding: 22px 20px;
`;

const LogoContainer = styled.div`
  display: block;
  position: relative;

  @media (max-width: 991px) {
    margin-bottom: 25px;
    text-align: center;
  }
`;

const SubWordmark = styled.h2`
  display: block;
  font-family: 'flood-std', sans-serif;
  margin-bottom: 0;
  padding: 5px 10px;
  text-shadow: -3px -3px 0px transparent;
  border: 0;
  line-height: 1rem;
  background: #1a2a6c;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colours.ORANGE},
    #b21f1f,
    #4f424c
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Wordmark = styled.h1`
  display: inline-block;
  font-family: 'flood-std', sans-serif;
  font-size: 5rem;
  text-align: center;
  text-shadow: -5px -5px 0px white;
  background: #1a2a6c;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colours.ORANGE},
    #b21f1f,
    #4f424c
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border: 0;
  padding: 20px 5px;
  @media (max-width: 525px) {
    font-size: 3.5rem;
  }
`;

const submarkPopIn = keyframes`
  0% {
    transform: scale(0.7);
  }

  25% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
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
  text-shadow: 2px 2px 0px ${({ theme }) => theme.colours.ORANGE};

  animation: ${submarkPopIn} 0.6s
    cubic-bezier(0.175, 0.885, 0.32, 1.275);

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
