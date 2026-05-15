/**
 * Inject SEO + storytelling longform content into the seeded blog posts.
 *
 * Each post is written as HTML (clean, semantic, ready for the public page's
 * .post-body styles), then converted to Tiptap JSON via @tiptap/html's
 * generateJSON so the admin editor can re-edit it with full fidelity.
 */

import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });

import { eq } from "drizzle-orm";
import { generateJSON } from "@tiptap/html/server";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { db, schema } from "../lib/db";

const EXTENSIONS = [
  StarterKit.configure({ heading: { levels: [2, 3] } }),
  Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } }),
  Image,
];

/* ============================================================
   POST 1 — Why most pitch decks fail.
   Target keywords: pitch deck mistakes, why pitch decks fail,
   investor rejection, fundraising mistakes, pitch deck red flags.
============================================================ */
const POST_1 = /* html */ `
<p>Forty-seven investor rejections. That's how many "passes" Adriana — a fintech founder we met at a Lisbon coffee shop in early 2025 — collected before she figured out what was wrong. Her product worked. Her metrics were honest. Her market was real. The problem wasn't her business. <strong>The problem was her deck.</strong></p>

<p>By her 48th meeting, she'd rebuilt every slide from scratch. She closed her round at the next pitch.</p>

<p>If you're reading this with a deck on your screen and a knot in your stomach, you're not alone. After designing more than three thousand decks at Pitch Deck, we can tell you something investors won't: <em>most decks don't fail because the business is bad. They fail because the deck buries the business.</em></p>

<p>Here are the five mistakes we see in every "almost-funded" deck — and how to fix them in the next ninety minutes.</p>

<h2>The 90-second test</h2>

<p>A general partner at a Series A fund once told us they spend an average of <strong>3 minutes and 44 seconds</strong> on a deck before deciding whether to take a meeting. The first 90 seconds decide whether they reach the third minute.</p>

<p>That means slides 1, 2, and 3 are doing 80% of the work. Most founders spend 80% of their effort on slides 7, 8, and 9.</p>

<p>Run this test on your own deck right now: open it, set a 90-second timer, scroll through, then close the file. Could you summarize the company, the market size, and the ask out loud? If not, the deck is broken — regardless of how good your business is.</p>

<h2>Mistake 1 — Burying the lede</h2>

<p>The most common mistake is also the most invisible: founders save the punchline for slide six.</p>

<p>The investor's brain doesn't work that way. It needs a one-sentence headline by slide two — the kind a partner can repeat to a colleague three days later without notes. <em>"They're the operating system for solo accountants in emerging markets, and they grew 24% MoM for nine straight months."</em> Done. Now the partner is leaning in.</p>

<p>Compare that to the version that opens with a quote about purpose, then a personal story about the founder's grandmother, then a 14-bullet "About us" slide. By the time the punchline arrives, the reader is gone.</p>

<h3>The fix</h3>

<p>Write your headline first, on a single index card, before you open the deck file. If it doesn't fit on the card, it doesn't belong on slide one.</p>

<h2>Mistake 2 — Vague market claims</h2>

<p>"The wellness industry is worth $4.4 trillion." We've seen that exact line in four different decks for four different startups in four different sub-categories. None of those companies are touching $4.4 trillion. Investors know it. You know it. So why is it there?</p>

<p>Top-down market sizing — the kind that quotes a Statista number and divides by something — is a credibility leak. It signals that the founder hasn't done the math from the bottom up.</p>

<h3>The fix</h3>

<p>Replace TAM/SAM/SOM bullet points with a single sentence: <em>"There are X companies in our segment, each spending $Y per year, which puts our reachable market at $Z." </em> Then show the spreadsheet — even just one column. Investors don't want a number; they want a method.</p>

<h2>Mistake 3 — Solution before problem</h2>

<p>This is the killer move that decks make in slide three: they describe what the product does before they've made the reader feel the pain it solves.</p>

<p>If the problem isn't visceral, the solution is invisible. Doesn't matter how clever the tech is. Investors don't fund cleverness; they fund pain relief.</p>

<h3>The fix</h3>

<p>Spend two slides on the problem before you spend one on the solution. Quote a customer. Show a screenshot of a frustrated tweet. Use a number that hurts to read ("the average accountant in our market re-types the same 47-row spreadsheet every Monday for 91 weeks before they quit"). When the reader is wincing, then — and only then — show what you built.</p>

<h2>Mistake 4 — Designing for yourself</h2>

<p>Founders read their decks alone, on a 27-inch monitor, in a quiet room. Investors read your deck on a phone, in an Uber, between two other meetings. <strong>The medium is not what you think it is.</strong></p>

<p>Twelve-point body text disappears. Three-column layouts collapse. Stock-photo-of-a-handshake means nothing. The deck has to work at thumbnail size.</p>

<h3>The fix</h3>

<p>Open your deck on your phone. If you can't read a single line of body text without zooming, redesign every slide for that screen. Use one idea per slide, one number per slide, and one image per slide. The deck will get longer; the meeting will get shorter.</p>

<h2>Mistake 5 — The ask that isn't an ask</h2>

<p>The final slide of most "almost-funded" decks reads: <em>"Thank you. Questions?"</em> That is not an ask. That is a closing pleasantry.</p>

<p>An ask is a number, a use of funds, a runway, and a milestone. <em>"We're raising $2.4M to extend runway to 22 months and ship V2, which we expect to triple ARR to $4.8M by Q3 2027."</em> A reader who saw nothing but that slide could still write a check.</p>

<h3>The fix</h3>

<p>Write the ask slide before you write any other slide. Every slide before it exists to justify it.</p>

<h2>The fix in one paragraph</h2>

<p>If you do nothing else, do this: rewrite slide one as a single declarative headline, push your problem to the front, replace top-down market math with bottom-up, design every slide for a phone screen, and end with a number-driven ask. That is the entire game. Everything else is decoration.</p>

<p>If you want help applying that to your own deck, we offer a <a href="/#pricing">slide-by-slide review</a> for $250. Most founders walk out of the call with a fixed deck the same week.</p>

<h2>Frequently asked questions</h2>

<h3>How long should a pitch deck be?</h3>
<p>Ten to twelve slides for the "send" deck (what investors read on their phone), and a fifteen-to-eighteen-slide "present" deck for live meetings. Anything longer means you haven't decided what matters.</p>

<h3>What's the single most common mistake?</h3>
<p>Burying the headline. Investors decide whether to read your deck on slide one. If your one-sentence story isn't there, the rest of the deck is rehearsing for a meeting you won't get.</p>

<h3>Should the deck be designed before or after the content is final?</h3>
<p>Together. A clean design forces clean thinking. If you can't fit a slide's idea into one short sentence and one image, the idea isn't sharp enough yet — and design is the X-ray that reveals it.</p>

<h3>Do investors read appendix slides?</h3>
<p>Rarely on first read, often on second. Treat the appendix as your "objection-handling" deck — every common pushback (CAC, churn, competitive moat) gets a one-page answer. If a partner is excited, they'll find them. If they're not, no slide saves you.</p>
`;

