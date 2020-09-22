---
title: Nissan Shopping Tools
slug: nissan-shopping-tools
isProject: true
date: '2020-08-05'
status: complete
url: https://www.nissanusa.com/shopping-tools/build-price
technologies:
  !!seq [
    Appsync,
    React,
    GraphQL,
    Storybook,
    Jest,
    JavaScript,
    HTML,
    CSS,
    SCSS
  ]
banner: ./images/ngst-2.png
photos:
  !!seq [
    './images/ngst-1.png',
    './images/ngst-2.png',
    './images/ngst-3.png',
    './images/ngst-4.png',
  ]
---

Nissan Shopping Tools is a re-imagining of the Shopping Tools experience for the NissanUSA website. The project consists of three applications built from the ground-up using React.js, data-driven by a GraphQL/Appsync backend orchestrating multiple data providers into one consumable schema.

The project was built to feel more like a singular application with more data pulled upfront to provide a seamless client-side experience starting from the Filtration page, into the Configuration of your vehicle, and ending with viewing Inventory for the model you want and calculating payments. 

Using AWS Appsync, I helped create a seamless backend that stitched together a wide variety of data providers into an easily consumable schema to be used by the NGST applications, as well as future applications. We took advantage of using Lambdas as resolvers for Appsync to allow easy scalability and offload complex data transformation logic to the cloud. 
