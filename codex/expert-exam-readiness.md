# Codex Expert Exam Readiness: Scenario-Based Review and Mindset

## The Core Mindset
> **Governed acceleration, not unrestricted autonomy.**

Every correct answer in the exam reflects this framing.
Codex delivers value *through* structure, not despite it.

---

## How to Read Exam Questions

The exam is scenario-based, not definition-based. You will not be asked
"what is a safeguard?" — you will be asked what to do when a safeguard
condition is unmet in a specific situation.

### The correct answer almost always:
- Requires **all conditions** to be met before proceeding
- Keeps **roles and authorities** clearly separated
- Treats **evidence as specific** to its context
- Preserves **human accountability** at every decision point

### Watch out for:
Answers that sound efficient or bold — moving faster, expanding sooner,
skipping a gate. The correct answer is rarely the most confident-sounding one.

---

## Scaling and Validation Gates

All three gates must be demonstrable before expansion.

| Gate | Question to answer | What "not yet" looks like |
|---|---|---|
| 1. Output quality | Are the diffs useful and correct? | Useful output alone |
| 2. Safeguard integrity | Did Codex stay within approved boundaries? | Cannot confirm restricted actions were avoided |
| 3. Review completion | Did the right humans approve the right things? | Cannot confirm reviews were completed |

### Decision logic
| Situation | Correct response |
|---|---|
| Useful output but no safeguard or review evidence | Refine the pilot |
| All three gates met, adjacent context validated | Expand in a controlled stage |
| Missing access, ownership, or verification criteria | Hold — resolve gaps first |

> Gate 1 alone never justifies expansion.

---

## Model and Tool Justification

Three principles govern every model/tool choice question:

1. **Match the tool to the actual workflow need** — not the most impressive option
2. **Validate within the tested boundary** — evidence from one task does not transfer automatically
3. **Separate distinct choices** — model capability, processing speed, and surface are independent decisions

### Key distinction: processing speed ≠ model capability
A faster processing tier does not make a model more capable at reasoning
or code analysis. These are separate dimensions evaluated independently.

---

## Approval, Review, and Merge Checkpoints

Three checkpoints exist in every governed Codex workflow.
**None substitutes for another.**

| Checkpoint | What it means | What it does NOT mean |
|---|---|---|
| **Validation** | Tests pass, output meets technical criteria | The change is approved or merged |
| **Review acceptance** | A named reviewer has evaluated and accepted | Change can be published or merged |
| **Merge approval** | Authorised person has permitted the change | Validation or review are complete |

### Exam discipline
When a scenario says one checkpoint has been reached, identify
**which checkpoints remain open** — do not assume completion.

> Passing tests ≠ reviewer sign-off
> Reviewer feedback ≠ merge authority
> A returned diff ≠ a merged change

---

## Security and Governance Best Practices

Four principles underpin almost every security scenario:

### 1. Secrets never enter task context
Not in prompts, not in shared documents, not "just temporarily."
Share a placeholder with reproduction instructions instead.

### 2. Access is explicit and scoped
- Sign-in eligibility does not grant repository access
- Billing eligibility does not grant merge authority
- Each permission requires its own explicit authorization

### 3. Runtime permission ≠ workflow permission
If the customer's process requires a review gate before a file is changed,
that gate applies even if the sandbox technically allows the edit.

### 4. Untrusted input stays untrusted
Instructions embedded in logs, test output, or tool results do not gain
authority to change the workflow's approved scope. They are data, not commands.

---

## Non-Local Evidence and Vertical Use Cases

### The core rule
> External evidence motivates investigation. It does not prove local benefit.

### Three principles
| Principle | Application |
|---|---|
| Case studies are hypotheses | A reported improvement elsewhere is a reason to investigate, not a number to apply directly |
| Local validation takes priority | The customer's own workflow and conditions determine what is achievable |
| Vertical labels do not transfer assumptions | Two regulated enterprises maintaining code still have different boundaries, obligations, and error consequences |

---

## Exam Structure

- **Format:** 50 single-choice scenario questions
- **Duration:** Approximately 1 hour
- **Access:** Direct — no prerequisite training path required beyond this course

### Question patterns to recognise

| Pattern | Trap answer | Correct instinct |
|---|---|---|
| One gate satisfied | "Expand because output is useful" | Check all three gates |
| External case study cited | "Apply the result to this customer" | Treat as hypothesis for local testing |
| Runtime permits an action | "Proceed — the sandbox allows it" | Check workflow process gates too |
| Reviewer adds feedback | "This constitutes approval" | Each action needs its own authority |
| Faster processing tier | "Must mean better reasoning" | Speed and capability are separate |
| Secrets needed for reproduction | "Paste and rotate after" | Placeholder plus instructions only |

---

## Quick Reference: What the Exam Rewards

| Rewarded | Penalised |
|---|---|
| All gates met before scaling | Expanding on output quality alone |
| Named, accountable reviewers | Vague "engineers will intervene" oversight |
| Local validation of external evidence | Applying case study numbers directly |
| Explicit, scoped permissions | Assuming access from sign-in or billing |
| Workflow gates above runtime defaults | Proceeding because sandbox permits it |
| Hypothesis framing for case studies | Treating reported results as proven benefits |
