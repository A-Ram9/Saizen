# SAIZEN — Personal Fitness "Level-Up" App

A personal app that turns diet and gym goals into daily quests, XP and levels (an
anime-style "you are levelling up" experience, with original names and art — no
characters, names or logos from any existing anime). It tracks food and workouts,
calculates calories precisely, and projects where my progress is heading.

## Stack (do not substitute)
- Backend: ASP.NET Core Web API on **.NET 10 (LTS)**, C#, controller-based APIs
- Database: PostgreSQL via EF Core + Npgsql.EntityFrameworkCore.PostgreSQL, code-first migrations
- Frontend: **Angular** (latest stable), standalone components, signals, Reactive Forms,
  Angular Router, HttpClient
- Animation: GSAP (incl. SplitText) for text; Angular route animations for page transitions
- Charts: ngx-charts or Chart.js (pick one, don't mix)
- Food data: USDA FoodData Central API (key from api.data.gov), called ONLY from the backend

## Repo layout
```
/Saizen.Api        .NET 10 Web API (Controllers, Services, Data, Dtos, Entities)
/Saizen.Api.Tests  xUnit tests for calculation services
/saizen-web        Angular app (features/, core/, shared/)
```

## Design system
- Colours: PLUM `#381932` (primary / dark backgrounds), MILK `#FFF3E6` (text on plum,
  light surfaces). Derive tints/shades from these two only; define them as CSS variables.
- Fonts: display = "Anton" (Google Fonts), body = "Inter". Headings are HUGE
  (hero 6–9rem, section titles 3–4rem, using clamp()).
- Text motion: headings animate in with GSAP SplitText (chars/words stagger, slight
  rise + fade). Numbers (calories, XP) count up. Level-up = full-screen flash + title reveal.
- Loaders: full-screen plum loader with a rotating motivating line
  ("Discipline is the shortest path.", "One more rep.", etc. — write original lines).
- Transitions: an animated transition between every main section (route change),
  max ~600ms so the app still feels fast.
- Respect `prefers-reduced-motion`: replace motion with simple fades.
- Desktop-first layout.

## Features (MVP)
1. **Profile / onboarding**: age, sex, height (cm), weight (kg), activity level, goal
   (lose / maintain / gain), target weight.
2. **Targets** (backend `NutritionCalculator` service):
   - BMR: Mifflin-St Jeor. TDEE = BMR × activity factor.
   - Calorie target from goal; protein/fat/carb targets in grams.
   - Safety bounds: never suggest intake below BMR, and cap weekly change at
     ~0.5–1% of body weight. Show a warning instead of an extreme target.
3. **Food log**: meals = Breakfast, Lunch, Dinner, Snack. Search food (backend proxies
   FoodData Central), choose amount in grams, store calories + macros per entry.
   Cache looked-up foods in our DB to reduce API calls.
4. **Workout log**: exercise, sets, reps, weight; estimated calories burned (MET-based).
5. **Quests & levelling**: daily quests generated from targets (hit protein, stay in
   calorie range, complete workout, log all meals). XP per quest, levels with rising XP
   thresholds, ranks E → D → C → B → A → S, streak counter.
6. **Dashboard**: today's calories in/out vs target, macros, quests, level/XP bar.
7. **Progress & projection** ("where am I headed"):
   - Phase 1 (deterministic): 7-day moving average of weight, linear regression trend,
     projected date to reach target weight, adherence %.
   - Phase 2 (optional AI): a "Coach" endpoint that sends a summary of the last 14 days
     to the Claude API and returns 3 short, specific recommendations.

## Rules
- All calculations happen in the backend; the frontend only displays results.
- Metric units everywhere; round only for display.
- Every calculation service has xUnit tests (BMR, TDEE, macros, XP/levels, projection).
- API keys live in .NET user-secrets / environment variables — never in code or the
  Angular app, never committed.
- DTOs for all API input/output; never return EF entities directly.
- Single user for now (no auth); keep a `UserId` column so auth can be added later.

## How to work (Claude Code)
- Do ONE phase per session, only the phase I name. Don't start the next phase.
- No sub-agents, no repo-wide audits. Touch only the files the phase needs.
- Don't add libraries beyond this file without asking me first.
- After each phase: tell me the exact commands to run and what I should see.

## Build phases
1. Scaffold: solution, API project, test project, Angular app, PostgreSQL connection, CORS, health endpoint.
2. Design system: CSS variables, fonts, GSAP text animation directive, loader, route transitions.
3. Profile + NutritionCalculator + tests + onboarding screen.
4. Food log: FoodData Central proxy, food cache, meal entry screens, daily totals.
5. Workout log + calories burned.
6. Quests, XP, levels, ranks, streaks + level-up animation.
7. Dashboard + progress charts + projection.
8. (Optional) AI Coach via Claude API.
