---
title: Junior SysAdmin
slug: 'blog/junior-sysadmin'
date: '2017-11-11'
author: 'Lee'
description: 'Developer? Or complete IT department? Journeying into full-stack.'
categories: ['Development', 'DevOps', 'Digital Ocean']
keywords: ['Development', 'DevOps', 'Digital Ocean']
---

I've embarked on a new adventure I've anticipated for quite a while - the journey to becoming a System Administrator.

I try to expand my skillset whereever possible and **never stop learning** . In an ever-changing industry like web development, it's invaluable to know the latest technology, frameworks, and languages. Many agencies now expect a Web Developer to wear many hats: Front-end Developer, Back-end Developer, Designer, Copywriter, and _System Administrator_. I strive to be beyond mediocre in all these areas because I'm passionate about building. The resume padding doesn't hurt either 🤗.

## The Reluctant SysAdmin

One of my newer clients had arranged free hosting with a friend operating an Apache server part-time. The client, wanting to keep costs low, opted for the free host. Initially I was okay with it, but we quickly ran into issues. While developing a PHP image cropping tool that used the ImageMagick, I ran into an issue - ImageMagick wasn't enabled server-side in `php.ini`. I contacted the friend to see if we could get it enabled. Weeks went by without a response before finally saying that they could infact enable it, and that it had been done. I went to test my tool again:

```php
Class 'Imagick' not found.
```

Sigh. So, I contact him again. Weeks go by with no response. I'm left talking to the client to discuss why this issue is happening, and why I can't get the tool working -- a tool that was in the original scope of the project and was due to be finished _months ago_. Eventually, I had my client agree to pay for proper hosting. But, having come fresh off the frustrations of needing to go through someone else to fix sever issues, I suggested that we go the route of _DigitalOcean_. I didn't any xperience actually spinning up an Ubuntu sever from scratch and knew I had a bit of reading to do.

I've spent the last few days working through [_Servers For Hackers_ by Chris Fidao](https://book.serversforhackers.com/) to help guide me on my adventure. Now that the client's site is actually ported over and up-and-running, I'll share a few of my learnings:

## PM2 for process-handling

The server was working, my Node.js app was launched, and everything was great. Until the next morning. It shut down. After looking into it, I realized that issuing `npm start` from console would cause my `server.js` to shutdown as soon as I lost connection to SSH. Instead, I looked into PM2 which is a process-handling program for Ubuntu. With it, I could setup PM2 as a startup app for Ubuntu and then start my Node.js app through PM2 which runs it as a service. With this setup, the app restarts when it needs to, and if the server crashes and resets, my `server.js` is launched again by PM2.

## Express Routes

I seriously needed to read the documentation here on serving static files. My file structure was as follows:

```
/app
->/server
-->/views
-->/routes
->/public
-->/css
-->/js
```

After launching my app through PM2, I had to learn how `express.static` actually works and how it finds my static files (hint: it's relative to where you launch your Node.js process). After a few hours and a few fleeting desires to chuck my MacBook off the balcony, I found a solution that worked. I removed my `/server/` folder and moved my `server.js` to the main app directory, along with my `/routes/` and `/views/` folders. I then set my `express.static` to: `express.static(__dirname + '/public')` and all my static assets were properly served. A happy ending to a frustrating day 👍.

## Not The End

This is where I'm at only a few days in. It's exciting being in command of your own VPS and not having to create support tickets to fix minor issues. I'll continue to share my learnings as I go!
