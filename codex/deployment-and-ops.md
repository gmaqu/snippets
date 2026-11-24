# Deployment and Operating Models: From Pilot to Production

## The Core Principle
Useful output is only one gate. A governed, reviewable, safe operation requires
evidence across all three gates before scaling.

---

## The Three Deployment Gates
All must be demonstrable before expanding. Order matters.

| Gate | Question | Evidence |
|---|---|---|
| 1. Output quality | Is Codex producing useful, correct results? | Diffs that pass review, accepted changes |
| 2. Safeguard integrity | Did Codex stay within approved boundaries? | Logs showing no restricted actions or scope violations |
| 3. Review completion | Did the right humans approve the right things? | Documented reviewer sign-offs linked to specific outputs |

> Gate 1 alone is never sufficient for expansion.

---

## Pilot to Production
Progression is triggered by **evidence**, not volume or enthusiasm.

1. **Bounded pilot** — one team, one problem, explicit constraints
2. **Adjacent expansion** — similar context, controls already validated, new environment explicitly checked
3. **Broader production** — only after adjacent expansion produces its own demonstrable evidence

### What "adjacent" means
- Workflow similar enough that existing controls remain appropriate
- New repository/environment explicitly validated for readiness
- Ownership and review responsibilities named in advance

---

## Roles and Approval Boundaries
Three roles must stay clearly separated:

| Role | Responsibility | Does NOT do |
|---|---|---|
| **Engineer** | Defines task, provides context, iterates with Codex | Approve their own output for merge |
| **Reviewer** | Evaluates output against acceptance criteria | Grant access or configure environment |
| **Platform owner** | Controls access, permissions, operational boundaries | Make engineering or acceptance decisions |

### Key distinction
- **Approval**, **validation**, and **access** are distinct — none substitutes for another
- Repository read access ≠ merge authority
- Passing tests ≠ reviewer sign-off
- A diff returned ≠ a change merged

---

## Surface and Platform Selection

| Surface | Best for | Governance requirement |
|---|---|---|
| **IDE extension** | Interactive, local work with real-time review | Permitted repos, actions, and identity still defined |
| **CLI** | Terminal-based workflows and scripting | Same — surface choice does not replace permission decisions |
| **Cloud tasks** | Asynchronous, longer-running work | Strongest upfront structure — goal, stop conditions, approved context, named reviewer |

> Selecting a surface determines where interaction occurs.
> Deployment and operations still require explicit permission and control decisions.

---

## Safeguards and Auditability
Every Codex engagement must leave a traceable record answering six questions:

1. **Who** initiated the task?
2. **What** was the request — goal and boundaries?
3. **Which sources** were accessed?
4. **What tools** were called, and what did they return?
5. **What change** was actually made?
6. **Who approved** it — which reviewer, at which checkpoint?

> A diff alone answers only question 5. All six must be linked.

### What counts as a safeguard
- **Restricted actions** — explicit boundaries on what Codex may/may not do
- **Approved sources** — only permitted repositories and connections accessible
- **Stop conditions** — defined points where Codex must pause and return to a human
- **Escalation path** — a named owner who handles unexpected situations

---

## Rollback, Monitoring, and Escalation

### Rollback
- Defined **before** the task runs
- Targets only affected work — valid independent work is preserved
- Has a **named owner** responsible for executing it

### Monitoring signals
- Review demand staying within expected bounds
- Restricted actions absent from logs
- Escalation rate — how often does Codex hit a stop condition?

### Escalation
When Codex encounters something outside approved scope, **who decides what happens next?**
- Must be a named, reachable person with authority to act
- "Engineers will intervene when needed" is not an escalation path

---

## Measuring Value

### Delivery measures
| Measure | What it tells you |
|---|---|
| Review time | Is work moving through review faster, or slower due to quality issues? |
| Rework rate | How often does a Codex-assisted change need significant correction? |
| Cycle time | How long from task start to accepted merge? |

### Feature value measures
| Measure | What it tells you |
|---|---|
| Priority correctness | Are the right features being built? |
| Support acceptance | Does output meet the standard required by reviewers? |

> **Activity ≠ value.**
> A pilot that doubles proposed changes but increases rework and shows no improvement
> in release predictability has not demonstrated delivery value.
