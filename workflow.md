# DeepSea Guardian — AG Engineering Workflow

> **Canonical execution workflow for HackOcean Round 2**
>
> Derived from the workflow used to build ClimateTwin and adapted for a 12-hour frontend hackathon.
>
> **Roles:** User = Product Owner / final decision-maker · ChatGPT = CTO / Architect / Reviewer · Antigravity (AG) = Implementation Engineer · Git = known-good checkpoints
>
> **Core loop:** Roadmap → Engineering Ticket → Implementation-Plan Prompt → AG Plan → CTO Review → Refinements → Revised Implementation Prompt → AG Implements → AG Walkthrough → CTO Code Review → Verification → Commit → Next Ticket

---

# 0. WHY THIS WORKFLOW EXISTS

DeepSea Guardian must be built quickly without turning the repository into uncontrolled AI-generated code.

The purpose of this workflow is to preserve the best parts of the ClimateTwin engineering process:

- architecture before implementation
- explicit scope
- ticket-based development
- precise prompts
- repository-aware planning
- design-source-of-truth discipline
- human approval gates
- implementation review
- verification before moving on
- small known-good Git checkpoints
- persistent project context
- clear handoffs between sessions and agents

The workflow deliberately separates **thinking**, **planning**, **implementation**, and **verification**.

AG is not given vague instructions such as:

```text
Build the mission control page.
```

Instead, AG receives a bounded engineering ticket, inspects the existing repository, proposes a concrete implementation plan, waits for architectural review, and only then receives the final implementation instruction.

The system exists to prevent:

- AG inventing product scope
- AG redesigning approved UI
- unnecessary abstractions
- unrelated file modifications
- duplicate components
- architecture drift
- premature backend work
- inconsistent naming
- hidden integration problems
- massive unreviewable changes
- "vibe coding" that cannot be maintained
- features that look finished but do not actually work

---

# 1. CANONICAL ROLE MODEL

## 1.1 Product Owner — User

The Product Owner owns:

- product vision
- final feature decisions
- priorities
- visual taste
- hackathon strategy
- acceptance/rejection of product direction
- scope cuts
- final approval

The Product Owner does **not** need to micromanage implementation details.

Questions owned by the Product Owner include:

```text
Should Live Mission Mode exist?
Should this interaction feel cinematic?
Which screen should be the hero experience?
Is this feature worth spending hackathon time on?
Does this UI feel like DeepSea Guardian?
```

---

## 1.2 CTO / Architect / Reviewer — ChatGPT

ChatGPT owns:

- converting product goals into engineering tickets
- maintaining the roadmap
- writing precise AG planning prompts
- reviewing AG's proposed plan
- identifying architecture problems
- identifying unnecessary complexity
- identifying missing edge cases
- enforcing ticket boundaries
- integrating improvements into the final implementation prompt
- reviewing AG's implementation walkthrough
- reviewing code/architecture
- defining fixes
- deciding whether a ticket is ready to commit
- maintaining continuity across tickets

ChatGPT is the layer between product intent and implementation.

Conceptually:

```text
PRODUCT INTENT
      ↓
CHATGPT / CTO
      ↓
ENGINEERING SPECIFICATION
      ↓
AG
```

---

## 1.3 Implementation Engineer — Antigravity (AG)

AG owns:

- inspecting the current repository
- understanding existing patterns
- producing implementation plans
- implementing approved tickets
- modifying only necessary files
- integrating with existing architecture
- running appropriate checks
- reporting exactly what changed
- producing a walkthrough after implementation

AG does **not** own:

- expanding product scope
- redesigning approved UI
- changing architecture without approval
- adding unrelated features
- introducing backend infrastructure because it "may be useful"
- rewriting unrelated working code
- choosing a different product direction

---

## 1.4 Git — Recovery and Known-Good State

Git is not an afterthought.

Each completed ticket should end in a known-good checkpoint.

The mental model is:

```text
WORKING STATE
     ↓
ONE BOUNDED TICKET
     ↓
VERIFY
     ↓
COMMIT
     ↓
NEW KNOWN-GOOD STATE
```

If a later ticket breaks the application, the team has a stable recovery point.

---

# 2. SOURCE-OF-TRUTH HIERARCHY

Before AG writes code, it must know which artifact controls which decision.

For DeepSea Guardian:

## Level 1 — Product Context

`context.md`

This defines:

- what DeepSea Guardian is
- what problem it solves
- HackOcean constraints
- frontend-first scope
- simulated-data strategy
- P0/P1/P2/P3 priorities
- product philosophy
- Mission Control identity
- long-term direction

AG must not contradict `context.md`.

---

## Level 2 — Workflow

`workflow.md`

This document defines **how development is performed**.

AG must not bypass planning/review boundaries unless explicitly instructed during emergency hackathon execution.

---

## Level 3 — Approved Design

Any explicitly approved design artifact becomes the UI source of truth.

ClimateTwin rule preserved:

> Once a design is approved/frozen, AG must implement the latest approved design and must not redesign, reinterpret, or fall back to older mockups.

If a Stitch/Figma/other design source is used:

1. inspect the latest approved design before coding
2. ignore superseded mockups
3. preserve approved hierarchy, spacing, information architecture, and interactions
4. do not "improve" the design independently
5. if implementation constraints conflict with design, report the conflict before changing direction

This rule was introduced because AG previously mishandled the Stitch connection during ClimateTwin.

---

## Level 4 — Current Repository

The repository is the source of truth for:

