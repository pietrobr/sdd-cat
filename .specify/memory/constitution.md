<!--
  Sync Impact Report
  ==================
  Version change: N/A → 1.0.0 (initial ratification)
  Modified principles: N/A (first version)
  Added sections:
    - Core Principles (5 principles)
    - Technology Stack & Constraints
    - Deployment & CI/CD Workflow
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ compatible (no changes needed)
    - .specify/templates/spec-template.md ✅ compatible (no changes needed)
    - .specify/templates/tasks-template.md ✅ compatible (no changes needed)
    - .specify/templates/checklist-template.md ✅ compatible (no changes needed)
    - .specify/templates/agent-file-template.md ✅ compatible (no changes needed)
  Follow-up TODOs: none
-->

# SDD-Cat Constitution

## Core Principles

### I. Static-First
Every page and asset MUST be a static resource (HTML, CSS, JavaScript,
images). No server-side rendering, no backend APIs hosted by the project.
Dynamic data (e.g., cat images) MUST be fetched client-side from public
third-party APIs or served from static JSON files bundled at build time.
Rationale: a static site minimizes attack surface, cost, and operational
complexity on Azure Static Web Apps.

### II. Infrastructure as Code (Idempotent & Testable)
All Azure infrastructure MUST be defined declaratively in Bicep files
stored in the repository. Deployments MUST be idempotent: running the
same deployment twice MUST produce an identical resource state with no
errors or side-effects. Infrastructure code MUST be validated before
every deployment via `az bicep lint` and `az deployment group what-if`.
CI pipelines MUST execute these validation steps as a mandatory gate
before any actual deployment. Rationale: idempotency and pre-flight
validation prevent configuration drift and reduce deployment failures.

### III. Anonymous Access (NON-NEGOTIABLE)
The application MUST NOT require any form of user authentication or
authorization. Azure Static Web Apps built-in auth MUST be explicitly
disabled or restricted so that all routes are publicly accessible
without login. No identity provider integration, no login pages, no
session management. Rationale: the app is a public cat gallery with no
user-specific data.

### IV. Azure PaaS Only
The application MUST be hosted exclusively on Azure Static Web Apps
(PaaS). No virtual machines, no containers, no custom servers. All
supporting resources (e.g., CDN, DNS) MUST use Azure managed services.
Resource provisioning MUST go through Bicep templates (see Principle II).
Rationale: PaaS reduces operational overhead and aligns with the
static-first approach.

### V. Simplicity & YAGNI
Start with the minimal viable static site that displays cat images.
No unnecessary abstractions, no premature optimization, no speculative
features. Every addition MUST be justified by a concrete user story.
Complexity MUST be explicitly justified in the implementation plan.
Rationale: a small scope keeps delivery fast and quality high.

## Technology Stack & Constraints

- **Frontend**: HTML5, CSS3, vanilla JavaScript (or a lightweight
  framework only if justified by a user story).
- **Hosting**: Azure Static Web Apps (Free or Standard tier).
- **IaC**: Azure Bicep, deployed via Azure CLI (`az deployment`).
- **CI/CD**: GitHub Actions with the official Azure Static Web Apps
  deploy action.
- **Data source**: Public cat API (e.g., TheCatAPI) or static JSON
  bundled at build time.
- **Authentication**: Disabled. The `staticwebapp.config.json` MUST
  include a route rule blocking the `/.auth/*` path to prevent
  accidental auth enablement.
- **Item size**: N/A (no database). If future features require
  Cosmos DB, the 2 MB item limit MUST be respected per attached
  Azure Cosmos DB instructions.

## Deployment & CI/CD Workflow

1. **Pull Request** — triggers `az bicep lint` and
   `az deployment group what-if` (dry-run). Build the static site
   and run any front-end tests.
2. **Merge to main** — triggers idempotent infrastructure deployment
   (`az deployment group create`) followed by static site deployment
   via the SWA GitHub Action.
3. **Rollback** — re-run the previous successful deployment commit;
   Bicep idempotency guarantees safe re-application.
4. **Environment parity** — staging and production MUST use the same
   Bicep templates with environment-specific parameter files.

## Governance

This constitution supersedes all other development practices for the
SDD-Cat project. All pull requests and code reviews MUST verify
compliance with these principles. Amendments require:

1. A documented proposal describing the change and its rationale.
2. An update to this file with incremented version per SemVer:
   - MAJOR: principle removal or backward-incompatible redefinition.
   - MINOR: new principle or materially expanded guidance.
   - PATCH: clarifications, typo fixes, non-semantic refinements.
3. Propagation check across all `.specify/templates/` files to ensure
   consistency with updated principles.

**Version**: 1.0.0 | **Ratified**: 2026-02-22 | **Last Amended**: 2026-02-22
