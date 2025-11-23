# Visual Editor Shell

A React 18 + Vite workspace that seeds the upcoming visual editor and prompt generator product experience. The previous demo UI was replaced with a clean foundation that ships routing, layout, theming, global state, and the dependencies required for canvas and prompt tooling work.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173 to explore the Visual Editor and Prompt Generator placeholder flows. The scaffold also supports:

- `npm run build` – production bundle
- `npm run lint` – ESLint with React/Vite presets
- `npm run test` – Vitest (headless, zero-config)
- `npm run preview` – serve the production build

## Project structure

```
src/
  app/            # App shell, routes, layout, theme, providers
  components/     # Reusable UI widgets (navigation, feedback, etc.)
  features/
    visual-editor/
    prompt-generator/
    misc/         # Shared/utility feature views (404, etc.)
  services/       # HTTP clients and integrations
  store/          # Global Zustand store prepared for editor/generator data
```

- React Router 6 powers navigation between the Visual Editor and Prompt Generator pages.
- Material UI + custom theme + CSS baseline manage styling.
- Zustand centralizes workspace, editor, and generator state with helpers to add more slices later.
- The layout ships a sidebar/topbar combo plus Suspense-driven loading fallback and an error boundary for resilience.
- `react-dnd` and the HTML5 backend are wired into global providers for future canvas interactions.
- Code transformation libraries (`@babel/parser`, `recast`) and Axios are installed to support the editor’s parsing and networking needs.

## Next steps

Use the `features` directory to iterate on domain-specific flows (canvas, prompt lab, settings, etc.). Keep shared UI/presentation elements inside `components`, long-lived processes under `services`, and cross-feature state/actions inside `store`.
