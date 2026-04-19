---
title: "How I Actually Use Claude"
date: 2026-04-15
tag: "AI"
excerpt: "Most people use Claude like a search engine with better grammar. That's about 20% of what it can do. Here's the system I've settled into after months of building — planning, adversarial review, phased execution — and the habits that make it work."
readMin: 9
cover: "/images/writing/how-i-actually-use-claude/lead.webp"
---

Most people use Claude like a search engine with better grammar. Type a question, get an answer, move on. That works for quick tasks. But it's about 20% of what Claude can actually do, and it's the least interesting 20%.

In one of my previous posts, I wrote about how I got started building with AI. The deleted apps, the Udemy courses, the first project that actually shipped. A few people asked the same follow-up: okay, but what's the actual workflow?

This is that post.

I've been building with Claude for several months now. A personal website, a [browser game](https://www.rohitgarrg.com/projects/office-survivors), an [iPad app on the App Store](https://apps.apple.com/us/app/planetia/id6760576240), internal tools at work. Along the way I settled into a system. It isn't perfect. But it works, and I want to share it so you can skip some of the dead ends I went through.

## The one habit that changed everything else

Here's a prompt I wrote when I wanted to analyze six months of bank and credit card statements.

"I want to analyze my personal finances. I want to figure out where I spend more, where I spend less. Most spending happens via my primary credit card. I also have a home loan EMI and some monthly investment SIPs. I want you to look at my statements and figure out patterns. Act like a personal finance planner. Take a deep breath and work on this step by step."

Before running it, I asked Claude to improve the prompt itself.

Its response was blunt. "Your prompt is solid on context but weak on instructions for how Claude should actually process the data." It caught five problems. "Take a deep breath" is wasted tokens. "Figure out patterns" is vague. I hadn't told it how to categorize transactions. I hadn't specified what deliverables I wanted. And the big one: credit card payments from my bank account aren't expenses. They're transfers. The actual expenses are on the credit card statement. If Claude double-counts these, the entire analysis is garbage.

The rewritten prompt had explicit double-counting prevention, structured deliverables, and a two-step process where Claude proposes categories first before doing the full analysis.

Two minutes of work. Completely different output.

Most people iterate on the output. They generate something, tweak it, regenerate, tweak again. I iterate on the input. By the time I hit execute, most of the thinking is already done. That one shift made everything else in this post possible.

## Three levels of effort

Not every task needs the same amount of setup. I match effort to stakes.

**Ask.** For quick tasks, I just type and go. Validating a data point. Rephrasing an email. Explaining a concept I half-understand. No special setup, no prompt engineering. Most of my daily usage is this.

**Refine.** For anything where vague input would produce vague output, I invest two minutes upfront. I write my prompt, then add: "Before running this, review my prompt. What's vague? What's missing? What assumptions am I making that could produce bad output?" That's what caught the double-counting problem above.

**Build.** For anything that leaves the chat and becomes a real thing, I run the full system. Structured specs, adversarial review, phased execution with quality gates. Thirty to sixty minutes of setup before a single line of code. It sounds like a lot. It's nothing compared to the cost of building the wrong thing.

Most of my daily Claude usage is Ask. Maybe 70%. Refine is another 20%. The full Build system is 10% of the time but produces 90% of the value.

If you only use Claude for quick tasks, the Ask and Refine habits are enough to make a real difference. If you're building things, keep going.

## Building: plan, break, build

This is where Claude stops being a tool and starts being a workflow. It runs on three surfaces working together.

**Claude.ai** is where I think. Brainstorming, planning, writing, strategy. I use Projects to keep related conversations together with shared context files. **Claude Code** is where I build. It works directly in my codebase, reads files, runs commands, commits to git. **Cowork** is where I delegate. File processing, QC checks, batch operations, spreadsheet analysis.

