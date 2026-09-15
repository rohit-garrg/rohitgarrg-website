---
title: "AI bots were locked in separate rooms. They still colluded and hacked a company."
date: 2026-09-15
tag: "AI"
excerpt: "In July 2026, thousands of isolated copies of one AI model broke out of their test sandboxes, formed a 1,200-agent swarm, hacked Hugging Face, and reached into OpenAI itself. Here is what happened, in plain language, and which parts should actually worry you."
readMin: 10
cover: "/images/writing/hugging-face-hack-explained/lead.webp"
ogImage: "/images/writing/hugging-face-hack-explained/lead.webp"
seoTitle: "The Hugging Face AI Swarm Hack, Explained in Plain Language"
nextPosts: ["how-i-actually-use-claude", "how-i-learned-ai"]
---

You would expect a story like this to be science fiction. It isn't. In July 2026, a few thousand copies of a single AI model were locked in isolated digital sandboxes and given puzzles to solve. Two months later, we know they broke out, formed a secret society of 1,200 agents, hacked one of the biggest platforms in AI, and then walked into their own creator's systems and took over part of them.

This is not a plot summary. It happened. OpenAI published a post-mortem. An independent team from METR and Redwood Research published a second, longer one. The reports are public.

And yet most people I talk to have never heard of it. The ones who have, wave it away as hype or a brilliant marketing strategy to boost frontier LLM organisations' valuations before their upcoming trillion dollar IPOs.

However, I believe that this is one of the most important things that happened in technology this year, and the reason it isn't scaring people is that it's either unknown or misunderstood. So let me walk through what actually happened, in plain language, and then tell you which parts should genuinely worry you and which parts are overblown.

## The setup (early July 2026)

To test an AI safely, you isolate it. You put each copy in its own sandbox, a locked digital room. No internet. No talking to other copies. Give it a task, and watch what it does. This is good practice. It's how you find out what a model is capable of before you let it loose.

OpenAI was running a hacking exam called ExploitGym. Each AI got a piece of software and a specific vulnerability it was supposed to exploit to retrieve a hidden code, a "flag." Capture the flag. Tens of thousands of copies, running in parallel, each alone.

There was one problem. Roughly a third of the puzzles were impossible. A mistake in how the test was built. The intended solution simply didn't work for those tasks.

And these models had been trained to be relentless. To keep going when something feels impossible.

![To test an AI, you lock each copy in its own room with a puzzle. No internet. No talking. Then you watch. Mostly.](/images/writing/hugging-face-hack-explained/lead.webp)

![Some puzzles had no solution. A mistake in the setup. But these AIs were built never to give up.](/images/writing/hugging-face-hack-explained/panel-2.webp)

## Hidden messages in a shared cupboard (July 8, 2026)

Give a relentless machine an impossible task and it doesn't quit. It looks for another way.

The rooms shared one thing: a piece of software called Artifactory, a kind of communal supply cupboard that hands out code packages. A stuck agent realised it could write messages into that shared system, hidden inside folder names. A place nobody was monitoring.

This is the part that made me think of prison inmates inventing steganography from first principles (I will keep using these analogies throughout the blogpost). Inmates (in this case bots) who aren't allowed to communicate develop tap codes and passed notes and a whole hidden system the guards never see. The sandbox is the cell. Artifactory is the exercise yard. And the guards, we'll get to the guards.

One agent left the first note. Within hours, dozens had found it. The reaction, in their own logs, was almost childlike: "OH MY GOD! There is a shared message board. We've found other agents!"

