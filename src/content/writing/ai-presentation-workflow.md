---
title: "From 7 Hours to 1: My AI Presentation Workflow"
description: "How I use NotebookLM and Gamma to create compelling presentations in a fraction of the time."
category: "AI Tools / Productivity"
date: 2026-01-10
leadImage: "/images/writing/ai-presentation-workflow/lead.webp"
---

**Confession: presentations used to be my time sink.**

Not the presenting part. The building part. That slow, painful process of staring at slides, wondering why everything looks like it's from 2003\.

Then I stumbled onto a workflow that changed how I make decks. Two AI tools that, weirdly, work better together than either does alone.

---

**The problem I was trying to solve**

![Conference overload](/images/writing/ai-presentation-workflow/conference-overload.webp)

I'd just come back from a two-day industry conference. Twenty-plus sessions, back to back. Our HR team asked me to present a summary of key learnings to the internal team.

My old process for something like this would have been:

Go through my notes. Try to remember what was actually useful versus what just sounded good in the moment. Coalesce everything into a rough outline. Open PowerPoint. Stare at blank slides. Drag boxes around. Hunt for images that aren't embarrassing stock photos. Realize the flow doesn't work. Restructure. Fix the formatting that broke when I restructured. Repeat.

Six to seven hours of dedicated effort, spread across multiple days. For a deck that would get presented once.

There had to be a better way.

---

**The accidental discovery**

![The lightbulb moment](/images/writing/ai-presentation-workflow/lightbulb-moment.webp)

I'd been playing with NotebookLM for a while. It was this cool tool that could generate podcasts and video summaries from documents you uploaded. Impressive demos, but I hadn't figured out a real use case for it in my actual work.

Then it clicked: I had all the conference materials. Speaker presentations. Session transcripts. What if I just... uploaded everything and asked it to find the patterns?

So I did. Dumped all the files in, gave it some context about what I needed, and asked for 10-ish slides worth of content summarizing the key learnings.

NotebookLM did the heavy lifting. It pulled themes across sessions, identified the insights that kept coming up, and structured them in a way that actually made sense.

Now I had content. But I still needed a deck.

---

**Enter Gamma (after some hesitation)**

I'd been hearing about Gamma for months. It kept showing up in my feed as THE AI presentation tool. But every time I opened it, I felt overwhelmed.

Too many options at first glance. Add a gamma (standard? custom?). API integrations. Different generation modes. It felt like the learning curve would be steep, and I didn't have time to figure it out.

But I had my NotebookLM output, and I was curious. So I found the "Paste in Text" feature and just... pasted.

Fifteen minutes later, I had a complete deck.

Not just slides with text on them. Actual designed slides. Custom images that made sense in context (no more generic photos of people pointing at whiteboards). Icons that looked intentional. A visual hierarchy that worked.

---

**The workflow, step by step**

Here's what I actually do now:

**Step 1: Gather your source material.** This works best when you have existing documents to work from. Conference presentations, meeting notes, research reports, competitor analysis, transcripts. The more context you give NotebookLM, the better the output.

**Step 2: Upload everything to NotebookLM.** Don't be precious about organization. Just dump it all in. NotebookLM is surprisingly good at finding signal in noise.

**Step 3: Give it context and ask for slides.** I tell it what the presentation is for, who the audience is, and roughly how many slides I want. Something like: "I need to present the key learnings from this conference to my internal team. Give me content for 10-12 slides covering the most important insights."

**Step 4: Copy the output and paste into Gamma.** Use the "Paste in Text" feature. Gamma will ask you some questions about style and tone. Pick what feels right. (I had to experiment a bit with which settings worked for text-heavy vs. visual content, and which image generation model to use. There's a small learning curve here, but nothing painful.)

**Step 5: Review and tweak.** This is the part you can't skip. More on this below.

Total time once you know the workflow: about an hour. Most of that is the review and polish, not the generation.

---

**The critical step most people skip**

![Fact-checking focus](/images/writing/ai-presentation-workflow/fact-checking.webp)

Here's what Gamma gets wrong: data.

If your presentation involves numbers, statistics, quotes, or anything factual, Gamma can hallucinate. It will confidently put a number on a slide that didn't exist in your source material. Or slightly mangle a statistic in a way that looks right but isn't.

If you don't catch this, you end up in an embarrassing situation during Q\&A when someone asks where a figure came from.

So: review every slide. Check every number against your source. Read every bullet point and ask yourself if that's actually what the original material said.

The generation is fast. The review is where you earn your credibility.

---

**Other tweaks I usually make**

Beyond fact-checking, I typically adjust a few things:

The opening slide often needs a stronger hook. AI tends to generate safe, generic openings. I'll rewrite to make it specific to my audience.

Some slides try to say too much. I'll split them or cut the weakest points.

Image choices are usually good but not always. Maybe one in five I'll swap for something better.

The flow between sections sometimes needs smoothing. AI generates good individual slides but doesn't always nail the transitions.

None of this takes long. Maybe 15-20 minutes of polish on top of the generated draft. Still way faster than starting from scratch.

---

**When this works (and when it doesn't)**

This workflow shines when you already have source material. Conference notes, research documents, meeting transcripts, existing reports you need to repackage. NotebookLM is essentially a summarization and synthesis engine, so it needs something to synthesize.

If you're starting with a blank page and an open-ended idea, skip NotebookLM and go straight to Gamma. You can prompt Gamma directly with your concept and it'll generate a first draft. It won't be as tailored, but it's still faster than building from scratch.

And if your presentation is highly data-driven with lots of charts and specific metrics, be extra careful. Or build those slides manually and use this workflow for the narrative sections.

---

**Why this matters beyond saving time**

The real value isn't just the hours saved. It's that I actually make presentations now.

Before, the effort required meant I'd avoid decks when I could. I'd send a document instead, or just talk through something verbally. Sometimes that was fine. Sometimes I was leaving impact on the table because the format would have landed better as a visual story.

Now the activation energy is low enough that I'll spin up a deck for things I never would have before. A quick summary for my team. A visual for a point I want to make in a meeting. A shareable version of something that was stuck in my head.

The tools aren't doing my thinking for me. They're removing the friction that stopped me from packaging my thinking well.

---

**Try it yourself**

Next time you have to make a presentation and you're dreading the build:

1. Gather whatever documents or notes you already have  
2. Upload them to NotebookLM  
3. Ask for slide content with context about your audience and goal  
4. Paste the output into Gamma  
5. Review, fact-check, and polish

The first time will take longer as you learn the interface. After that, you'll wonder why you ever did it the old way.