- current folder structure
- installed dependencies
- reusable components
- naming conventions
- routing
- state management
- existing services
- existing design tokens
- existing utilities
- implemented ticket state

AG must inspect before proposing changes.

---

## Level 5 — Current Engineering Ticket

The ticket defines the exact current scope.

If something is not required by:

- the ticket,
- an explicit dependency of the ticket,
- or an approved refinement,

AG should not implement it.

---

# 3. MASTER DEVELOPMENT LOOP

The canonical ClimateTwin workflow was:

```text
ROADMAP
   ↓
ENGINEERING TICKET
   ↓
IMPLEMENTATION-PLAN PROMPT
   ↓
AG ANALYZES REPOSITORY
   ↓
AG RETURNS PLAN
   ↓
CTO REVIEWS PLAN
   ↓
ARCHITECTURAL REFINEMENTS
   ↓
REVISED IMPLEMENTATION PROMPT
   ↓
AG IMPLEMENTS
   ↓
AG WALKTHROUGH
   ↓
CTO CODE REVIEW
   ↓
FIXES IF REQUIRED
   ↓
TEST / VERIFY
   ↓
GIT COMMIT
   ↓
NEXT TICKET
```

This ordering is important.

**AG walkthrough occurs after implementation.**

The walkthrough describes what AG actually changed; it is not a pre-implementation planning artifact.

---

# 4. PHASE A — MASTER ROADMAP

Before implementation begins, maintain a roadmap.

For DeepSea Guardian, the roadmap should be ticket-based.

Example:

```text
DSG-000 — Hackathon Foundation / Repository Initialization
DSG-001 — Design System & Application Shell
DSG-002 — Landing Experience
DSG-003 — Mission Control Workspace
DSG-004 — Ocean Intelligence Map
DSG-005 — Threat Layer System
DSG-006 — Threat Detail Experience
DSG-007 — Environmental Risk Visualization
DSG-008 — Biodiversity Explorer
DSG-009 — Drone & Sensor Monitoring
DSG-010 — Live Mission Mode
DSG-011 — Sound & Microinteractions
DSG-012 — Responsive / Accessibility Pass
DSG-013 — Performance / SEO Pass
DSG-014 — Final QA / Deployment / Submission
```

The numbering can change as implementation evolves.

The important rule:

> The roadmap communicates sequence and dependencies, but priority determines execution.

P0 functionality can move ahead of lower-value tickets.

---

# 5. SPRINT MODEL

ClimateTwin used larger engineering sprints.

DeepSea Guardian compresses the same discipline into a hackathon.

## Sprint 0 — Foundation

Purpose:

- repository initialization
- dependency decisions
- routing
- folder architecture
- global styles
- design tokens
- deployment baseline
- data-provider skeleton
- shared application shell

Goal:

> Establish a stable platform on which every later feature can be built.

---

## Sprint 1 — Core Product

Purpose:

- Mission Control
- Ocean Intelligence Map
- threat markers
- layer controls
- threat detail interaction

This sprint contains the **P0 experience**.

If the hackathon ended after this sprint, DeepSea Guardian must already be understandable and demoable.

---

## Sprint 2 — Intelligence Layers

Purpose:

- environmental risk
- biodiversity
- drone monitoring
- sensor monitoring
- supporting analytics

---

## Sprint 3 — Experience / WOW

Purpose:

- Live Mission Mode
- sound
- cinematic transitions
- advanced microinteractions
- animated system activity

Only begin this sprint when P0 is stable.

---

## Sprint 4 — Ship

Purpose:

- responsiveness
- accessibility
- SEO
- performance
- browser QA
- deployment verification
- README
- submission
- demo rehearsal

No speculative features belong here.

---

# 6. ENGINEERING TICKET STANDARD

Every meaningful feature receives a ticket.

A ticket should answer:

1. Why are we building this?
2. What exactly is included?
3. What is explicitly excluded?
4. Which existing systems does it touch?
5. What user behavior must work?
6. What technical constraints exist?
7. What is the expected final state?
8. How will we verify completion?

---

# 7. ENGINEERING TICKET TEMPLATE

```markdown
# DSG-XXX — Ticket Name

## Status
Planned / Planning / Approved / Implementing / Review / Complete

## Sprint
Sprint X

## Priority
P0 / P1 / P2 / P3

## Objective
One concise statement describing what this ticket achieves.

## Product Context
Why this capability matters to DeepSea Guardian and how it supports the Mission Control experience.

## Current State
What exists in the repository before this ticket.

## Desired State
What must exist after this ticket.

## In Scope
- ...
- ...
- ...

## Out of Scope
- ...
- ...
- ...

## User Experience
Describe the exact user journey/interactions.

## Functional Requirements
- FR-1 ...
- FR-2 ...
- FR-3 ...

## UI Requirements
- ...
- ...

## Data Requirements
- ...
- ...

## Architecture Constraints
- preserve existing architecture
- reuse shared primitives
- use service/data-provider boundaries
- no backend
- no unrelated refactors
- no redesign of approved UI

## Dependencies
- ...

## Edge Cases
- ...
- ...

## Acceptance Criteria
- [ ] ...
- [ ] ...
- [ ] ...

## Verification
- build
- lint
- manual interaction test
- responsive test
- route/reload test
- any ticket-specific checks

## Expected Files / Areas
Not an absolute file list; indicate likely repository areas to inspect/change.

## Non-Goals
Explicitly state attractive but unnecessary work that AG must avoid.
```

---

# 8. TICKET SCOPE RULE

A ticket must be small enough that its implementation can be reviewed.

Bad ticket:

