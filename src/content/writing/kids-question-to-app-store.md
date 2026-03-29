---
title: "From a Kid's Question to the App Store"
description: "How watching my kids play led to building an iPad app with AI — and what was actually hard about it."
category: "AI Tools / Productivity"
date: 2026-03-29
leadImage: "/images/writing/kids-question-to-app-store/lead.webp"
---

My son asked me what would happen if an asteroid hit Earth. I was working on my laptop.

I didn't have an answer. I Googled it. He followed up with where the asteroid belt is, how big Jupiter is compared to Earth, and why the Moon goes around Earth but Earth goes around the Sun. This is a regular Tuesday in my house.

Everything out there for kids his age is either static or passive. Images in a book. A three-minute YouTube video about Saturn's rings. Nothing he could touch or play with. He wanted to interact with the solar system. The options available were "look at the solar system."

So I built a browser-based solar system explorer. React, Three.js, a weekend project. Drag to orbit, pinch to zoom, tap any planet to get fun facts. 22 celestial bodies. A spacecraft mode to fly between worlds.

My kids used it a few times and moved on.

Fair enough. A laptop browser isn't how a five-year-old wants to explore space. An iPad is. Touch, pinch, rotate. That's how kids already expect things to work.

So the next step was an iPad app. I had never opened Xcode. I didn't know Swift or SwiftUI or RealityKit. But I'd shipped enough projects with Claude AI and Claude Code to know that unfamiliar languages aren't the wall they used to be. The real question was whether the workflow would hold up for a native app on a platform I'd never touched.

It did. Four weekends. And the part that surprised me most was that the code was the easy part.

## The code was the easy part

Claude AI for planning. Claude Code for implementation. Gemini for visual assets like the app icon. Between these tools, the software side came together faster than any project I've done before.

What made it work was planning. I spent a couple of days before writing a single line of code. Just thinking through what the app should be, how it should be structured, writing detailed specs. That produced 23 or 24 Claude Code prompts. Every screen, every interaction, every animation. All mapped out before Xcode was even open.

If you're thinking about building an app and "I don't know how to code" is holding you back, that's not the blocker it used to be. The tools are good enough now. What they can't do is think through what you should build. That part is still yours. And it matters more than ever, because if you skip planning, you'll burn through prompts fixing problems you could have avoided.

## Six modes because I watched my kids

The original plan was simple. Rebuild the browser explorer as a native iPad app. Better touch controls, better 3D.

Then I started paying attention.

My son would explore for a bit, learn some facts, and then want more. He kept asking "what if" questions. What happens if Jupiter disappears? What if Earth had two suns? He wanted to test ideas, not just read facts.

My daughter had a completely different reaction. She asked if she could color Jupiter. Could she make it cuter? She's into fine arts and drawing. The solar system was interesting to her only if she could make it her own.

So the explorer became one of six modes. Size comparison where you line up planets and see the scale. Quiz section with badges, ranks from Space Cadet to Admiral, and a daily question. Customize, where you pick any planet and paint it however you want. My daughter painted Saturn pink with polka dots and a lot of hearts. That's the section she opens every time.

Then the hard stuff. "What If" lets kids remove planets or add suns and watch the gravitational impact in real time. "Build Your Own Solar System" lets them place stars and planets wherever they want, then switch to gravity mode and see if their creation survives actual physics.

Don't lock your scope before you've watched someone use the thing. Even on a side project.

## The one part that was genuinely hard to build

Both "What If" and "Build Your Own" depend on gravity simulation. Get the formulas wrong and planets don't stay in their orbits. They fly off the screen. Or crash into each other. Or freeze.

Claude Code wrote the calculations. I verified visually after every build. Planets drifting out of stable orbits. Moons colliding for no reason. Rebuild, test, watch things break, rebuild again. Several iterations before the simulation held.

This was the exception to "code was easy." Physics simulation needs visual verification every time. You can't read the code and know it's correct. You have to run it and watch. If you're building anything with simulation or complex visual output, budget extra time for this loop.

## Everything that was actually hard had nothing to do with code

I registered for the Apple Developer Programme. Paid the fee. Waited for the license. Two of my four weekends were just waiting.

Once the license came through, I submitted the app. It got rejected.

Not because of the app. I had included an in-app purchase, a 7-day free trial with a $2.99 unlock, but I hadn't filled in my taxation details and residential status. Apple requires that paperwork before they'll approve anything with an IAP. You find out when you get the rejection email.

Filled in the forms. Resubmitted. Approved.

The IAP itself was a deliberate experiment. I wanted to understand how App Store pricing works. Different prices for different geographies. Trial mechanics. Paywall configuration. I kept it live for about a week, then removed it and made everything free. The app is for my kids. Charging for it was never the point. But the process taught me how IAPs work, how Apple's review process works, and how to submit an update to an already published app.

If you're planning to put an app on the App Store, here's what to expect. You'll need an Apple Developer account. That's $99 per year. The license can take a few days to process. Fill in all your tax and legal details before you submit, not after. If you have an IAP, Apple will reject you if this paperwork isn't done. App Store review itself takes a day or two. If you get rejected, read the reason carefully. It's usually procedural, not technical.

This is the stuff that actually slows you down. Not the code.

## Four weekends

Two weekends of building. Two more of waiting for the developer license, submitting, getting rejected, filling forms, resubmitting, and fine-tuning in between.

The app is called Planetia. Free. iPad only. No ads, no tracking, no accounts. Six ways for kids to mess around with the solar system.

My son is grinding through quiz ranks. My daughter keeps repainting Saturn.

If you've been sitting on an app idea and telling yourself you'll learn Swift first, or that you need a course, or that you're not technical enough. Stop. The tools exist. The code is the easy part now. Spend your time figuring out what to build, planning it properly, and being ready for the paperwork on the other side.

[Download Planetia on the App Store](https://apps.apple.com/us/app/planetia/id6760576240)