/* ============================================================
   POST 2 — From idea to investment — what a high-impact deck really looks like.
   Target keywords: high-impact pitch deck, investor pitch deck structure,
   10 slide pitch deck, Series A pitch deck, fundraising slides, deck template.
============================================================ */
const POST_2 = /* html */ `
<p>Nadia drew her first deck on a napkin in a co-working space in Cairo. Eight months later, she closed a $5.2M Series A from a New York fund that had previously passed on her three times.</p>

<p>The business hadn't changed. The deck had.</p>

<p>This piece is the playbook we built for founders like Nadia — the deck structure that works whether you're raising $250K from angels or $20M from a top-tier VC. It's not a template. Templates die the moment a partner says "I've seen this." It's a <em>structure</em> — the eleven beats every fundable deck hits, in the order investors expect, with the moves that separate "interesting" from "wire transfer."</p>

<h2>The deck is the product</h2>

<p>Here's the thing most founders miss: in the moment a deck is open on a partner's screen, <strong>the deck is your company</strong>. The product, the team, the market, the moat — none of it exists. Only the slide. If the slide leaks credibility, the company leaks credibility.</p>

<p>That reframe changes everything. Suddenly every typo is a customer churn signal. Every off-brand color is sloppy operations. Every vague metric is "we don't know our own numbers." The deck is not <em>about</em> the product. The deck <em>is</em> the first product investors ever experience from you.</p>

<h2>The eleven slides that move money</h2>

<p>After studying decks behind raises totaling more than $50M of our clients' capital, we kept seeing the same eleven beats. Not necessarily eleven slides — sometimes nine, sometimes thirteen — but the same eleven jobs. Skip one and the deck wobbles.</p>

<ol>
  <li><strong>The headline.</strong> One sentence. Who you are, who you serve, what you do. No tagline, no logo lockup, no "founded in 2024" — just the one-line story.</li>
  <li><strong>The pain.</strong> Make the reader wince. Specific customer, specific moment, specific dollar cost.</li>
  <li><strong>The "why now."</strong> What changed in the world that makes this possible <em>this year</em>? AI inference cost. New regulation. Behavior shift. If "why now" is missing, investors assume the answer is "no reason."</li>
  <li><strong>The product.</strong> One screenshot or two. No feature lists. The job-to-be-done in pictures.</li>
  <li><strong>The traction.</strong> Numbers, in a chart, with the up-and-to-the-right line. If you don't have traction, this becomes the "wedge" slide — what you're about to learn.</li>
  <li><strong>The market.</strong> Bottom-up. <em>"X companies × $Y/year = $Z reachable revenue."</em> One paragraph, max.</li>
  <li><strong>The competition.</strong> Not a 2×2 matrix where you're alone in the top-right (investors are bored of that). A blunt sentence: <em>"Our closest competitor is Acme. We're 40% cheaper because of our infrastructure choices."</em></li>
  <li><strong>The business model.</strong> How money moves. ARR or GMV, contract length, gross margin, expansion revenue. Three numbers.</li>
  <li><strong>The team.</strong> Why this team, and only this team, can win this market. Not a LinkedIn brag wall.</li>
  <li><strong>The ask.</strong> Amount, runway, milestone. One sentence: <em>"$2.4M to reach $4.8M ARR by Q3 2027."</em></li>
  <li><strong>The vision.</strong> Where this goes if you win. The 10-year picture investors return to when they're trying to convince their partners.</li>
</ol>

<h2>The "skim test"</h2>

<p>Before you send a deck, run the <strong>skim test</strong>: print the headline of every slide on a single page. If those headlines, read top-to-bottom, tell the whole story without anyone clicking into the deck — you have a fundable deck. If the headlines are "Our Solution," "Our Market," "Our Team" — you don't have a deck, you have a table of contents.</p>

<blockquote>The headline of every slide should be the conclusion, not the topic. "Our market is $14B and growing 22% YoY" beats "Market" every single time.</blockquote>

<h2>What investors actually do with your deck</h2>

<p>It helps to know the actual sequence of events when a partner receives your deck. Here's what happens behind the scenes:</p>

<ol>
  <li><strong>The 90-second skim</strong> — usually on a phone, often on the way to another meeting. They form a first impression based on slides 1–3 plus the traction slide.</li>
  <li><strong>The forward.</strong> If interested, they forward to one or two associates with a sentence like <em>"thoughts?"</em> Your deck is now being read by people you'll never meet, with no context other than the slides.</li>
  <li><strong>The associate diligence pass.</strong> They look for unit economics, churn, competitive defensibility. If your deck doesn't address these, the associate writes "feels early" — the kiss of death.</li>
  <li><strong>The partner meeting.</strong> If the deck survives the previous three steps, you're invited to talk. The deck is now a script for the meeting.</li>
</ol>

<p>The deck has to do four jobs in four different rooms, with you not in any of them. Design accordingly.</p>

<h2>The mistake even good decks make</h2>

<p>Even decks that hit all eleven beats often miss one thing: <strong>narrative momentum</strong>. A deck isn't a list of facts; it's a story with a turn. The turn usually happens between the problem and the solution, and again between traction and ask.</p>

<p>If your deck reads like a Wikipedia entry about your company, it's information. If it reads like a thriller — pain, twist, proof, ask — it's a fundraise.</p>

<h2>What this looks like in practice</h2>

<p>You can see this structure at work in the decks we publish in our <a href="/#work">portfolio</a> — the Bahrain Rugby AGM deck, the Revest Series B brief, the Tamara CX strategy deck. Different industries, same eleven beats, same skim test, same narrative arc.</p>

<p>If you're sitting with a half-finished deck right now and want a second opinion before you send it to investors, our <a href="/#pricing">consultation package</a> exists for that exact moment.</p>

<h2>Frequently asked questions</h2>

<h3>What's the difference between a "send" deck and a "present" deck?</h3>
<p>The send deck (the PDF you email) needs to be self-explanatory — text-heavy enough to make sense without you. The present deck (the one behind you in a live meeting) is sparser — your voice fills in the gaps. Most founders use one deck for both jobs and lose meetings on both sides.</p>

<h3>Should I include financials in the deck or save them for the data room?</h3>
<p>Include three numbers in the deck — ARR, growth rate, gross margin — and link to the data room for everything else. Investors hate being held hostage by missing numbers and equally hate decks that bury them in detail.</p>

<h3>How much time should I spend on a deck?</h3>
<p>Founders who close fast spend roughly 60–80 hours on the first version of their deck and another 40 on revisions. If that sounds like a lot, remember the deck is the document that decides whether you keep your company.</p>

<h3>Are pitch decks dead now that AI can summarize a company?</h3>
<p>The opposite. AI summaries are generic. The deck is now the only artifact that captures <em>your</em> point of view, <em>your</em> insight, <em>your</em> competitive read. The deck got more important, not less.</p>
`;

