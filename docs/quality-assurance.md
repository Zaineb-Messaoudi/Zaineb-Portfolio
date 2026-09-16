# Portfolio quality assurance

## Automated commands

```powershell
npm run build
npm run test:responsive
npm run test:accessibility
```

The Playwright suite runs against a production Vite preview and uses the installed Chrome browser. It checks:

- 320px iPhone SE-sized screens
- 390px modern phones
- 280px folded-phone closed layouts
- 717px folded-phone open layouts
- 768px tablets
- 1280px laptops
- 1440px desktop
- 1920px TV
- 3840px projector / 4K display
- horizontal overflow
- hero portrait loading
- mobile keyboard navigation
- WCAG 2.0 A/AA and WCAG 2.1 AA axe checks
- EN/FR language switching and document language
- dark mode default behavior

## Production release gate

Run the build first, then run both browser test commands. Do not deploy when either command fails. Review the generated `playwright-report` folder when a browser test fails.

The tests use the locally installed Chrome channel, so CI must provide Chrome or be configured to install a Playwright browser during setup.
