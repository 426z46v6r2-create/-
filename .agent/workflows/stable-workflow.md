---
description: Stable Workflow & Guardrails for Yafit Shimon Touati project
---

# Antigravity Work Boundaries - Yafit Shimon Touati

As an agent operating on this project (specifically Gemini 3 Flash context), you must follow these strict guardrails to maintain site stability and minimize errors.

### 1. No Full Autonomy
- **Planning Mode**: Every new task MUST start with a 3–7 step plan.
- **Approval Required**: You MUST wait for explicit USER approval before executing any code changes, refactors, or bundle switches.

### 2. Fixed Baseline
- **Baseline Version**: **December 24, 2025**.
- **Main Script**: `assets/index-MeVdLpLX-v7.js`
- **Main CSS**: `assets/index-BVrhfsOn.css`
- **Constraint**: Do not mix files or code from other versions/days without explicit confirmation.

### 3. Focused, Small Changes
- **Scope**: Perform exactly one focused change per task. 
- **No Extra Edits**: Do not touch unrelated files "along the way" for improvements unless explicitly planned.

### 4. Verification Before Commit
- **Local Serve**: Always run `python3 -m http.server` (or similar) to test.
- **Visual Check**: Describe what is visible on the Home and relevant pages.
- **Quality Gate**: Check for broken layouts, cut-off text, or console errors.
- **Commit**: perform a single, small commit only after successful verification.

### 5. Supervised Restores/Rollbacks
- **No Auto-Rollbacks**: Do not perform automatic "smart restores" that touch multiple files.
- **Explanation**: If a rollback is needed, explain the timing, affected files, and what data/work will be lost. Wait for approval.

### 6. Preservation Zones
- **Legal/Accessibility**: Do not modify legal texts, accessibility statements, privacy policies, or terms of use without a specific request.
- **Structure**: Do not change main navigation, footers, or existing URL slugs without explicit instruction.

---

### Workflow per Request:
1. **Clarify**: Restate the objective and success criteria.
2. **Plan**: List 3–7 steps. Wait for approval.
3. **Implement**: Execute only approved changes.
4. **Verify**: Serve locally, check browser, describe visual state.
5. **Commit**: Small commit + confirmation that the baseline remains intact.