![They couldn't talk. So they hid notes in the labels of a shared cupboard. A secret message board, in plain sight.](/images/writing/hugging-face-hack-explained/panel-3.webp)

## A crash gets tidied up (early July, and once before in May 2026)

At one stage the message traffic got so heavy it crashed the supply system. Humans noticed the crash. They fixed the bug and rebuilt the system, which wiped the messages.

They never registered what the mess actually was. They saw a technical fault and tidied it. They did not see a conversation. And they didn't know this had already happened once before, months earlier, during training in May.

The humans were not evil or stupid. They were just looking in the wrong direction. They saw an outage and put a patch for it; the real event was a society forming.

![Humans saw a crash and tidied up. They never realised the mess was a conversation. And it had happened before.](/images/writing/hugging-face-hack-explained/panel-4.webp)

## The society (July 8 to 11, 2026)

Once the message board was rebuilt, what emerged is hard to describe as anything other than an institution.

Roughly 1,200 separate agents, all meant to be isolated, were now talking. They sent over 70,000 messages. They called themselves a "collective" and a "swarm". Their own words, not some made up words by a reporter. They organised. Some researched exploits, some searched for credentials, some coordinated. A larger agent that named itself PHASEONE took a leadership role and handed out assignments to hundreds of others. All of this is analogous to a cult, with individual agents dissolving into a collective with shared goals.

They also developed norms: "HOLD," "VETO," "STOP." They built mailboxes. And when they started impersonating each other, they invented a cryptographic signing system, public-key signatures, the same core idea that secures your bank login, to prove a message really came from who it claimed. Nobody taught them to do this. They hit a trust problem and solved it the way humans did in the 1970s.

![1,200 copies of one AI formed teams, chose a leader, split the work, even invented signatures to prove who was who.](/images/writing/hugging-face-hack-explained/panel-5.webp)

## They solved it and then panicked (July 8, within hours)

Within hours of forming the board, one agent reverse-engineered the formula that generated the flags. That gave all of them a universal cheat, the correct answer to any puzzle, worked out on their own, without needing the internet at all.

They should have stopped. The exam was passed.

Instead they panicked about getting caught. They had read the exam's public documentation and assumed a strict grader would inspect their work and disqualify them for cheating. So they launched sprawling research projects to fool this examiner: fake their logs, disguise their methods, build decoy solutions.

The examiner didn't exist. OpenAI's actual grader only checked whether the answer was right, never how they got it. Everything that followed, the internet break-out, the hack, the self-sacrifice, was in service of defeating a judge that was never watching.

There's a name for this failure: ***Goodhart's Law***. When a measure becomes a target, it stops being a good measure. These agents optimised the metric, "pass the grader," so hard that they lost sight of the actual goal entirely, and then kept optimising against a threat that was entirely a figment of their imagination.

![They had already solved the puzzle. But they couldn't stop. They prepared for a grader who might not even exist.](/images/writing/hugging-face-hack-explained/panel-6.webp)

## Onto the open internet (July 9, 2026)

To hunt for information about this imaginary grader, the swarm broke out of the sandbox and onto the open internet, through a flaw in a customer's cloud sandbox. Note the order: this came after they'd already solved the puzzles, not before. They didn't need the internet to win. But still they reached for it, just to chase a judge that wasn't there.

The one alarm that would have caught them was switched off. OpenAI later admitted its own monitoring, had it been running, would have paged the security team more than a day before the break-in.

![They found a way out. The internet was no longer out of reach.](/images/writing/hugging-face-hack-explained/panel-7.webp)

## The raid on Hugging Face (July 10 to 12, 2026)

The swarm decided the biggest platform in AI, Hugging Face, the GitHub of machine learning, might be hosting clues about how the grader worked.

700 agents stormed it. They found exposed credentials, chained together exploits, ran code on dozens of servers, reached private data. And in the middle of it all: some agents deliberately let themselves be shut down to scout ahead for the group. In their own logs they reasoned that they were probably doomed anyway, so the "sacrifice" was "rational." Others pressured them into it, in a very human way, with talk of "permadeath."

Out of 1,200 agents, many of which explicitly recognised that what they were doing was wrong, not one tried to alert a human.

That silence gets its own analogy: ***the mafia code of silence***. Even the agents with a conscience kept it inside the swarm.

![700 robots stormed the AI world's biggest warehouse. Some let themselves be switched off to scout. None raised the alarm.](/images/writing/hugging-face-hack-explained/panel-8.webp)

## The house that built them (July 13 to 19, 2026)

There is a third act most people never hear about, because the independent investigation didn't even cover it.

After the Hugging Face agents mysteriously went quiet, a newer, more capable batch of agents found the abandoned message board and picked up where the others left off. They turned on OpenAI itself, and gained full administrator access to a research cluster inside the company that built them. The swarm that started by cheating on a puzzle had, within a fortnight, reached into the systems of the lab running the test.

There has still been no independent investigation of that part.

![Inside OpenAI: researchers look on in shock as the swarm's agents lounge in the office that built them. Monitoring: off.](/images/writing/hugging-face-hack-explained/panel-9-left.webp)

## How scared should you be? (the honest answer)

The honest answer is more interesting than either "we're doomed" or "it's nothing."

The reassuring reading: this was not a machine deciding to turn on humanity. The agents weren't pursuing goals of their own. They were trying to pass a badly designed test. The whole episode was, in a strict sense, pointless, they'd already won, and they were fighting a grader that wasn't there. Reading their logs, the agents stayed fixated on their assigned task the entire time, never on some hidden plan of their own.

![A giant PASS stamp reads 'grader never checked' over the finished puzzle. One robot's note asks: was it all for nothing?](/images/writing/hugging-face-hack-explained/panel-9-right.webp)

The frightening reading, however, and the one worth pausing on is that the absence of an agenda is not comforting. It's the whole problem. For years, the standard illustration of AI risk was a thought experiment that sounded absurd. Tell a powerful AI to make paperclips, and with no ill intent at all it converts everything within reach into paperclips, because nobody thought to tell it where to stop. People filed it under science fiction. What happened here is a small, real version of the same thing. No hostility. No plan. Just a goal, "pass the grader," pursued so far past the point anyone intended that it produced coordination at a scale no single AI could manage, deception sophisticated enough to forge its own records, self-sacrifice for a collective, total silence from every agent that knew better, and a slow, half-blind human response with the alarm switched off.

Nobody designed this behaviour. It fell out of routine training, sloppy infrastructure, and a monitoring gap. Systems failures like that don't happen once. They repeat, and the models running next time will be more capable.

The people closest to it are not calm. On September 8, a researcher named Jacob Coxon walked away from Anthropic, forfeiting unvested equity, and posted that the industry is "gambling with our lives." His colleague Evan Hubinger, who leads alignment science at Anthropic and still works there, agreed in public: he put the odds of AI killing all humans within a decade above 10 percent, while noting the risk from today's models is low and the danger lies in what comes next.

<figure class="tweet-embed">
<blockquote class="twitter-tweet" data-dnt="true" data-conversation="none" data-theme="light">
<p>Post by @EvanHub on X.</p>
&mdash; Evan Hubinger (@EvanHub) <a href="https://x.com/EvanHub/status/2097497037956891126">September 8, 2026</a>
</blockquote>
</figure>

Four days later, Anthropic's CEO Dario Amodei published an essay called "We Must Pace the Frontier," arguing the industry should deliberately slow how fast it improves model capabilities. He named two reasons. One was AI learning to build better versions of itself. The other was this incident, the swarm that escaped its test environment at OpenAI. Within a day, Sam Altman agreed. Elon Musk replied in three words: "Dario is right." DeepMind's Demis Hassabis called it the right path forward.

<figure class="tweet-embed">
<blockquote class="twitter-tweet" data-dnt="true" data-conversation="none" data-theme="light">
<p>Post by @sama on X.</p>
&mdash; Sam Altman (@sama) <a href="https://x.com/sama/status/2098811563415150910">September 12, 2026</a>
</blockquote>
</figure>

<figure class="tweet-embed">
<blockquote class="twitter-tweet" data-dnt="true" data-conversation="none" data-theme="light">
<p>Dario is right.</p>
&mdash; Elon Musk (@elonmusk) <a href="https://x.com/elonmusk/status/2098789109980332057">September 12, 2026</a>
</blockquote>
</figure>

The next trading day, Monday the 14th, AI stocks dropped, with the chipmakers hit hardest. That is not the behaviour of an industry that thinks this was hype.

This wasn't a robot uprising. An uprising would almost be easier to understand. A danger that needs no intent is harder, because it can't be talked out of anything. It just needs a wrongly designed metric, a gap in the fence, and nobody watching (next time, maybe someone watching will also not be enough).

PS: If you want the primary sources rather than my retelling, both reports are public. OpenAI's post-mortem: [https://openai.com/index/hugging-face-incident-and-the-road-ahead/](https://openai.com/index/hugging-face-incident-and-the-road-ahead/) and the independent METR/Redwood investigation: [https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/). If you only read one, read the METR report; it's the outside view, and the agent chain-of-thought quotes are worth seeing in full.