/* ============================================================
   POST 3 — The hidden power of design.
   Target keywords: pitch deck design, presentation design psychology,
   visual hierarchy, slide design, design course.
============================================================ */
const POST_3 = /* html */ `
<p>Two founders. Same market. Same revenue. Same ask. The first founder closed her round in 19 days. The second is still raising, eight months later.</p>

<p>The only meaningful difference between them was the deck.</p>

<p>This is the lecture we open our online course with — because once you see what design is actually doing to the investor's brain, you can never un-see it. Design isn't decoration. <strong>Design is the silent argument running underneath every slide.</strong> Investors don't notice it consciously. They notice it the way a stranger notices that the floor of a fancy restaurant is sticky. They can't tell you why they're walking out.</p>

<h2>The science of attention</h2>

<p>Researchers at Princeton showed in a 2006 study that humans form judgments about competence and trustworthiness from a face in <strong>100 milliseconds</strong>. A pitch deck operates on the same timescale. Open the file, glance at slide one, and a verdict is forming before the conscious brain catches up.</p>

<p>That verdict is built almost entirely from design cues: spacing, hierarchy, color choice, font choice, alignment, density. The actual <em>words</em> don't load into memory until two or three seconds later. By then the verdict is already trying to confirm itself.</p>

<p>This is why two decks with identical content can perform completely differently. The verdict was already cast.</p>

<h2>The four design rules investors trust</h2>

<p>After thousands of decks, four rules show up in the ones that close. They sound obvious. They are widely ignored.</p>

<h3>1. One idea per slide</h3>
<p>If a slide makes two points, it makes neither. The brain registers the slide as "noisy" and downgrades the entire deck. Cut every slide until each one is a single, declarative point. The deck will get longer; comprehension will go up; the meeting will go shorter.</p>

<h3>2. Whitespace is credibility</h3>
<p>Founders crowd slides because they're afraid empty space looks lazy. The opposite is true: empty space signals confidence. Apple, Stripe, and Nike all use 60–70% whitespace on their primary surfaces. Cluttered slides read as a founder who hasn't decided what matters.</p>

<h3>3. Consistency beats novelty</h3>
<p>The same body font on every slide. The same H2 size. The same eight-pixel grid. The investor isn't keeping score, but their unconscious is — and consistency reads as operational competence. Novelty in design (a different background here, a quirky font there) reads as "this team will surprise us in unpleasant ways."</p>

<h3>4. Hierarchy points the eye</h3>
<p>Eye-tracking studies of pitch decks show that investors look at the top-left corner first, then sweep right, then drop to whatever has the highest visual weight. If your most important number is in 14pt black text in the bottom-right corner, no one will see it. Make the headline 4–5× larger than the body. Make the key number 2× larger than the headline. The slide will read itself.</p>

<h2>Color theory for trust</h2>

<p>Color is the single fastest way to win or lose investor trust. Three principles, almost universally violated:</p>

<ul>
  <li><strong>Less is more.</strong> Two colors plus a neutral. That's the entire palette. Three or more reads as "branding by committee."</li>
  <li><strong>Saturation is a knob.</strong> Bright, fully-saturated colors signal "consumer." Muted, slightly-desaturated colors signal "B2B/enterprise." Match the saturation to the buyer.</li>
  <li><strong>Contrast for the chart that matters.</strong> Every slide has one chart that matters. That chart should be the brightest, most saturated thing on the slide. Everything else recedes.</li>
</ul>

<h2>Typography that closes deals</h2>

<p>Typeface choice is a subtle but powerful trust signal. Avoid: Times New Roman (reads as 1998), Comic Sans (reads as joke), and any "geometric" font with a quirky lowercase 'a' (reads as a college design student's portfolio).</p>

<p>Defaults that work: Inter, Inter Tight, Söhne, Aeonik, Geist, Tiempos for serif accents. Pair one sans-serif for the body and the same family or one carefully-chosen serif for the headlines. Stop there.</p>

<blockquote>The most common typographic mistake is using too many weights. A deck doesn't need Light, Regular, Medium, Semibold, Bold, and Black. Pick two — usually Regular and Semibold — and let hierarchy come from size, not weight.</blockquote>

<h2>Density: the invisible deal-killer</h2>

<p>If we had to identify a single design metric that predicts deck performance, it would be <strong>words per slide</strong>. The decks that close average 18 words per slide. The decks that don't average 64.</p>

<p>Density is what makes a deck feel "heavy" without anyone being able to articulate why. The phone screen is unforgiving — investors see a wall of grey text and bounce. Cut every slide by half. Then by half again. Then ask: is the deck weaker, or is it sharper?</p>

<h2>Course preview</h2>

<p>This article is the opening lecture from the online course we're building, <em>The Hidden Power of Design</em>. The full course covers:</p>

<ul>
  <li>The neuroscience of investor attention (and how to engineer for it)</li>
  <li>The 11-slide structure that maps to the brain's narrative reflex</li>
  <li>Color, typography, and grid systems that signal "fundable"</li>
  <li>50+ before/after slide redesigns from real raises</li>
  <li>Live workshop sessions where we redesign your deck on screen</li>
</ul>

<p>The course is in private beta with a handful of founders. To be the first to hear when it opens, drop us a line at <a href="mailto:hello@pitchdeck.com">hello@pitchdeck.com</a> with the subject line <em>"course waitlist"</em>.</p>

<h2>Frequently asked questions</h2>

<h3>I'm not a designer. Can I do this myself?</h3>
<p>The four rules above are within reach for any non-designer who is willing to be ruthless with the cut button. Most "designed" decks aren't designed — they're <em>uncluttered</em>. That's mostly a discipline problem, not a design-skill problem.</p>

<h3>Do I need a designer for my pre-seed deck?</h3>
<p>Not strictly. But you do need a designer's <em>eye</em> reviewing it before you send. A 30-minute review from someone who's seen hundreds of decks will catch things you can't see in your own work.</p>

<h3>How long does design take vs. content?</h3>
<p>For a deck that closes, plan on roughly 60% content, 40% design — and the two should overlap, not stack. Designing forces you to confront vague language; vague language forces you to redesign. The two refine each other.</p>

<h3>What's the most underrated design move?</h3>
<p>Margins. Most decks lose 10–15% of their visual real estate to bad margins. Set a tight, consistent margin on every slide and the entire deck snaps to attention. It's the cheapest, fastest, most underused fix in pitch design.</p>

<p>If you're staring at your own deck right now and aren't sure what's working, our <a href="/#pricing">slide-by-slide review</a> is built for that moment. We'll point at the specific things that are leaking trust — and how to fix them in an afternoon.</p>
`;