```text
Build the whole dashboard.
```

Better:

```text
Implement the Mission Control shell with navigation, top status bar,
metric strip, central workspace region, and right activity panel using
existing design primitives. Do not implement the map internals or live
mission behavior in this ticket.
```

This prevents hidden scope expansion.

---

# 9. FIRST AG PROMPT — IMPLEMENTATION PLAN ONLY

After a ticket is written, AG is **not immediately told to code**.

The first prompt asks AG to inspect the repository and produce a plan.

The prompt must explicitly say that implementation is not yet authorized.

Template:

```text
You are working on DeepSea Guardian.

Before doing anything, read:
1. context.md
2. workflow.md
3. the current engineering ticket below

CURRENT TICKET:
[PASTE TICKET]

TASK:
Do NOT implement yet.

Inspect the current repository thoroughly and produce an implementation
plan for this ticket.

Your plan must be grounded in the repository as it exists now.

Inspect:
- relevant folder structure
- existing components
- current routes
- design primitives/tokens
- existing state/data patterns
- services/providers
- dependencies
- any implementation from earlier tickets that this feature should reuse

Return:

1. Current-state assessment
2. Exact implementation approach
3. Files/components you expect to create
4. Files/components you expect to modify
5. Existing code you will reuse
6. Data flow
7. State flow
8. Component hierarchy
9. Interaction behavior
10. Responsive behavior
11. Accessibility considerations
12. Performance implications
13. Edge cases
14. Risks / integration concerns
15. Verification plan
16. Any ambiguity or conflict you found

CONSTRAINTS:
- Do not implement.
- Do not modify files.
- Do not redesign approved UI.
- Do not add features outside the ticket.
- Do not add backend infrastructure.
- Do not create abstractions without a current need.
- Prefer reuse over duplication.
- Preserve existing architecture unless the ticket explicitly requires a change.
- If you believe an architectural change is required, explain it rather than making it.

Wait for approval after returning the plan.
```

This prompt is intentionally precise.

AG must understand that **analysis and implementation are separate phases**.

---

# 10. WHAT MAKES OUR PROMPTS PRECISE

ClimateTwin prompts were effective because they did not merely describe a feature.

They constrained the implementation space.

Every important AG prompt should communicate:

## Context

What project is this?

## Current objective

What one thing are we doing?

## Existing architecture

What must be preserved?

## Source of truth

Which design/spec controls implementation?

## Scope

What is included?

## Non-scope

What must not be touched?

## Expected behavior

What should the user actually experience?

## Technical constraints

Which patterns/dependencies must be used or avoided?

## Integration

How does this connect to existing work?

## Verification

How do we know it works?

## Deliverable format

What must AG report after finishing?

This turns:

```text
Make the map.
```

into an engineering instruction.

---

# 11. CTO REVIEW OF AG PLAN

AG's plan is never accepted automatically.

ChatGPT reviews it as CTO.

The review asks:

### Architecture
- Does this preserve the current architecture?
- Is AG duplicating something that already exists?
- Is AG introducing unnecessary layers?
- Is the component hierarchy sensible?
- Is state located at the correct level?
- Does data flow cleanly?

### Scope
- Is AG implementing anything not requested?
- Did AG miss a required behavior?
- Is AG solving future problems instead of the current ticket?

### Product
- Does the plan produce the intended user experience?
- Does it support the Mission Control identity?
- Does it follow the approved design?

### Frontend Quality
- responsiveness
- accessibility
- loading/error/empty states where relevant
- animation behavior
- keyboard behavior
- reduced motion where relevant
- performance

### Integration
- Could this break existing routes/components?
- Does it reuse existing design primitives?
- Does it align with data-provider/service boundaries?
- Will later tickets be able to extend it?

### Hackathon Efficiency
- Is any part too expensive for its visible value?
- Can the same result be achieved more simply?
- Is AG overengineering?

---

# 12. CTO REVIEW OUTPUT FORMAT

A review can be structured as:

```markdown
## Verdict
APPROVE / APPROVE WITH REFINEMENTS / REPLAN

## What AG Got Right
- ...

## Required Refinements
1. ...
2. ...
3. ...

## Architecture Corrections
- ...

## Scope Corrections
- ...

## UX Corrections
- ...

## Performance / Accessibility Corrections
- ...

## Things Explicitly Not To Build
- ...

## Final Implementation Direction
Concise description of the approved approach.
```

Most plans should be **APPROVE WITH REFINEMENTS**, not blindly accepted and not unnecessarily rejected.

---

# 13. REVISED IMPLEMENTATION PROMPT

This is one of the most important parts of the workflow.

After CTO review, ChatGPT does **not** simply tell AG:

```text
Okay, implement with those changes.
```

Instead, all approved improvements are folded into a new self-contained implementation prompt.

AG should not need to reconstruct decisions from several previous messages.

Template:

