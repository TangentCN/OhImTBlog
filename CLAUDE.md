## Project Context

This is a personal static blog (Astro 7 + Tailwind CSS v4). Read **PROJECT.md** for the full project archive: background, user profile, tech stack, history, current progress, and roadmap.

Key facts about the user: a **Chinese-speaking CS student with no prior frontend experience**, learning-oriented (wants to understand the code, not just ship it). Communicate in 简体中文; explain concepts using this project's real code before making changes; proceed in verifiable stages.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Version Control

This project is managed with git. The agreed workflow:

- Commit after each completed development phase, so every milestone is recoverable.
- Before starting a phase, run `git status` to confirm the working tree state.
- Write clear commit messages describing what the phase delivered.

## Local Ports

Dev server runs on fixed ports (configured in `astro.config.mjs`):

- dev server: `45231`
- preview: `45232`

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
