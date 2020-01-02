---
title: LodgeLink
isProject: true
date: '2019-05-24'
status: complete
url: https://lodgelink.com
technologies:
  !!seq [
    React,
    GraphQL,
    NextJS,
    Apollo,
    Storybook,
    Jest,
    Cypress,
    JavaScript,
    HTML,
    CSS,
  ]
banner: ./images/lodgelink-cover.png
photos:
  !!seq [
    './images/lodgelink-1.png',
    './images/lodgelink-2.png',
    './images/lodgelink-3.png',
  ]
---

LodgeLink 2.0 is an online accommodations marketplace designed to make booking accommodations for yourself, or your workforce as easy as possible. Create and manage your organization, manage crew lists and organization administrators, create and manage bookings, manage booking guest information on a granular level, fine-tune individual guest schedules throughout their stay, as well as see your bookings at a glance easily through the user dashboard.

We were tasked with developing the frontend application for LodgeLink 2.0 to hook up to a GraphQL-powered backend. As one of the first developers on the project, I was tasked with designing a repository strategy along with a build/development workflow that was component-driven and allowed fast changes to be implemented. I divided the project into two repositories: the component library and the frontend (NextJS) application.

The component library used Storybook for rapid development and showcasing of components to allow us to work side-by-side with designers who could see the components as they were built. I utilized rollup.js to build our components and package them up to be published to NPM and consumed on the frotnend.

The frontend app utilized NextJS to allow us to take full advantage of React's SSR capabilities, as well as easy integration with Apollo Client to consume the GraphQL API.