```text
Implement DSG-XXX.

You have already inspected the repository and proposed a plan.
The plan has now been reviewed.

Before implementation:
- re-read context.md
- re-read workflow.md
- preserve all existing completed functionality
- use the latest approved design/source of truth

IMPLEMENTATION OBJECTIVE:
[concise objective]

APPROVED APPROACH:
[approved architecture]

REQUIRED REFINEMENTS FROM CTO REVIEW:
1. ...
2. ...
3. ...

IN SCOPE:
- ...

OUT OF SCOPE:
- ...

COMPONENT / MODULE EXPECTATIONS:
- ...

DATA FLOW:
- ...

STATE / INTERACTION BEHAVIOR:
- ...

RESPONSIVE REQUIREMENTS:
- ...

ACCESSIBILITY REQUIREMENTS:
- ...

PERFORMANCE REQUIREMENTS:
- ...

ARCHITECTURE CONSTRAINTS:
- reuse existing primitives
- preserve service/provider boundaries
- do not couple UI directly to mock JSON where a service boundary exists
- do not add backend infrastructure
- no unrelated refactors
- no speculative abstractions
- no redesign of approved UI
- do not edit unrelated files
- keep the implementation extensible but optimize for the current ticket

ACCEPTANCE CRITERIA:
- [ ] ...
- [ ] ...

VERIFICATION:
Run the appropriate existing project checks.
Manually verify the ticket's primary user flow.
Do not claim verification you did not perform.

AFTER IMPLEMENTATION:
Return a walkthrough containing:
1. Summary
2. Files created
3. Files modified
4. Architecture/data-flow changes
5. User-facing behavior implemented
6. Responsive/accessibility work
7. Verification performed and results
8. Known limitations
9. Any deviations from the approved plan and why
10. Suggested next ticket dependencies

Do not implement unrelated improvements.
```

---

# 14. AG IMPLEMENTATION RULES

During implementation AG should follow these rules.

## Rule 1 — Ticket Boundary Is Sacred

Do not add unrelated functionality.

## Rule 2 — Inspect Before Edit

Read existing code before replacing it.

## Rule 3 — Reuse Before Create

If a reusable component already exists, use it.

## Rule 4 — No Silent Architecture Changes

If architecture must change, the approved implementation prompt should already authorize it.

## Rule 5 — No Unrelated Refactors

A working file is not an invitation to rewrite it.

## Rule 6 — No Speculative Infrastructure

Do not build systems merely because they might be useful later.

## Rule 7 — Design Is Frozen Once Approved

Implement, do not reinterpret.

## Rule 8 — Preserve Existing Functionality

New tickets should not regress completed tickets.

## Rule 9 — Simulated Data Must Remain Honest

HackOcean uses dummy/simulated data. Do not make the UI falsely imply a production AI pipeline is currently operating.

## Rule 10 — Verify What You Claim

If AG says the build passed, it must actually have run the build.

---

# 15. AG WALKTHROUGH — AFTER IMPLEMENTATION

The walkthrough happens **after implementation**.

Its purpose is to make review efficient.

Required format:

```markdown
# DSG-XXX Implementation Walkthrough

## 1. Summary
What was implemented.

## 2. Files Created
- path — purpose

## 3. Files Modified
- path — what changed and why

## 4. Component Hierarchy
Relevant hierarchy after implementation.

## 5. Data Flow
Where data originates and how it reaches UI.

## 6. State / Interaction Flow
How user actions update the system.

## 7. UX Behavior
What the user can now do.

## 8. Responsive Behavior
What was implemented for smaller screens.

## 9. Accessibility
Keyboard, semantics, labels, motion, etc.

## 10. Performance Considerations
Lazy loading, rendering decisions, asset decisions, etc.

## 11. Verification Performed
Exact commands/tests/manual checks and results.

## 12. Deviations
Anything different from the approved plan and why.

## 13. Known Limitations
Anything intentionally incomplete.

## 14. Next-Ticket Dependencies
What later tickets can now build on.
```

The walkthrough is not accepted as proof by itself; it is an index for CTO review.

---

# 16. CTO CODE REVIEW

After AG implements, ChatGPT reviews the actual result.

The review should inspect:

## Correctness
- Does it satisfy the ticket?
- Do interactions work?
- Are edge cases handled?

## Architecture
- Are boundaries preserved?
- Is data flow clean?
- Did AG introduce duplication?
- Is the implementation extendable without being overengineered?

## Scope
- Did unrelated changes slip in?

## UX
- Does it match approved design?
- Does it feel like DeepSea Guardian?
- Is hierarchy clear?
- Are interactions intuitive?

## Responsive
- desktop
- tablet
- mobile

## Accessibility
- semantic elements
- keyboard access
- accessible labels
- contrast
- focus behavior
- reduced motion when relevant

## Performance
- unnecessary re-renders
- large assets
- expensive map/globe work
- lazy loading opportunities
- bundle impact

## Maintainability
- naming
- file organization
- dead code
- duplicated constants
- hard-coded data in components
- magic values

---

# 17. REVIEW SEVERITY

Issues should be classified.

## BLOCKER

Ticket cannot be committed.

Examples:

- build broken
- primary interaction broken
- major design mismatch
- route crashes
- severe architecture violation

## REQUIRED

Must fix before commit unless hackathon time forces an explicit exception.

Examples:

- missing responsive behavior
- incorrect data flow
- duplicated implementation
- accessibility failure on primary interaction

## POLISH

Useful but can be deferred.

Examples:

- tiny animation timing
- minor spacing
- nonessential visual refinement

This prevents spending 30 minutes polishing a 2-pixel detail while P0 functionality is unfinished.

---

# 18. FIX LOOP

If review finds problems:

```text
CTO REVIEW
   ↓
FIX LIST
   ↓
AG FIX PROMPT
   ↓
AG PATCHES
   ↓
AG REPORTS CHANGES
   ↓
RE-VERIFY
   ↓
CTO APPROVAL
```

Fix prompts should remain narrow.

Example:

```text
Address only the following review findings for DSG-005.

1. ...
2. ...
3. ...

Do not refactor unrelated code.
Do not add new features.
Preserve all working behavior.

After fixes:
- rerun relevant verification
- report exact files changed
- report exact verification results
```

