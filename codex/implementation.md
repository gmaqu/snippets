# Codex Implementation Capstone: Building Real-World Solutions

## The Scenario — Meridian Service Desk
- Fictional company needing an automated ticket priority assignment engine
- You implement `assign_priority()` inside an existing Python codebase
- Output: one of `critical`, `high`, `medium`, or `low`
- **Core constraint:** Do not change file structure, function signatures, or anything outside designated scope

---

## Environment Setup
| Requirement | Detail |
|---|---|
| Codex access | Must be a compliant, authorized environment |
| Python version | 3.10 or higher |
| Project folder | Work only inside the designated folder |
| Extra packages | Not permitted — use existing dependencies only |

---

## File Structure
| File | Purpose | Modifiable? |
|---|---|---|
| `triage.py` | Main module — your implementation goes here | Yes |
| `ACCEPTANCE_CRITERIA` | Business rules — source of truth | No |
| `test_triage.py` | Existing test suite — must pass unchanged | No |
| `data/` | Sample ticket data | No |

---

## Structured Codex Prompting
A strong prompt contains four elements:
1. **Goal** — what you want to achieve
2. **Context** — relevant files, constraints, rules
3. **Output** — exactly what you expect back
4. **Boundaries** — what Codex must not do

### Iteration flow:
1. Ask Codex to **plan** its approach first
2. Then **implement**
3. Then do a **code review pass**

---

## The Four Priority Rules (applied in strict order)
1. **Manual override** — if already set by a human, return it as-is
2. **Company outage** — if active outage, return `critical`
3. **Blocked status** — if ticket is `blocked`, return `high`
4. **Aging rule** — if open for 24+ hours, return `high`; otherwise `medium` or `low`

> The first matching rule wins. Always validate input before any rule runs.

---

## Meaningful Regression Tests
You need at least **two new tests**:

### 1. Boundary condition — _exactly_ 24 hours
```python
def test_aging_boundary_exactly_24_hours():
    ticket = {
        "manual_priority": None,
        "company_outage": False,
        "status": "open",
        "age_hours": 24
    }
    assert assign_priority(ticket) == "high"
```

### 2. Edge case — invalid input
```python
def test_invalid_input_missing_field():
    ticket = {
        "company_outage": False,
        "status": "open",
        "age_hours": 10
        # manual_priority field is missing
    }
    with pytest.raises(ValueError):
        assign_priority(ticket)
```

---

## Self-Review Checklist
- [ ] Run the **full test suite** — all pre-existing tests must still pass
- [ ] Read failure messages carefully — investigate *why*, not just *what*
- [ ] Use Codex for a **targeted review pass** against acceptance criteria
- [ ] Manually trace invalid input cases through your function

---

## Engineering Handoff Document
| Section | Content |
|---|---|
| Customer recommendation | Plain-language summary of what was built |
| Codex collaboration log | Key prompts, outputs, and reasoning at each step |
| Test results | Full test run record — all tests passing |
| Pilot value explanation | What the feature delivers and how success is measured |

---

## Final Submission Checklist
- [ ] `triage.py` with implementation and new tests
- [ ] Complete handoff report (all four sections)
- [ ] Evidence of a passing test run (actual output, not from memory)

### Verify before submitting:
- **Completeness** — all three components present
- **Reproducibility** — clean Python 3.10+ environment produces same results
- **Compliance** — no modified test files, no extra packages, no changed signatures
