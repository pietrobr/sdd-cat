# Tasks: Cat Gallery App

**Input**: Design documents from `/specs/001-cat-gallery-app/`
**Prerequisites**: plan.md (required), spec.md (required)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project directory structure (src/, src/css/, src/js/, src/images/, infra/, infra/parameters/)
- [x] T002 [P] Create .gitignore with standard web + Azure patterns
- [x] T003 [P] Create staticwebapp.config.json with auth blocking and routing rules in src/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T004 [US2] Create infra/main.bicep with Azure Static Web App resource definition
- [x] T005 [P] [US2] Create infra/parameters/dev.bicepparam with dev environment parameters
- [x] T006 [P] [US2] Create infra/parameters/prod.bicepparam with prod environment parameters

**Checkpoint**: Infrastructure templates ready — site development can begin

---

## Phase 3: User Story 1 + User Story 4 — Cat Gallery + Anonymous Access (Priority: P1)

**Goal**: Visitors see a responsive grid of cat images without any authentication

**Independent Test**: Open site URL → see 12+ cat images in a responsive grid, no login prompt

### Implementation

- [x] T007 [US1] Create src/index.html with page structure, noscript message, grid container
- [x] T008 [P] [US1] Create src/css/style.css with responsive grid layout (mobile/tablet/desktop breakpoints)
- [x] T009 [P] [US1] Create src/images/cat-placeholder.svg as fallback image
- [x] T010 [US1] Create src/js/app.js with TheCatAPI fetch, grid rendering, load-more, error handling
- [x] T011 [US4] Verify staticwebapp.config.json blocks /.auth/* routes (already done in T003, verify)

**Checkpoint**: Cat gallery fully functional with anonymous access

---

## Phase 4: User Story 2 — Idempotent Infrastructure Deploy (Priority: P2)

**Goal**: Bicep deploy can be run multiple times with identical results

### Validation

- [x] T012 [US2] Validate infra/main.bicep passes `az bicep lint`
- [x] T013 [US2] Validate infra/main.bicep passes `az bicep build` (compilation check)

**Checkpoint**: Infrastructure is validated and idempotency-ready

---

## Phase 5: User Story 3 — CI/CD Pipeline (Priority: P3)

**Goal**: Automated validation on PR, automated deploy on merge to main

### Implementation

- [x] T014 [US3] Create .github/workflows/ci.yml — PR validation (bicep lint, what-if, site build check)
- [x] T015 [US3] Create .github/workflows/cd.yml — Deploy on merge (bicep deploy + SWA deploy)

**Checkpoint**: Full CI/CD pipeline ready

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [x] T016 [P] Verify all files are consistent and complete
- [x] T017 [P] Validate HTML structure is well-formed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 directory structure
- **US1+US4 (Phase 3)**: Depends on Phase 1 (needs staticwebapp.config.json from T003)
- **US2 (Phase 4)**: Depends on Phase 2 (needs Bicep files)
- **US3 (Phase 5)**: Depends on Phase 2 + Phase 3 (needs infra + site)
- **Polish (Phase 6)**: Depends on all previous phases

### Parallel Opportunities

- T002 and T003 can run in parallel (different files)
- T005 and T006 can run in parallel (different parameter files)
- T008 and T009 can run in parallel (CSS and SVG)
- T016 and T017 can run in parallel (independent validation)