---

# 19. VERIFICATION GATE

A ticket is not complete because it "looks implemented."

Before commit, verify the appropriate subset of:

```text
Build
Lint
Type check (if configured)
Primary interaction
Route navigation
Direct route reload
Desktop
Tablet
Mobile
Keyboard interaction
Reduced motion where relevant
Loading/error/empty states where relevant
Console errors
Network/asset failures
Deployment behavior where relevant
```

For HackOcean, manual interaction testing is especially important because UI/UX is part of judging.

---

# 20. GIT COMMIT GATE

Commit only when:

- ticket acceptance criteria are satisfied
- blocker issues are resolved
- required verification passes
- no unrelated modifications remain
- implementation is understandable
- the app remains deployable

Suggested commit style:

```text
feat: initialize DeepSea Guardian frontend
feat: add mission control shell
feat: implement ocean intelligence map
feat: add interactive threat layers
feat: add threat intelligence drawer
feat: add environmental risk visualization
feat: add biodiversity explorer
feat: implement live mission experience
perf: optimize assets and map rendering
fix: improve responsive and accessible interactions
chore: prepare HackOcean final release
```

One meaningful ticket or tightly coupled change-set per commit.

---

# 21. SAME-BRANCH DEVELOPMENT

For the small hackathon team, same-branch development is acceptable when coordinated.

The important safety mechanism is frequent known-good commits.

Do not leave six hours of unrelated uncommitted work in one working tree.

Mental model:

```text
Ticket
 ↓
Implement
 ↓
Verify
 ↓
Commit
 ↓
Next Ticket
```

---

# 22. DESIGN SOURCE-OF-TRUTH PROTOCOL

This preserves a major ClimateTwin lesson.

When an approved Stitch/Figma/design exists:

## Before planning
AG must inspect the latest approved design.

## During planning
AG maps design sections to existing/new components.

## During implementation
AG implements the approved design.

## Forbidden
- redesigning it
- using an older mockup
- replacing it with a generic AI dashboard
- changing information hierarchy because AG prefers another layout
- inventing new visual systems

If a design cannot reasonably be implemented:

```text
STOP
 ↓
REPORT CONFLICT
 ↓
CTO / PRODUCT DECISION
 ↓
CONTINUE
```

Do not silently improvise.

---

# 23. REPOSITORY-INSPECTION PROTOCOL

Before AG proposes a plan, it should inspect enough of the repository to answer:

- What framework/version are we using?
- How is routing implemented?
- Where are shared components?
- Where are feature components?
- What design primitives exist?
- How is data currently accessed?
- Is there already a service/provider?
- What animation library is installed?
- What mapping library is installed?
- What existing code can be reused?
- Which previous ticket owns the integration point?
- What tests/checks are configured?

The exact files depend on the repository.

AG should not pretend to know structure from the ticket alone.

---

# 24. FILE-EDIT DISCIPLINE

Before implementation, AG's plan should identify likely files.

After implementation, the walkthrough must identify actual files.

Unexpected edits deserve scrutiny.

Rules:

- do not edit unrelated files
- do not globally reformat the repository during a feature ticket
- do not rename folders casually
- do not replace working primitives without justification
- do not duplicate constants
- do not scatter mock data throughout components
- avoid giant monolithic components
- avoid premature micro-components with no reuse/readability value

---

# 25. ARCHITECTURE DISCIPLINE

DeepSea Guardian should remain frontend-first but future-ready.

Preferred conceptual flow:

```text
UI Components
      ↓
Feature Modules
      ↓
Hooks / State
      ↓
Service Layer
      ↓
Data Provider
      ↓
Mock Provider (HackOcean)
      ↓
Real API Provider (Future)
```

A component should not care whether the data came from:

```text
JSON today
or
API tomorrow
```

However:

> Future-ready does not mean building future infrastructure now.

Use the smallest abstraction that creates a clean replacement boundary.

---

# 26. FEATURE MODULE DISCIPLINE

Prefer feature ownership.

Conceptually:

```text
features/
  mission-control/
  ocean-map/
  threats/
  risk/
  biodiversity/
  drones/
  sensors/
  live-mission/
```

Shared primitives belong outside features only when genuinely shared.

This follows the ClimateTwin lesson of separating shared UI/layout/scientific primitives from feature modules rather than dumping everything into one generic components directory.

---

# 27. CLIMATETWIN ARCHITECTURE LESSONS TO PRESERVE

ClimateTwin's UI architecture used deliberate separation such as:

```text
components/
  ui/
  layout/
  map/
  charts/
  scientific/

features/
  ...

config/
constants/
lib/
contexts/
theme/
```

DeepSea Guardian does not need to reproduce this structure mechanically.

The lesson to preserve is:

> Separate reusable primitives from domain features and keep architectural responsibilities obvious.

ClimateTwin also established stable hierarchy patterns rather than allowing each ticket to invent new ones.

For example, its map workspace hierarchy was deliberately frozen:

```text
MapWorkspace
   ↓
MapCanvas
   ↓
LayerManager
   ↓
OverlayContainer
```

DeepSea Guardian should similarly freeze important hierarchies once established, especially the Ocean Intelligence Map and Mission Control shell.

---

# 28. NO DUPLICATION RULE

Before creating:

```text
ThreatCardNew.jsx
```

AG must check whether:

```text
ThreatCard.jsx
StatusCard.jsx
MetricCard.jsx
Panel.jsx
```

already solve the need.

Duplication creates visual drift and slows later changes.

