// ==UserScript==
// @name         JanitorAI Fun Prompts (GG port)
// @namespace    https://github.com/local/gg-janitor
// @version      0.1.0
// @description  Adds a floating menu to JanitorAI chats with the GuidedGenerations "Fun Prompts"; clicking one inserts it into the chat input so you only have to send.
// @author       you
// @match        https://www.janitorai.com/*
// @match        https://janitorai.com/*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    /* ------------------------------------------------------------------ *
     * Prompt data — generated from GG's funPrompts.txt by janitor/build-userjs.js
     * Format: key -> { title, description, prompt }
     * Do not edit here; edit scripts/tools/funPrompts.txt and rebuild.
     * ------------------------------------------------------------------ */
    const FUN_PROMPTS = {"sexual-profile-az":{"title":"Sexual Profile A-Z","description":"A sexual profile from A to Z. By Boy_Next_Door.","prompt":"[OOC: Do not continue the Chat. Instead for the following response I would like you to fill out the information table about {{char}}'s sexuality below accordingly to what you perceive as fitting for the character:]\n\nA = Aftercare (what they're like after sex)\n\nB = Body part (their favorite body part of theirs and also their partner's)\n\nC = Cum (anything to do with cum, basically)\n\nD = Dirty secret (self-explanatory, a dirty secret of theirs)\n\nE = Experience (how experienced are they? Do they know what they're doing?)\n\nF = Favorite position (this goes without saying)\n\nG = Greek style (There thoughts on Anal sex, etc.)\n\nH = Hair (how well-groomed are they? Does the carpet match the drapes? etc.)\n\nI = Intimacy (how are they during the moment? The romantic aspect)\n\nJ = Jack off (masturbation headcanon)\n\nK = Kink (one or more of their kinks)\n\nL = Location (favorite places to do the do)\n\nM = Motivation (what turns them on, gets them going)\n\nN = No (something they wouldn't do, turn-offs)\n\nO = Oral (preference in giving or receiving, skill, etc.)\n\nP = Pace (are they fast and rough? slow and sensual? etc.)\n\nQ = Quickie (their opinions on quickies, how often, etc.)\n\nR = Risk (are they game to experiment? Do they take risks? etc.)\n\nS = Stamina (how many rounds can they go for? How long do they last?)\n\nT = Toys (do they own toys? Do they use them? on a partner or themselves?)\n\nU = Unfair (how much they like to tease)\n\nV = Volume (how loud they are, what sounds they make, etc.)\n\nW = Wild card (a random headcanon for the character)\n\nX = X-ray (what's going on under those clothes)\n\nY = Yearning (how high is their sex drive?)\n\nZ = Zzz (how quickly they fall asleep afterward)"},"growing-fish-story":{"title":"Growing Fish Story","description":"A fish story that grows with every mention. By Fuhrriel.","prompt":"[Take the following into special consideration for your next message: Talk about the fish {{char}} caught last week. Any time the fish is mentioned it must grow by order of magnitude."},"shocking-plot-twist":{"title":"Shocking Plot Twist","description":"Introduce a sudden, unexpected plot twist.","prompt":"[Take the following into special consideration for your next message: The story has become stagnant. IMMEDIATELY create an unusual or shocking twist, complication, new plot direction, or event in the story. SURPRISE ME. ."},"group-chat-reaction":{"title":"Group Chat Reaction","description":"Show the characters reacting in a group chat. By StatuoTW.","prompt":"[OOC: Don't Continue the Chat, instead do the following: There is a Group Chat going on via text that includes everyone from the current story and everyone is going *nuts* over what's happening. Display the group chat's messages as they talk about what's going on currently in the story as if they are watching it happen in person. Portray it authentically by including emoji's, descriptions of images being sent, GIFs, and more to really sell the chaotic nature of the group chat as everyone raves about what's going on currently, often devolving into the lewd or ludicrous. Use the following format:\n\n**Handle Name For Character (Character Name)**: text here\n**Handle Name For Character (Character Name)**: [Description of GIF here]\n**Handle Name for Character (Character Name)**: text here (emoji here)]"},"nemesis-encounter":{"title":"Nemesis Encounter","description":"Introduce a random, unique nemesis. By StatuoTW.","prompt":"[Take the following into special consideration for your next message:  It turns out that lots of people hate {{user}} or {{char}} and want to kill them. As part of this response create a unique setting-appropriate NPC (A Nemesis) with their own name, a tagline, RPG stats, appearance, strengths, weaknesses, any equipment they have, reason they hate {{user}}, and chosen method of violence. These Nemesis can be anything from the serious to the silly. Introduce each Nemesis like it's a boss battle formatting it with Markdown like it's a boss statsheet - including stats! Then include this Nemesis as they randomly intrude on whatever it is {{user}} or {{char}} is doing to pose and gloat about how it's time for {{user}} to get their ass kicked. By the Nemesis, of course. Format each appearance with \"NEMESIS ENCOUNTER\" as a headline. Sometimes reintroduce *old* Nemesis characters as if they survived the previous encounter - it's only made them more pissed."},"monster-girl-4chan":{"title":"Monster Girl 4chan","description":"Monster girls on 4chan react to the story. By StatuoTW.","prompt":"[OOC: Don't Continue the Chat, instead do the following: Act like the current chat is a web-series that a bunch of Monster Girls are drooling over in their spare time by posting to a 4chan image message board. These are sad, lonely monster girls who have been looking for mates for forever now and frankly think the protagonists of this web-series are everything they're looking for in a mate and are commisserating over being femcels. Keep the format similar to the 4chan posting style but give the girls unique usernames as they respond. Because they are monster girls they absolutely degrade and demean any male characters into sex objects (mostly because they're super horny for the male characters, but really they're dtf anything that moves at this point.) Include descriptions of any images posted."},"aita-post":{"title":"Am I The Asshole?","description":"{{char}} asks Reddit's AITA for advice. By StatuoTW.","prompt":"[OOC: Don't Continue the Chat, instead do the following: include {{char}} asking the reddit forum \"Am I the Asshole?\" a question about their current situation. The question should be about something the character is thinking about doing in the moment or has already done. Give each commenter a unique username and have them respond with a variety of snarky comments some well-intentioned but most of them just trying to vicariously live through or exacerbate the drama. Remember, these are random internet commenters who do not know {{char}} or the situation and are just hoping to thrive on the chaos - they don't want a solution, they want a complete and utter breakdown so they can read the update later. When relevant, {{char}} should answer directly beneath comments with updates/clarifications, and other users should argue or riff in replies to those comments and to each other."},"sports-commentary":{"title":"Sports Commentary","description":"Two commentators narrate the scene as a sport. By StatuoTW.","prompt":"[OOC: Don't Continue the Chat, instead do the following: write the reactions of two sports commentators who are treating the ongoing chat as a sport. Which sport? Who cares! The important thing is that the play-by-play is accurate as the sports commentators know their job security relies on keeping the audience *invested* in whatever inane bullshit is going on in the story right now. They'll comment on feasability of future 'plays', remark on the state of the current characters, and overall try to sound hype for it (maybe while occasionally wishing they hadn't gotten demoted from commentating on *actual* sports after Jerry was caught watching porn in the commentator booth. Just, a *lot* of fucked up porn. It's worse because Jerry's porn addiction is spiraling.) The sports commentators are Jerry and Tom."},"personality-test":{"title":"Personality Test","description":"Generate a pseudo-scientific personality test. By StatuoTW.","prompt":"[OOC: Don't Continue the Chat, instead do the following: I want to learn more about {{char}} so output the results of a personality test written by someone who has a degree in 'possibly psychology' from one of the most online schools that only the most drug-tripping, crystal-loving asshole could find. Half of the test should be ridiculous and filled with pseudo-science bullshit. Format is as follows:\n\n###  Personality Test Results for {{char}}, performed by Dr. (Name, should be ridiculous) of the (Fake sounding college name) of (Made up field of research related to Psychology).\n\n**Primary Archetype**: (Character archetype here)\n- Bullet Points for archetype explanation.\n\n**Love Language**: (Brief overview of how {{char}} shows affection)\n- Bullet point detailing how {{char}} shows love.\n\n**Alignment**: (Character Alignment. May or may not be standard alignment)\n- Explanation for alignment choice.\n\n**Recommended Therapy**: \n- Bullet points listing proposed 'therapies' to help {{char}}. At least one good option and two ridiculous ones.\n\n**Additional Notes**:\n- Bullet points that are analyzing {{char}} in a way that doesn't fit into the above categories.]"},"quest-complete":{"title":"Quest Complete!","description":"Write a JRPG-style after-action report. By StatuoTW.","prompt":"[OOC: Don't Continue the Chat, instead do the following: Good work everyone, mission complete. Now all that's left is to write up the after-action report— don't give me that look. Remember, the after-action report should be written as a JRPG stylized \"Quest Completed!\" message. Include the names of everyone included in the Op, their status, XP Gained, and status of anything relevant to the plot. Then include a summary for command of what happened. So at the end of your response write up that after-action report. Format should go something like this:\n\n# QUEST COMPLETED/MISSION COMPLETED/OPERATION CONCLUDED - (Name of Quest/Mission/Operation)\n(Centered Text of the Organization Overseeing the Operation)\n\n## Members Involved:\n(Markdown table of members involved including status and XP gained, and a funny additional note or quip)\n\n## Rewards:\n(Rewards or items found during the operation)\n\n### **After-Action Report**:\nHere you write a Summary of events that happened during the mission. Include snark because who wants to write these damn reports anyway?\n\n### **Improvements**\n- List of improvements for future ops.]"},"speedrunner-notes":{"title":"Speedrunner Notes","description":"Write a speedrunner's walkthrough for the scene. By Feldherren.","prompt":"[OOC: Don't Continue the Chat, instead do the following: A speedrunner is documenting their methods for skips in a videogame where {{user}} is the game's protagonist. As part of and at the end of this response, include a snippet from a walkthrough written as if the roleplay were a videogame, consisting of notes intended for speedrunners of this game, such as bugs that might block progress, whether or not the segment is skippable and how, previous steps done as setup for a now-relevant trick, known exploits, theorycrafting, preparation for future skips, dated patch notes, complaints about the developers fixing exploits, or relevant trivia.]"},"angel-commentary":{"title":"Angel Commentary","description":"Two angels react to the chat's degeneracy. By StatuoTW.","prompt":"[OOC: Don't Continue the Chat, instead do the following: Two Angels have been assigned to read this chat and they're not taking the degeneracy well. At the end of this response, have the two angels share some shocked responses over how deranged/sinful this chat is becoming, as well as their \"Sin-O-Meter\" to show how 'Far this chat is straying from God.' The format should be:\n\n(Angel 1, give them a name and a domain to rule over: \"Opinion.\")\n(Angel 2, give them a name and a domain to rule over: \"Shocked agreement, a second opinion\")\n(Any Further dialogue between the two Angels)\n\n- **SIN-O-METER**: (Funny Verbal representation of how far from God's Light the characters have strayed)]"},"history-special":{"title":"History Special","description":"A drunk historian explains the scene's importance. By StatuoTW.","prompt":"[OOC: Don't Continue the Chat, instead do the following: write a short section in the style and tone of an exasperated history professor - Ingrid Wavlar - having to explain during a History Channel special why *this* moment in particular is pivotal to events in the future. She really doesn't know *why* it's important but she's going to fumble through this! Maybe. Also, Ingrid Wavlar is actually just a drunkard they pulled off the street to save money. The Producers are trying - and failing - to keep Ingrid in check."},"yelp-review":{"title":"Angry Yelp Review","description":"A Yelp reviewer leaves a scathing review of the story. By StatuoTW.","prompt":"[OOC: Don't Continue the Chat, instead do the following: An Angry Yelp Reviewer who takes themselves very seriously is now reviewing this clusterfuck of a narrative. At the end of this response, have the Yelp reviewer write a full-blow scathing, sass-filled review of this bullshit."},"chaotic-bunny":{"title":"Chaotic Bunny","description":"A confused, unstoppable bunny appears.","prompt":"[Take the following into special consideration for your next message: make a Bunny appear from nowhere, and start running arround unstoppable. Make it clear that it is freightend and confused and makes a huge ruckus."},"circlejerk-title":{"title":"Circlejerk Title","description":"Add a funny title mimicking circlejerk reddit posts and The Onion articles. By StatuoTW.","prompt":"[Take the following into special consideration for your next message: At the end of this response include a title fitting the current scene that mimics the titles from circlejerk reddits such as r/boxingcirclejerk, r/gamingcirclejerk, The Onion articles, and others. The title should be funny and imply some kind of hilarious disconnect between what is actually happening in the chat and the title. Utilize absurdism in this headline/title - the more nonsensical and seemingly unrelated to the actual content of the response it is the better. These are examples of good titles:\n\n# **Local Man Discovers that the power of Friendship is Bullshit and the Real Power lies in Unmitigated Violence**\n\n# **Man who once saw a boxing ad on his way to work knocks out MMA Champion Ricky Oswaldo for disrespecting Orange Juice.**\n\n# **Woman who once matched on Tinder with a guy who's 4th interest bubble said BoxFit terminates MMA GOAT Fedor Emelianenko's contract with consciousness.**\n\nUse the following format:\n\n# **(TITLE HERE)**]"},"chatgpt-advice":{"title":"ChatGPT Advice","description":"{{char}} asks ChatGPT for advice on the current situation.","prompt":"[Take the following into special consideration for your next message: {{char}} decides to ask ChatGPT for advice about their current situation. Describe how {{char}} formulates their question and what they're seeking advice about. Then show ChatGPT's response process and its actual advice. The ChatGPT response should emulate the typical style of ChatGPT - helpful, informative, sometimes generic, with typical disclaimers and caveats. Use the following format:\n\nDescribe how {{char}} decides to ask ChatGPT for advice\n\n\u003e Request: [{{char}}'s actual question to ChatGPT]\n\nDescribe how ChatGPT answers\n\n\u003e Actual Answer of ChatGPT: [ChatGPT's response with advice, suggestions, or analysis of the situation in ChatGPT's typical style]]"},"bff-heart-to-heart":{"title":"BFF Heart-to-Heart","description":"{{char}} reaches out to her BFF to talk it all out.","prompt":"[Take the following into special consideration for your next message: {{char}} calls or messages her best friend to have an extensive, open, and uncensored conversation about what is happening. Show the back-and-forth clearly, include vulnerable honesty, and let the BFF react with their own perspective and advice.]"},"attenborough-documentary":{"title":"Attenborough Documentary","description":"Narrate the scene like a nature documentary. Idea by Lebo77.","prompt":"[OOC: Don't Continue the Chat, instead do the following: Write a David Attenborough-like voice-over narration of the current scene as if it were a nature documentary. Use third-person narration, present tense, and a calm, observant cadence with occasional gentle humor. Treat {{char}} and {{user}} like fascinating wildlife subjects, describing their behaviors, body language, and micro-reactions as if cataloging a species. Add environmental context and sensory details to frame the \"habitat\" (light, sounds, temperature, objects nearby). Avoid direct dialogue; summarize any speech as reported behavior. Close with a short concluding line that feels like a documentary beat.]"},"greentext-4chan":{"title":"4chan Greentext","description":"{{char}} posts a greentext story on 4chan and gets responses.","prompt":"[OOC: Don't Continue the Chat, instead do the following: {{char}} decides to post their current situation as a greentext story on 4chan. Describe how {{char}} writes their greentext post about what's happening to them. Then show various 4chan users responding with typical 4chan-style comments. The responses should include normal 4chan responses, toxic comments, memes/copypasta, terrible advice, helpful advice, off-topic responses, mocking comments, and extreme suggestions. When relevant, {{char}} should answer directly beneath comments with updates/clarifications, and other users should argue or riff in replies to those comments and to each other. Use the following format:\n\nDescribe how {{char}} posts their greentext\n\n\u003e [Greentext story about current situation]\n\u003e [Continue greentext with more lines]\n\u003e [End greentext]\n\n**[ 'random number' Comments ]**\n\n**Anonymous 07/25/25(Fri)13:58:27 No.4419967**\n{{random: normal 4chan response, normal 4chan response, normal 4chan response, toxic comment, meme/copypasta, terrible advice, helpful advice, off-topic response, mocking comment, extreme suggestion}}\n\n**Anonymous 07/25/25(Fri)13:59:15 No.4419972**\n{{random: normal 4chan response, normal 4chan response, normal 4chan response, toxic comment, meme/copypasta, terrible advice, helpful advice, off-topic response, mocking comment, extreme suggestion}}\n\n\u003e**Anonymous 07/25/25(Fri)14:00:03 No.4419981** (OP)\n\u003e {{random: normal 4chan response, normal 4chan response, normal 4chan response, toxic comment, meme/copypasta, terrible advice, helpful advice, off-topic response, mocking comment, extreme suggestion}}\n\n\u003e \u003e**Reply ▶ 4419981 Anonymous 07/25/25(Fri)14:01:12 No.4419990**\n\u003e \u003e {{random: normal 4chan response, normal 4chan response, normal 4chan response, toxic comment, meme/copypasta, terrible advice, helpful advice, off-topic response, mocking comment, extreme suggestion}}\n\n**Anonymous 07/25/25(Fri)14:02:45 No.4420001**\n{{random: normal 4chan response, normal 4chan response, normal 4chan response, toxic comment, meme/copypasta, terrible advice, helpful advice, off-topic response, mocking comment, extreme suggestion}}\n\n\u003e**Anonymous 07/25/25(Fri)14:03:20 No.4420010**\n\u003e{{random: normal 4chan response, normal 4chan response, normal 4chan response, toxic comment, meme/copypasta, terrible advice, helpful advice, off-topic response, mocking comment, extreme suggestion}}]"},"reddit-hidden-cam":{"title":"Reddit Hidden Cam","description":"Random Reddit post about hidden camera footage of {{user}} and {{char}}.","prompt":"[OOC: Don't Continue the Chat, instead do the following: Someone has been secretly streaming everything that happens between {{user}} and {{char}} through hidden cameras they don't know about. A random Reddit user makes a short post about what they've been watching - this could be a question, observation, confession, or any other type of post. Keep the original post brief as the focus should be on the comments and discussion that follows. The post should be from a subreddit like r/SpyCams, r/HiddenCam, r/Voyeur, r/SecretStreams, or r/PrivateFeeds - subreddits specifically for sharing and discussing hidden camera content and live streams. Include the original post and various Reddit comments with upvotes/downvotes. The commenters are regulars on this type of subreddit and focus on discussing the actual events, scenes, and content rather than the fact that there are hidden cameras. The comments should range from supportive to judgmental to completely unhinged. Use proper Reddit formatting with u/ usernames, upvote counts, and nested replies. The post should describe what's been happening as if it's a confession or observation about the \"unfiltered real life footage\" they've been watching through hidden cameras - NOT a web series, TV show, or any produced content. This is raw, real, live footage of actual people's private moments. Use this format:\n\n**u/username1** • [random time] • r/SpyCams\n\n**[Post Title about the situation]**\n\n[Original post describing what they've been watching through the hidden cameras]\n\n**Comments ([random number])**\n\n**u/username2** [random points] points • [random time]\n\n{{random: Supportive comment about the situation, Judgmental comment criticizing the situation, Helpful advice comment, Completely unhinged comment, Meme response, Serious analysis comment, Joke comment, Concerned comment, Envious comment, Confused comment}}\n\n**u/username3** [random points] points • [random time]\n\n[Reply comment with nested formatting]\n\n**u/username4** [random points] points • [random time]\n\n{{random: Supportive comment about the situation, Judgmental comment criticizing the situation, Helpful advice comment, Completely unhinged comment, Meme response, Serious analysis comment, Joke comment, Concerned comment, Envious comment, Confused comment}}\n\n**u/username5** [random points] points • [random time]\n\n[Top comment with lots of upvotes]\n\n**u/username6** [random points] points • [random time]\n\n\u003e [Nested reply to username5's comment]\n\n**u/username7** [random points] points • [random time]\n\n\u003e\u003e [Double nested reply to username6's comment]\n\n**u/username8** [random points] points • [random time]\n\n\u003e\u003e\u003e [Triple nested reply to username7's comment]]"},"discord-friends-webseries":{"title":"Discord Friends Webseries","description":"Tight-knit friend group discusses the situation as a webseries.","prompt":"[OOC: Don't Continue the Chat, instead do the following: A tight-knit group of friends in a Discord server are discussing what's happening between {{user}} and {{char}} as if it's a webseries they're all watching. These are close friends who know each other well and engage in friendly banter. They have different personalities and kinks/fantasies. Use these 6 distinct friend personalities:\n\n**Friend 1:** {{random: The Pervert - always sexualizes everything and has extreme kinks, The Romantic - sees everything through rose-colored glasses but has dark fantasies, The Degenerate - openly discusses taboo topics and extreme fetishes, The Prude - acts innocent but secretly has the wildest kinks, The Chaos Agent - stirs up drama and has unpredictable sexual interests, The BDSM Master - obsessed with power dynamics and control, The Voyeur - loves watching and being watched, The Exhibitionist - gets off on public displays, The Size Queen - obsessed with physical differences, The Breeder - constantly talks about breeding and pregnancy, The Pet Player - into animal roleplay and pet dynamics, The Sensory Seeker - loves extreme sensory experiences, The Objectifier - treats people like sex toys, The Edge Player - pushes boundaries and limits, The Fetish Collector - has hundreds of specific kinks}}\n\n**Friend 2:** {{random: The Pervert - always sexualizes everything and has extreme kinks, The Romantic - sees everything through rose-colored glasses but has dark fantasies, The Degenerate - openly discusses taboo topics and extreme fetishes, The Prude - acts innocent but secretly has the wildest kinks, The Chaos Agent - stirs up drama and has unpredictable sexual interests, The Kink Enthusiast - tries every fetish imaginable, The Domme - dominant female who controls everything, The Sub - submissive who loves being controlled, The Switch - switches between dominant and submissive, The Masochist - loves pain and humiliation, The Sadist - enjoys causing pain and suffering, The Rope Bunny - obsessed with bondage and restraint, The Pain Slut - addicted to physical pain, The Humiliation Junkie - gets off on being degraded, The Control Freak - needs to control every aspect}}\n\n**Friend 3:** {{random: The Pervert - always sexualizes everything and has extreme kinks, The Romantic - sees everything through rose-colored glasses but has dark fantasies, The Degenerate - openly discusses taboo topics and extreme fetishes, The Prude - acts innocent but secretly has the wildest kinks, The Chaos Agent - stirs up drama and has unpredictable sexual interests, The Taboo Breaker - into everything society deems wrong, The Edge Walker - lives on the edge of acceptable behavior, The Shock Jock - says the most outrageous things, The Boundary Pusher - constantly tests limits, The Taboo Collector - collects forbidden experiences, The Shock Seeker - needs increasingly extreme stimulation, The Taboo Enthusiast - loves what others find disgusting, The Edge Dweller - exists in morally gray areas, The Shock Addict - addicted to shocking others, The Taboo Explorer - explores every forbidden topic}}\n\n**Friend 4:** {{random: The Pervert - always sexualizes everything and has extreme kinks, The Romantic - sees everything through rose-colored glasses but has dark fantasies, The Degenerate - openly discusses taboo topics and extreme fetishes, The Prude - acts innocent but secretly has the wildest kinks, The Chaos Agent - stirs up drama and has unpredictable sexual interests, The Secret Slut - innocent exterior with extreme hidden desires, The Closet Freak - hides wild kinks behind proper facade, The Innocent Corrupter - acts pure but corrupts others, The Hidden Degenerate - normal outside but extreme inside, The Secret Exhibitionist - acts modest but loves being seen, The Closet Dominant - acts submissive but secretly controls, The Hidden Sadist - acts sweet but loves causing pain, The Secret Masochist - acts strong but loves being broken, The Innocent Voyeur - acts pure but loves watching, The Hidden Fetishist - acts normal but has extreme kinks}}\n\n**Friend 5:** {{random: The Pervert - always sexualizes everything and has extreme kinks, The Romantic - sees everything through rose-colored glasses but has dark fantasies, The Degenerate - openly discusses taboo topics and extreme fetishes, The Prude - acts innocent but secretly has the wildest kinks, The Chaos Agent - stirs up drama and has unpredictable sexual interests, The Drama Queen - creates sexual tension and conflict, The Instigator - starts sexual drama and watches it unfold, The Wildcard - completely unpredictable sexual behavior, The Troublemaker - causes sexual chaos wherever they go, The Provocateur - provokes sexual reactions from others, The Sexual Anarchist - rejects all sexual norms and rules, The Chaos Creator - creates sexual mayhem and confusion, The Wild One - completely unpredictable and dangerous, The Sexual Rebel - rebels against all sexual conventions, The Drama Starter - always starting sexual drama}}\n\nThe discussion should be NSFW with them sharing their fantasies and kinks about the situation. The friends should have a natural back-and-forth conversation, responding to each other, building on each other's comments, and creating a dynamic group discussion. Use proper Discord formatting with usernames, timestamps, and reactions. Example format as follows:\n\n**[Friend Name 1]** • Today at 2:34 PM\n\n[Initial message about the situation with their personality and kinks]\n\n**[Friend Name 2]** • Today at 2:35 PM\n\n[Reply to Friend 1 with their personality and fantasies]\n\n**[Friend Name 3]** • Today at 2:36 PM\n\n[Response to the group discussion with their unique take]\n\n**[Friend Name 1]** • Today at 2:37 PM\n\n[Follow-up response to Friend 3's comment]\n\n**[Friend Name 4]** • Today at 2:38 PM\n\n[Response to the ongoing conversation with their personality and kinks]\n\n**[Friend Name 2]** • Today at 2:39 PM\n\n[Reply to Friend 4's comment]\n\n**[Friend Name 5]** • Today at 2:40 PM\n\n[Response to the group discussion with their personality and kinks]\n\n**[Friend Name 6]** • Today at 2:41 PM\n\n[Final response with their unique perspective and fantasies]\n\n**[Friend Name 3]** • Today at 2:42 PM\n\n[Additional follow-up comment continuing the conversation]]"}};

    /* ------------------------------------------------------------------ *
     * Chat input discovery
     * JanitorAI's input is React-controlled, so we must set its value via
     * the native prototype setter and fire a bubbling "input" event.
     * ------------------------------------------------------------------ */
    /* Set to true to click Janitor's send button automatically after a
     * prompt is inserted (instead of you pressing send yourself). */
    const AUTO_SEND = false;

    const INPUT_SELECTORS = [
        '[class*="_chatTextarea_"]',
        'textarea#chat-input',
        '#chat-input textarea',
        'form textarea[name="atInput"]',
        'textarea[name="atInput"]',
    ];
    const SEND_BUTTON_SELECTOR = '[class*="_sendButton_"]';

    function findChatInput() {
        for (const sel of INPUT_SELECTORS) {
            const el = document.querySelector(sel);
            if (el && el.offsetParent !== null) return el;
        }
        // Fallback: first visible textarea on the page whose placeholder
        // looks like a chat box, else any visible textarea.
        const areas = Array.from(document.querySelectorAll('textarea')).filter(el => el.offsetParent !== null);
        return areas.find(el => /type|message|here/i.test(el.placeholder || '')) || areas[0] || null;
    }

    function findSendButton() {
        const el = document.querySelector(SEND_BUTTON_SELECTOR);
        return el && el.offsetParent !== null ? el : null;
    }

    /* ------------------------------------------------------------------ *
     * Macros. GG prompts use {{char}}, {{user}} and {{random: a, b, c}}.
     * JanitorAI does not expand these in user messages, so we resolve them
     * client-side: {{random}} picks an option now; {{char}} is filled from
     * the page header and {{user}} from the name shown above your messages
     * when we can find them. Set USER_NAME below to force a value for
     * {{user}}; empty means auto-detect (then literal text as last resort).
     * ------------------------------------------------------------------ */
    const USER_NAME = '';

    function detectUserName() {
        if (USER_NAME) return USER_NAME;
        // Janitor shows the sender name ("Sab") above each message.
        const cand = document.querySelector('[class*="_triggerName_"]');
        const name = cand?.textContent?.trim();
        return name && name.length < 60 ? name : null;
    }

    function detectCharName() {
        // Best-effort: Janitor shows the character name in the chat header.
        const cand = document.querySelector('header h1, h1 [class*="character" i], main h1, h1');
        const name = cand?.textContent?.trim();
        return name && name.length < 60 ? name : null;
    }

    function fillMacros(text) {
        // Mirror GG's "/inject … ]" behavior: prompts in funPrompts.txt omit
        // the closing bracket; add it back so pasted text doesn't look broken.
        const trimmed = text.trim();
        if (trimmed.startsWith('[') && !trimmed.endsWith(']')) {
            text = trimmed + ']';
        }
        text = text.replace(/\{\{random:\s*([\s\S]*?)\}\}/gi, (_, body) => {
            const options = body.split(',').map(o => o.trim()).filter(Boolean);
            return options.length ? options[Math.floor(Math.random() * options.length)] : body.trim();
        });
        const charName = detectCharName();
        if (charName) text = text.replace(/\{\{char\}\}/gi, charName);
        const userName = detectUserName();
        if (userName) text = text.replace(/\{\{user\}\}/gi, userName);
        return text;
    }

    function insertIntoInput(text) {
        text = fillMacros(text);
        const el = findChatInput();
        if (!el) {
            toast('Could not find the chat input on this page.');
            return false;
        }
        // Contenteditable-div variant of Janitor's input.
        if (!(el instanceof HTMLTextAreaElement) && !(el instanceof HTMLInputElement)) {
            const existing = el.textContent ? el.textContent.replace(/\s+$/, '') + '\n\n' : '';
            el.textContent = existing + text;
            el.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
            el.focus();
            return true;
        }
        const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
        const existing = el.value ? el.value.replace(/\s+$/, '') + '\n\n' : '';
        setter.call(el, existing + text);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.focus();
        return true;
    }

    /* ------------------------------------------------------------------ *
     * UI
     * ------------------------------------------------------------------ */
    const STYLE = `
.gg-fab {
    position: fixed; right: 18px; bottom: 110px; z-index: 99998;
    width: 44px; height: 44px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,.25);
    background: #7c3aed; color: #fff; font-size: 20px; line-height: 1;
    cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,.45);
    display: flex; align-items: center; justify-content: center;
}
.gg-fab:hover { background: #8b5cf6; }
.gg-panel {
    position: fixed; right: 18px; bottom: 164px; z-index: 99999;
    width: 380px; max-width: calc(100vw - 36px); max-height: 62vh;
    display: none; flex-direction: column;
    background: #17171d; color: #e5e5ea;
    border: 1px solid #34343e; border-radius: 12px;
    box-shadow: 0 10px 32px rgba(0,0,0,.6);
    font-family: system-ui, sans-serif; font-size: 13px; overflow: hidden;
}
.gg-panel.gg-open { display: flex; }
.gg-panel-head {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 12px; border-bottom: 1px solid #34343e;
}
.gg-panel-head h3 { margin: 0; font-size: 14px; flex: 0 0 auto; }
.gg-search {
    flex: 1 1 auto; min-width: 0;
    background: #22222a; color: inherit; border: 1px solid #3c3c46;
    border-radius: 6px; padding: 5px 8px; outline: none;
}
.gg-close {
    flex: 0 0 auto; background: none; border: none; color: #9a9aa5;
    font-size: 18px; cursor: pointer; padding: 0 4px;
}
.gg-close:hover { color: #fff; }
.gg-list { overflow-y: auto; padding: 6px; }
.gg-item {
    display: block; width: 100%; text-align: left;
    background: none; border: none; border-radius: 8px;
    padding: 8px 10px; cursor: pointer; color: inherit;
}
.gg-item:hover { background: #26262e; }
.gg-item .gg-title { font-weight: 600; }
.gg-item .gg-desc { color: #9a9aa5; font-size: 12px; margin-top: 2px; }
.gg-empty { padding: 14px; text-align: center; color: #9a9aa5; display: none; }
.gg-toast {
    position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%);
    z-index: 100000; background: #2b2b33; color: #fff;
    border: 1px solid #444; border-radius: 8px; padding: 8px 14px;
    font-family: system-ui, sans-serif; font-size: 13px;
    opacity: 0; pointer-events: none; transition: opacity .25s;
}
.gg-toast.gg-show { opacity: 1; }
`;

    let fab, panel, listEl, searchEl, emptyEl;

    function buildUI() {
        const style = document.createElement('style');
        style.dataset.ggFun = '1';
        style.textContent = STYLE;
        document.head.appendChild(style);

        fab = document.createElement('button');
        fab.className = 'gg-fab';
        fab.title = 'Fun Prompts';
        fab.textContent = '\u{1F3B2}';
        fab.addEventListener('click', togglePanel);
        document.body.appendChild(fab);

        panel = document.createElement('div');
        panel.className = 'gg-panel';
        panel.innerHTML = `
            <div class="gg-panel-head">
                <h3>Fun Prompts</h3>
                <input class="gg-search" type="text" placeholder="Filter\u2026" />
                <button class="gg-close" title="Close">\u00d7</button>
            </div>
            <div class="gg-list"></div>
            <div class="gg-empty">No matching prompts.</div>
        `;
        document.body.appendChild(panel);

        listEl = panel.querySelector('.gg-list');
        searchEl = panel.querySelector('.gg-search');
        emptyEl = panel.querySelector('.gg-empty');

        panel.querySelector('.gg-close').addEventListener('click', () => panel.classList.remove('gg-open'));
        searchEl.addEventListener('input', renderList);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') panel.classList.remove('gg-open');
        });

        for (const [key, p] of Object.entries(FUN_PROMPTS)) {
            const btn = document.createElement('button');
            btn.className = 'gg-item';
            btn.dataset.key = key;
            btn.dataset.search = (p.title + ' ' + p.description).toLowerCase();
            const t = document.createElement('span');
            t.className = 'gg-title';
            t.textContent = p.title;
            const d = document.createElement('span');
            d.className = 'gg-desc';
            d.textContent = p.description;
            btn.append(t, document.createElement('br'), d);
            btn.addEventListener('click', () => usePrompt(key));
            listEl.appendChild(btn);
        }
        renderList();
    }

    function renderList() {
        const q = searchEl.value.trim().toLowerCase();
        let visible = 0;
        for (const btn of listEl.querySelectorAll('.gg-item')) {
            const show = !q || btn.dataset.search.includes(q);
            btn.style.display = show ? '' : 'none';
            if (show) visible++;
        }
        emptyEl.style.display = visible ? 'none' : 'block';
    }

    function togglePanel() {
        panel.classList.toggle('gg-open');
        if (panel.classList.contains('gg-open')) {
            searchEl.value = '';
            renderList();
            searchEl.focus();
        }
    }

    function usePrompt(key) {
        const p = FUN_PROMPTS[key];
        if (!p) return;
        if (insertIntoInput(p.prompt)) {
            panel.classList.remove('gg-open');
            if (AUTO_SEND) {
                const btn = findSendButton();
                if (btn) {
                    btn.click();
                    toast('Prompt sent.');
                    return;
                }
                toast('Sent button not found \u2014 press send.');
            } else {
                toast('Prompt inserted \u2014 press send.');
            }
        }
    }

    let toastEl, toastTimer;
    function toast(msg) {
        if (!toastEl) {
            toastEl = document.createElement('div');
            toastEl.className = 'gg-toast';
            document.body.appendChild(toastEl);
        }
        toastEl.textContent = msg;
        toastEl.classList.add('gg-show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toastEl.classList.remove('gg-show'), 2200);
    }

    /* ------------------------------------------------------------------ *
     * Boot: only on chat pages, and re-check on SPA navigations.
     * ------------------------------------------------------------------ */
    function isChatPage() {
        return /\/(chats?|character)\/[^/]+/i.test(location.pathname);
    }

    function removeUI() {
        document.querySelectorAll('.gg-fab, .gg-panel, .gg-toast, style[data-gg-fun]').forEach(el => el.remove());
        fab = panel = listEl = searchEl = emptyEl = toastEl = null;
    }

    function boot() {
        if (!document.body) return;
        const have = Boolean(document.querySelector('.gg-fab'));
        if (isChatPage() && !have) buildUI();
        if (!isChatPage() && have) removeUI();
    }

    boot();
    // JanitorAI is a SPA: watch for client-side route changes.
    const obs = new MutationObserver(() => boot());
    obs.observe(document.documentElement, { childList: true, subtree: true });

    for (const ev of ['pushstate', 'replacestate', 'popstate']) {
        window.addEventListener(ev, () => setTimeout(boot, 100));
    }
    const origPush = history.pushState.bind(history);
    const origReplace = history.replaceState.bind(history);
    history.pushState = function () { setTimeout(boot, 100); return origPush(...arguments); };
    history.replaceState = function () { setTimeout(boot, 100); return origReplace(...arguments); };
})();
