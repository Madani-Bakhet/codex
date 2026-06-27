<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI Agent Entry Point & Instructions

**CRITICAL DIRECTIVE:** Before writing, analyzing, or modifying any code in this repository, you **MUST** read the following files in this exact chronological order. Failure to do so will result in hallucinations, scope creep, and architectural violations.

1. `project-overview.md`
2. `ui-conventions.md`

## Behavioral Guardrails
- **No Scope Creep:** Do not hallucinate features outside the strict boundaries defined in the `project-overview.md`.
- **Respect Invariants:** Do not violate the architectural invariants (like strict static Next.js exports) defined in `architecture.md`.
- **UI Consistency:** Always refer to `ui-tokens.md` and `ui-registry.md` before building new components to ensure consistency and prevent duplicates.
- **Maintain State:** Always check and update `progress-tracker.md` to understand the current context and phase of the build.

**DO NOT PROCEED WITH ANY TASK UNTIL THESE FILES ARE INGESTED.**