The rule:

> Reuse → extend carefully → create only when responsibility is genuinely different.

---

# 29. NO PREMATURE ABSTRACTION RULE

The opposite failure also matters.

Do not create:

```text
UniversalDynamicOceanEntityRendererFactory
```

for three markers.

Hackathon architecture should be:

- clear
- modular
- replaceable
- small

Not academically elaborate.

---

# 30. PROMPT SELF-CONTAINMENT RULE

Final implementation prompts must be self-contained.

Do not rely on AG remembering:

> "that correction from four messages ago."

Every implementation prompt should contain all currently binding decisions needed for the ticket.

This was central to the ClimateTwin workflow:

```text
AG PLAN
  ↓
CTO IMPROVEMENTS
  ↓
ALL IMPROVEMENTS FOLDED INTO
ONE REVISED IMPLEMENTATION PROMPT
```

---

# 31. APPROVAL GATES

There are explicit gates.

## Gate A — Ticket Approval
Product/CTO agrees the ticket is worth building.

## Gate B — Plan Approval
AG may not implement before the plan is reviewed.

## Gate C — Implementation Review
Walkthrough/code is reviewed before commit.

## Gate D — Verification
Checks must pass.

## Gate E — Commit
Only then does the ticket become a known-good project state.

For the hackathon, gates can be fast.

They should not disappear.

---

# 32. EMERGENCY FAST PATH

The 12-hour constraint sometimes requires compression.

For small, low-risk tickets:

```text
Ticket
 ↓
AG Plan
 ↓
30-second CTO Review
 ↓
Implement
 ↓
Walkthrough + Verification
 ↓
Commit
```

For trivial fixes, planning can be embedded in the implementation instruction **only when explicitly approved by the CTO**.

Examples:

- typo
- one spacing bug
- broken icon
- obvious mobile overflow

Do not use the fast path for:

- architecture
- Mission Control
- map
- state systems
- Live Mission
- data-provider changes
- routing changes
- major responsive work

---

# 33. TIME-BOXING DURING HACKOCEAN

The workflow exists to save time, not consume it.

Recommended planning/review budgets:

```text
P0 architecture ticket
Plan + review: ~5–10 min

Normal feature ticket
Plan + review: ~3–5 min

Small integration ticket
Plan + review: ~1–3 min

Trivial fix
Fast path
```

If a discussion is not changing implementation quality or product outcome, stop discussing and build.

---

# 34. 12-HOUR EXECUTION MAP

## Hour 0–1 — Sprint 0

- repository
- context.md
- workflow.md
- architecture
- design tokens
- routing
- deployment baseline
- mock-data boundary

Feature scope freezes by approximately Hour 1.

---

## Hour 1–3 — Shell

- application shell
- landing essentials
- Mission Control skeleton
- shared primitives

---

## Hour 3–6 — P0 Hero Experience

- Ocean Intelligence Map
- markers
- layers
- threat interaction
- detail drawer
- metrics

At Hour 6 the product must already be demoable.

---

## Hour 6–8 — Intelligence

- risk
- biodiversity
- drones
- sensors
- supporting analytics

---

## Hour 8–9.5 — WOW

Only if core is stable:

- Live Mission
- sound
- microinteractions
- advanced transitions

---

## Hour 9.5–10.5 — Responsive / Accessibility

No major new features.

---

## Hour 10.5–11 — Performance / SEO

- asset optimization
- lazy loading
- Core Web Vitals attention
- metadata
- semantics

---

## Hour 11–11.5 — Break It

- routes
- reloads
- mobile
- browser
- interactions
- console
- deployment

---

## Hour 11.5–12 — Ship

- freeze features
- final commit
- production deployment
- README
- submission
- demo rehearsal

---

# 35. DEFINITION OF DONE

A ticket is done only when:

```text
Specified
+
Implemented
+
Integrated
+
Reviewed
+
Verified
+
Committed
```

Not:

```text
AG says "done"
```

---

# 36. SESSION START PROTOCOL

At the beginning of a work session:

1. Read `context.md`
2. Read `workflow.md`
3. Check Git status
4. Identify latest known-good commit
5. Review completed tickets
6. Identify current sprint
7. Select highest-priority unblocked ticket
8. Inspect current design source of truth
9. Write/confirm ticket
10. begin plan → review → implementation loop

---

# 37. SESSION END / HANDOFF PROTOCOL

At the end of a session or before switching agents:

Record:

```markdown
## Current Project State

### Last Completed Ticket
DSG-XXX

### Current Commit
<hash / message>

### Current Sprint
Sprint X

### Working Features
- ...

### Known Issues
- ...

### Current Ticket
DSG-XXX

### Next Recommended Ticket
DSG-XXX

### Design Source of Truth
...

### Important Decisions Made
- ...

### Do Not Change
- ...
```

This prevents the next session from reconstructing context from memory.

---

# 38. CONTEXT SYNC RULE

`context.md`, tickets, design source, and repository must tell the same story.

If product direction changes:

1. Product decision is made
2. Update canonical context if the change is fundamental
3. Update roadmap/ticket
4. Ensure design reflects the decision if applicable
5. Then implementation proceeds

Do not allow:

```text
context.md says A
design says B
ticket says C
AG builds D
```

---

# 39. HACKATHON SCOPE FILTER

Before approving any ticket, ask:

```text
Does this improve the judged frontend?
Does this strengthen Mission Control?
Does this improve the demo?
Does this improve reliability?
Does this satisfy an evaluation criterion?
```

If the answer is no, cut it.

