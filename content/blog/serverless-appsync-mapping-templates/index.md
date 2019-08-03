---
slug: "blog/serverless-appsync-mapping-templates"
date: "2019-07-19"
title: "API Gateway - Mapping Templates with Serverless"
author: "Lee"
description: "Let's talk about AppSync VTL Mapping Templates 🗺"
categories: ["aws", "appsync", "serverless", "lambda", "aws lambda"]
keywords: ["serverless", "appsync", "aws", "amazon", "mapping templates", "lambda"]
banner: "./images/banner.jpg"
---

As previously discussed in my [other Serverless post](https://leemulvey.com/blog/AWS-AppSync-Serverless-Lambdas/), *Mapping Templates* are a way for AWS services to prepare requests for data sources and prepare the response to the API consumer. I ran across a project recently where I was tasked with using an API Gateway to hit an AWS Lambda function, however, that gateway needed to forward query parameters to the Lambda so it could be processed.

This task would be easy in enough in most cases, however, with AWS, you must use Apache's Velocity Templates to formuate a Mapping Template for AWS. You can generate these (somewhat) through the AWS console, and you can certainly modify them in there. BUT! The point of Serverless is to avoid the console, make it easy to deploy, and allow more hands in the pot. In my particular use case, I needed to develop a POC on my own AWS account and then have it deployed on the clients. It's
much easier in this case to prepare a `serverless.yml` file and swap creds for the client. Now, first, let's say we have this mapping template. I'm not going into the syntax for mapping templates in this post (future post, maybe). Though, try to step through it and I think you'll understand!:

```js
// api-mapping-template.vtl
{
  "body" : $input.json('$'),
  "headers": {
    #foreach($header in $input.params().header.keySet())
    "$header": "$util.escapeJavaScript($input.params().header.get($header))" #if($foreach.hasNext),#end

    #end
  },
  "method": "$context.httpMethod",
  "params": {
    #foreach($param in $input.params().path.keySet())
    "$param": "$util.escapeJavaScript($input.params().path.get($param))" #if($foreach.hasNext),#end

    #end
  },
  "query": {
    #foreach($queryParam in $input.params().querystring.keySet())
    "$queryParam": "$util.escapeJavaScript($input.params().querystring.get($queryParam))" #if($foreach.hasNext),#end

    #end
  }
}
```

What this template does is grabs the `headers`, `query`, and `params` from the request hitting API Gateway and pops them onto the `event` argument that is eventually passed into my Lambda `handler` method. Phew! Now, I have two options for "deploying" this template:

1. Upload into the AWS console for my respective GET endpoint on the API Gateway
2. Attach it to my `serverless.yml` for deployment

Obviously, I'm aiming for option #2 which leads us to the title section of this post.

## Referencing Mapping Templates for API Gateways/Lambdas in Serverless

It's actually quite simple. You just add a new field onto your `function` definition in your `serverless.yml` file. I'm sure there's a way to inline it, but, even better, you can use the awesome `${file()}` variable method to reference an external `.vtl` file and have it packaged up with your CloudFormation template.

```yml
functions:
  doTheThing:
    handler: deployment/src/handler.doTheThing
    events:
      - http:
          path: /do-thing
          method: get
          integration: lambda
          request:
            template:
              application/json: ${file(./mapping-templates/api-gateway-mapping-template.vtl)}
```

And that's it! On your next deploy, your mapping template will be assigned in the console to your API Gateway for the path specified in your function. Serverless is awesome (I swear I'm not sponsored by them).

If you have any questions, drop them in the comments. Hoping this helps some people out who are looking for answers as this was *not* easy to find! ✌🏻
