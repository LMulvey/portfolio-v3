---
title: Learnings from deploying AppSync and Lambdas using Serverless
slug: 'blog/learnings-from-deploying-appsync-and-lambdas-using-serverless'
date: '2019-07-09'
author: 'Lee'
description: "Let's look at Serverless and deploying AppSync using Lambdas as data sources!"
categories: ['serverless', 'aws', 'appsync', 'lambda', 'development']
keywords: ['serverless', 'aws', 'appsync', 'lambda', 'development']
---

Amazon's AWS has done a huge service to the web community by providing a huge (and oft overwhelming) tool set for building applications. AppSync is Amazon's answer to a GraphQL server implementation that allows you the flexibility of choosing your data sources to hook up your resolvers with fairly easy-to-use methods through the AWS Console. The drawback here is when working on a team, having more hands on the wheel of the console can make for a bit of a mess–plus it's not as maintainable as managing code locally. That's where [Serverless](http://www.serverless.com) comes in!

## Serverless is amazing

Serverless is an incredible CLI that allows you to _describe_ what you need from your AWS stack in a YAML file... and then Serverless handles the rest. When you deploy, it boils your config into a CloudFormation template and ships it off to AWS to have your stack created/updated. It handles connecting it all together and everything. It truly feels like magic at times! This includes creating Lambdas and packaging/bundling them up to be uploaded to S3 and deployed. There's even a wide-array of plugins for bundling ([Webpack](https://github.com/serverless-heaven/serverless-webpack), [Parcel](https://github.com/johnagan/serverless-parcel), and an unfortunately un-maintained Rollup plugin) so you can make your Lambdas teeny-tiny with ease so they warm up and fire real quick without much cost to you.

There's another nifty plugin to allow AppSync integration, [serverless-appsync-plugin](https://github.com/sid88in/serverless-appsync-plugin). Like vanilla-Serverless, the plugin allows you to describe your needs from AppSync. AppSync has a bit more overhead in terms of creating resolvers. Let's talk about the process a bit:

### Resolvers w/ AppSync

AppSync uses Apache Velocity Templates to resolve your GraphQL fields. Basically, when it receives a GQL request, it'll look at the field of that request, and then look in your config for a Request Mapping Template entry to determine what to do. Those look like this:

```
- dataSource: MusicHandler
  type: Query
  field: getTracks
  request: 'mapping-templates/getTracks-request.vtl'
  response: 'mapping-templates/json-response.vtl'
```

From there, it'll hit the actual _request_ template to formulate a response. A `<field>-request.vtl` would look like this:

```
{
    "version": "2017-02-28",
    "operation": "Invoke",
    "payload": {
        "field": "getTracks",
        "arguments": $utils.toJson($context.arguments)
    }
}
```

The `payload` object is sent to your dataSource as information you can use to resolve the queries. For example, if your dataSource is defined as a Lambda, your Lambda will have a `handler` function with this signature: `handler(event, context, callback)` - In that example, `payload` === `event`!

### Benefits

Well, focusing entirely on Lambdas here, you can scale independently. With my implementation, we used one-Lambda per service (roughly) which allowed us to scale up resolvers that may need a bit more memory to get the job done and scale down lighter-weight ones.

This inherently encourages Lambda code that is lightweight and pure–and discourages bloat.

### Gotchas

- Lambdas have an IAM role to perform actions. AppSync will need to assume this role to invoke the Lambda function. For that, your Lambda role needs two things: Lambda:Invoke (invoke itself) _and_ a trust relationship with AppSync. Without this, you'll be hit with permission issues.
- One plugin I haven't spoke about: [serverless-appsync-offline](https://github.com/aheissenberger/serverless-appsync-offline) is wicked but has a few drawbacks. As of writing you cannot combine your dataSources and mappingTemplates into separate files with arrays (as per the Serverless config) as this breaks the plugin. If your project is small, this is fine as your `serverless.yml` file will stay relatively small regardless. For larger projects, this sucks (though without the offline functionality, development workflows can be sloooooow).

### Is that it?

Probably not. I'll update as I continue to work with this exciting stack. 👌