Examples to reject during HackOcean unless absolutely required:

- authentication
- backend
- database
- real ML pipeline
- admin CRUD
- speculative settings
- elaborate account systems
- infrastructure unrelated to the demo

---

# 40. UI QUALITY FILTER

Every major screen should be checked for:

- clear focal point
- visual hierarchy
- consistent spacing
- readable typography
- intentional density
- meaningful motion
- responsive behavior
- no generic AI-dashboard clutter
- no fake complexity for its own sake

DeepSea Guardian's identity is:

> **Mission Control for the Ocean**

Every screen should reinforce that identity.

---

# 41. SIMULATED-DATA RULE

HackOcean explicitly allows dummy data.

Use it intelligently.

Simulated data should be:

- internally consistent
- believable
- structured
- reusable
- clearly demo-oriented
- easy to replace later

Avoid claims such as:

```text
Our AI detected this in real time from live satellite feeds.
```

unless that is actually true.

Prefer:

```text
Simulated detection event
Demo risk score
Prototype intelligence layer
```

when explanation is necessary.

The frontend can demonstrate the future workflow without misrepresenting the current implementation.

---

# 42. PERFORMANCE RULE

Frontend spectacle must not destroy performance.

Before adding expensive visual effects, ask:

```text
Does this materially improve the demo?
```

Use:

- lazy loading for heavy routes/components
- optimized images
- controlled animation
- efficient map marker rendering
- no unnecessary background effects
- reduced-motion handling
- route/code splitting where useful

The hackathon explicitly evaluates performance/Core Web Vitals.

---

# 43. RESPONSIVE RULE

Responsive behavior is part of the feature, not a final patch.

Every ticket involving UI should state:

- desktop behavior
- tablet behavior
- mobile behavior

Mission Control can adapt rather than perfectly reproduce desktop density on mobile.

Priority:

```text
usable
> identical
```

---

# 44. ACCESSIBILITY RULE

Every interactive ticket considers:

- keyboard access
- visible focus
- semantic controls
- labels
- contrast
- alt text where relevant
- reduced motion
- non-color-only status cues

HackOcean explicitly evaluates accessibility.

---

# 45. ERROR-HANDLING RULE

Even simulated frontend systems can fail.

Where relevant, define:

- empty state
- loading state
- unavailable state
- invalid selection
- missing data
- failed dynamic import/asset

Do not build elaborate enterprise error infrastructure.

Do prevent broken-looking screens.

---

# 46. DEPENDENCY RULE

Do not install a library because one animation looked cool.

Before adding a dependency:

1. Can existing stack do it?
2. Is it worth bundle cost?
3. Is it stable enough for the hackathon?
4. Does it save meaningful implementation time?
5. Will it create integration risk?

If not, do not add it.

---

# 47. AG RESPONSE DISCIPLINE

AG planning response should be analytical.

AG implementation response should be a walkthrough.

AG should avoid vague completion messages such as:

```text
Done! I implemented everything.
```

The expected response is evidence-oriented:

```text
Created:
...

Modified:
...

Behavior:
...

Verification:
npm run build — passed
manual route test — passed
...

Known limitations:
...
```

---

# 48. CHATGPT CTO DISCIPLINE

ChatGPT should not blindly produce more architecture.

Before adding a refinement, ask:

```text
Does this solve a real current problem?
Does this reduce risk?
Does this improve the judged experience?
Does this make later P0 work easier?
```

If not, omit it.

The CTO's job is not to maximize sophistication.

The CTO's job is to maximize **shipping quality under constraints**.

---

# 49. PRODUCT OWNER DECISION DISCIPLINE

When the Product Owner rejects a direction, treat that as a product decision.

Do not repeatedly reintroduce it.

When the Product Owner approves/finalizes a design, freeze it until explicitly reopened.

This is especially important for AI agents that otherwise keep "improving" already-decided work.

---

# 50. COMPLETE TICKET LIFECYCLE EXAMPLE

Example: Ocean Intelligence Map.

```text
ROADMAP
DSG-004 identified as P0
        ↓

TICKET
Objective, scope, UX, layers, constraints,
acceptance criteria written
        ↓

PLAN PROMPT
AG told to inspect repo and NOT implement
        ↓

AG PLAN
Proposes map component hierarchy,
data flow, marker strategy, controls
        ↓

CTO REVIEW
Finds:
- duplicated layer state
- unnecessary abstraction
- missing mobile behavior
- no reduced-motion consideration
        ↓

REFINEMENTS
State moved to correct feature boundary
abstraction removed
mobile drawer behavior defined
motion rule added
        ↓

REVISED IMPLEMENTATION PROMPT
All approved decisions combined into one
self-contained instruction
        ↓

AG IMPLEMENTS
Only DSG-004
        ↓

AG WALKTHROUGH
Lists files, hierarchy, behavior,
verification, limitations
        ↓

CTO CODE REVIEW
Checks architecture, UI, performance,
scope, responsive behavior
        ↓

FIX LOOP
Only if needed
        ↓

VERIFY
Build + interaction + responsive
        ↓

COMMIT
feat: implement ocean intelligence map
        ↓

KNOWN-GOOD STATE
        ↓

DSG-005
Threat Layer System
```

---

# 51. GOLDEN PROMPT — PLAN PHASE

Use this as the default starting template.