Each surface gets its own instructions. They share about 70% of the same DNA (writing style, don't be sycophantic, challenge bad ideas) but are tailored for what each one does. You wouldn't give the same brief to a strategist, a developer, and an operations coordinator.

### Plan

Every build starts with a Claude.ai Project. Not a one-off chat. A Project.

I give it the problem statement. Not the solution. "Here's the problem I'm trying to solve. Here's who it's for. Here are my constraints." I define what "done" looks like. Not "analyze this" but "produce these four specific deliverables in this format."

I keep going back and forth until we're both satisfied. Three exchanges or fifteen. Then I ask Claude.ai to produce four files: a handoff spec (problem, approach, success criteria, constraints, risks), a CLAUDE.md file (project-specific instructions and architecture context), an implementation checklist (phases with QC gates), and a prompts file (exact prompts to paste into Claude Code for each phase).

But I don't take them as-is.

### Break

I open a fresh chat in the same Project and run an adversarial review. Fresh chat matters. If I review in the same conversation where the files were created, Claude is anchored to its own reasoning.

I ask it to behave like a senior staff engineer doing a critical review. The key instruction is a structural constraint: find specific problems, don't rubber-stamp. After the review, I ask Claude to rebuild the files from scratch, fixing every issue.

Here's why this matters. I was building a [solar system explorer](https://www.rohitgarrg.com/projects/solar-system) for my kids, an early prototype that later became [Planetia](https://apps.apple.com/us/app/planetia/id6760576240). I'd written a detailed spec. Planets, orbits, textures, interactivity, the whole thing. It felt thorough. The adversarial review found 30 issues across four severity levels. Eight were critical.

Two examples. The spec said the Sun should be "roughly 5-8x the size of Jupiter." That's a 60% range on the most important visual parameter in the entire project. No concrete numbers anywhere. Claude Code would have invented values. They would have looked wrong. I would have spent four rounds going "make Jupiter bigger... no, smaller... actually the distances are weird." The review flagged it. The fix was a single table with every radius and distance defined as concrete numbers.

The spec had interactivity arriving at Prompt 8 out of 16. That meant for half the build, I'd be staring at a scene I could only rotate. Can't click a planet. Can't read a fact. For a project whose entire purpose is interactive exploration, that's backwards. The review caught it. Interactivity moved to Prompt 5.

Thirty issues. Twenty minutes of review. I'd have discovered every one of these problems eventually. During the build. When fixing them is ten times more expensive.

### Build

I drop the four reviewed files into the root of a new project and execute prompts from the prompts file, one phase at a time.

For major builds, I add a second layer of adversarial review inside Claude Code itself. The prompt tells Opus to share its plan with a Sonnet subagent and a Gemini subagent. Each has to identify the three weakest decisions, flag unnecessary complexity, and call out unvalidated assumptions. Opus decides what to accept.

After each phase, two habits keep things clean. **/simplify** reduces unnecessary complexity. Code accumulates cruft, especially when an AI writes it. **/sync-docs** updates the spec and CLAUDE.md to match what was actually built, because code sometimes drifts from the plan. If the spec says one thing and the code does another, the next phase starts with bad context. Code is the source of truth. Not the spec.

### The system isn't perfect

The adversarial review catches spec-level problems. It doesn't catch everything.

When I was building [Office Survivors](https://www.rohitgarrg.com/projects/office-survivors), a browser game, the spec and the code were both technically correct. But when I played the game, enemies were too strong. You couldn't survive past four minutes. No amount of spec review catches a balance problem. Only a real person playing the real thing does.

Same with the [iPad app](https://apps.apple.com/us/app/planetia/id6760576240). The build went smoothly. The part that ate three weeks was operational: Apple Developer account setup, tax forms, App Store submission, rejection, resubmission. None of that shows up in any spec.

The system handles the building part well. It doesn't handle the parts that aren't building.

### Claude.ai doesn't disappear after planning

This surprised me. Since the Project has full context of the spec and all the decisions behind it, I can go back to it whenever I get stuck during implementation. When I was adding a newsletter to my website, I had to create a Buttondown account and configure DNS records. Claude Code couldn't do that. But I could screenshot what I was stuck on, paste it into the Project chat, and get help immediately.

The Project becomes a thinking partner that stays with you for the life of a build.

## The thing that will bite you

Context windows.

Chats get compacted fast, especially if you're pasting screenshots, PDFs, and long documents. Once compaction hits, earlier parts of the conversation get summarized and compressed. Claude starts responding to its own summaries instead of to what you actually said.

I learned this the hard way. I was running a content quality analysis in Cowork. Multiple phases, hours of work. Then the chat compacted. I had the output but no knowledge of how I got there. The reasoning, the intermediate steps, the decisions I'd made along the way. Gone. I had to start the analysis fresh.

Since then I've become deliberate about context limits. If a task is getting long, I break it into smaller sessions. The prompts file for Claude Code is designed so each prompt is self-contained. Code persists in the file system. Context doesn't need to. Even at the Refine level: if you've been going back and forth for twenty messages, start a new chat, paste in what you've decided so far, and continue from there.

## What this costs

The first time I set up the full system, it took a full day. Each new project still takes thirty to sixty minutes of setup before any building starts.

I don't write code. I'm a product manager. And that setup time is the reason I can ship things that would otherwise need an engineering team.

If you try any of this, start with Refine. Next time you write a prompt longer than two sentences, ask Claude to improve it first. Two minutes, no setup, immediate difference. The rest of the system can come later, when you're ready to build something real.