/* ============================================================
   Update routine
============================================================ */

type Update = {
  slug: string;
  excerpt: string;
  bodyHtml: string;
};

const updates: Update[] = [
  {
    slug: "why-most-pitch-decks-fail",
    excerpt: "The five structural mistakes that lose investor attention in the first 90 seconds — and how to fix every one in an afternoon.",
    bodyHtml: POST_1,
  },
  {
    slug: "from-idea-to-investment",
    excerpt: "The eleven-slide structure behind every deck that closes — and what investors actually do with your file when they receive it.",
    bodyHtml: POST_2,
  },
  {
    slug: "the-hidden-power-of-design",
    excerpt: "Why two identical pitches with different design produce opposite outcomes — and the four rules investors trust without knowing they trust them.",
    bodyHtml: POST_3,
  },
];

async function main() {
  console.log("Writing content into seeded posts...");
  for (const u of updates) {
    const json = generateJSON(u.bodyHtml, EXTENSIONS);
    const result = await db
      .update(schema.blogPosts)
      .set({
        excerpt: u.excerpt,
        bodyHtml: u.bodyHtml.trim(),
        bodyJson: json,
        updatedAt: new Date(),
      })
      .where(eq(schema.blogPosts.slug, u.slug))
      .returning({ id: schema.blogPosts.id, slug: schema.blogPosts.slug });

    if (result.length === 0) {
      console.warn(`  ✗ ${u.slug} — not found`);
    } else {
      console.log(`  ✓ ${u.slug} — ${u.bodyHtml.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length} words`);
    }
  }
  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