```text
You are the implementation engineer for DeepSea Guardian.

DeepSea Guardian is being built for HackOcean Round 2, a 12-hour
frontend hackathon. The canonical product context is in context.md and
the canonical engineering process is in workflow.md.

Read both before proceeding.

CURRENT ENGINEERING TICKET:
[INSERT TICKET]

PHASE:
Implementation planning only.

DO NOT IMPLEMENT.
DO NOT MODIFY FILES.

First inspect the repository and the latest approved design/source of
truth relevant to this ticket.

Your job is to propose the smallest, cleanest implementation that
satisfies the ticket while preserving all completed work.

Analyze:
- current repository structure
- relevant existing components
- reusable primitives
- routing
- current feature boundaries
- state/data patterns
- services/providers
- dependencies
- approved UI
- integration points with previous tickets

Return:
1. Current-state assessment
2. Proposed implementation
3. Component hierarchy
4. Data flow
5. State flow
6. Files likely created
7. Files likely modified
8. Existing code reused
9. User interaction flow
10. Responsive behavior
11. Accessibility
12. Performance considerations
13. Edge cases
14. Integration risks
15. Verification plan
16. Ambiguities/conflicts requiring a decision

Hard constraints:
- no implementation yet
- no unrelated features
- no unrelated refactors
- no backend
- no speculative abstractions
- reuse before creating
- preserve existing architecture
- approved design is source of truth
- do not reinterpret frozen UI
- simulated data remains behind the existing data/service boundary
- optimize for a reliable 12-hour hackathon build

Wait for CTO review.
```

---

# 52. GOLDEN PROMPT — IMPLEMENTATION PHASE

```text
Implement engineering ticket DSG-XXX.

Before editing:
1. Read context.md
2. Read workflow.md
3. Re-check the current repository
4. Use the latest approved design/source of truth

The implementation plan has been reviewed by the CTO.

OBJECTIVE:
...

APPROVED IMPLEMENTATION DIRECTION:
...

MANDATORY CTO REFINEMENTS:
1. ...
2. ...
3. ...

IN SCOPE:
- ...

OUT OF SCOPE:
- ...

REQUIRED USER EXPERIENCE:
...

COMPONENT / ARCHITECTURE REQUIREMENTS:
...

DATA / STATE REQUIREMENTS:
...

RESPONSIVE REQUIREMENTS:
...

ACCESSIBILITY REQUIREMENTS:
...

PERFORMANCE REQUIREMENTS:
...

ACCEPTANCE CRITERIA:
- [ ] ...
- [ ] ...

Hard constraints:
- implement only this ticket
- preserve all existing working functionality
- do not redesign approved UI
- no unrelated refactors
- no backend infrastructure
- no speculative features
- reuse existing primitives
- preserve feature/service/provider boundaries
- do not scatter mock data directly through UI components
- do not claim verification that was not actually run

After implementation:
1. run relevant verification
2. manually verify the primary flow where possible
3. return a complete implementation walkthrough:
   - summary
   - files created
   - files modified
   - component hierarchy
   - data/state flow
   - user-facing behavior
   - responsive/accessibility behavior
   - verification commands and results
   - deviations
   - known limitations
   - next-ticket dependencies

Do not begin unrelated work after finishing the ticket.
```

---

# 53. GOLDEN PROMPT — FIX PHASE

```text
Apply only the following CTO review fixes for DSG-XXX:

1. ...
2. ...
3. ...

Constraints:
- do not add features
- do not redesign the screen
- do not refactor unrelated code
- preserve all working behavior
- keep changes limited to the review findings

After applying the fixes:
- list exact files changed
- explain each fix
- rerun relevant verification
- report exact results
- report any remaining limitation

Stop after these fixes.
```

---

# 54. GOLDEN PROMPT — FINAL QA

```text
Perform final QA for DeepSea Guardian.

Do not add new product features.

Read context.md and workflow.md.

Inspect and verify:
- production build
- all primary routes
- direct route reload behavior
- navigation
- Mission Control
- Ocean Intelligence Map
- threat layers
- threat detail interactions
- environmental risk
- biodiversity
- drones/sensors
- Live Mission if implemented
- desktop/tablet/mobile
- keyboard accessibility
- focus behavior
- reduced motion
- image/asset loading
- console errors
- obvious performance problems
- metadata/SEO
- deployment readiness

Return findings grouped as:
BLOCKER
REQUIRED
POLISH

Do not silently make broad changes.
For blockers or required fixes, propose the smallest correction first.
```

---

# 55. FINAL WORKFLOW PRINCIPLE

The workflow can be summarized as:

```text
DO NOT ASK AI TO "BUILD THE PROJECT."

Instead:

Understand
   ↓
Specify
   ↓
Plan
   ↓
Review
   ↓
Refine
   ↓
Implement
   ↓
Walk Through
   ↓
Review Code
   ↓
Verify
   ↓
Commit
   ↓
Repeat
```

That was the core discipline behind ClimateTwin.

DeepSea Guardian preserves it while adapting for hackathon speed.

---

# 56. DEEPSEA GUARDIAN EXECUTION MANTRA

> **Product Owner chooses what matters.**
>
> **CTO converts it into precise, bounded engineering work.**
>
> **AG implements only the approved work.**
>
> **Verification proves it works.**
>
> **Git freezes the known-good state.**
>
> **Then we move.**

And during HackOcean:

> **Scope → Build → Verify → Commit → Move.**

No unnecessary infrastructure.

No architecture for architecture's sake.

No agent freelancing.

No redesign after design freeze.

No giant unreviewed AI changes.

No new feature after the shipping freeze.

The goal is not to produce the most code.

The goal is to **ship the strongest possible DeepSea Guardian frontend before Hour 12.**
