---
title: 'Launch Learnings: Triple C'
slug: 'blog/launch-learnings-triple-c'
date: '2017-12-07'
author: 'Lee'
description: 'A look at lessons learned from launching to production.'
categories:
  ['Development', 'DevOps', 'Digital Ocean', 'Launch Learnings']
keywords:
  ['Development', 'DevOps', 'Digital Ocean', 'Launch Learnings']
---

In my last post, I described some of the trials of making the jump to being a Junior SysAdmin. Jumping into the unknown is one of my favourite parts of working in Web Development. It can be an _extremely_ overwhelming industry at times and I oftenfind myself experiencing a serious amount of imposter syndrome. That said, anytime I take on a project, I break it into smaller components and build it back up. With that method, I rarely hit a wall so large that I can't hurdle over it to the finish line. 🐎

## Image Processing, or, how I learned to re-invent the wheel

The client in my last project had pretty non-specific needs. He wanted a portfolio site to display his woodworking projects to friends and potential clientelle. I could have easily phoned it in with a quick image upload script, however, I wanted the site to be a joy to use both to ensure he was happy, but also, (selfishly), to reduce the chance that he would require help getting it setup and running. After making the jump to Node.js-land from working on a LAMP stack for most of my web development career, I found the lack of image processing documentation and pre-made packages a little startling. It's not that I set out to just download a pre-made script throw it onto his website, and call it a day but... there wasn't a ton of information on the subject. Admittedly, when I was still in PHP land, I was using a combination of pre-mades and my small amount of knowledge of ImageMagick to get by. I didn't have a huge understanding of multipart file handling, if any. So, I broke it out into pieces:

1. Build a user-facing upload interface
2. Capture the files on the server-side (even just console.log them to see what I have to work with)
3. Upload the images
4. Process the images
5. Load the image URLs + any attached form data into a database (Mongo)

Woo! Easy, I thought. In hindsight, it wasn't so bad getting this all worked out. But, the road to glory here was a long and treacherous one with many, many late nights. I've emerged as a stronger programmer with an improved toolset—and a reduced feeling of imposter syndrome. So, let's take a quick look at what I used:

#### Passport.js

I used [Passport.js](http://www.passportjs.org) to handle authentication. The site really only needed _two_ admin accounts—one for the client and one for me—so, I didn't want to invest too much time here. Passport.js is a fantastic piece of middleware that works great with Express. It handles authentication locally, and for Facebook, Twitter, and whatever else you can think of. Highly recommend!

#### Multer

[Multer](https://github.com/expressjs/multer) is a great tool with not a ton of documentation. Once you figure it all out (lots of StackOverflow reading, folks). This grabs your multipart form data and puts it into an array (`files.`) for you to work with.

#### Sharp

For image-processing on the server side, I used [Sharp](http://www.sharp.dimens.io) which has _fantastic documentation_.

#### Dropzone.js

To make things easier for the client, I used [Dropzone.js](http://www.dropzonejs.com) which upgrades your regular `<input type="file">` into a super-duper input that handles multiple files that you can just drag-and-drop to. Tons of customization and options made this a breeze to implement. I did a ton of hacking to add extra inputs as the images are dropped so the client could append titles, descriptions, and add gallery information for each image uploaded.

#### A whole lot of patience

Obviously there is no link for this one but I can't stress it enough. If you're in over your head with a programming problem, take a walk, take a breather, make a coffee, watch an episode of a television show or a YouTube video, and come back to it. You'd be surprised what a 15-minute break does for your brain and allows you to really break problems down and come to a solution that seems so far away when you're stressed.

### Information & Links

If you're interested in the project, it was for a home renovations company in Edmonton called [Triple C Woodworx](https://www.triplec.ca) that creates _beautiful_ custom wood furniture, cabinetry, and other pieces.

The project can be found on [GitHub](http://www.github.com/lmulvey/triplec-node) as well.

Cheers! 🚀
