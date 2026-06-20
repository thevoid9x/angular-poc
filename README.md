# Angular query parser collision reproduction

Minimal Angular 22.0.2 application demonstrating the `hasOwnProperty` query-key collision in
`DefaultUrlSerializer`.

## Local run

```bash
npm install
npm start
```

Open:

```text
http://localhost:4200/?hasOwnProperty=first&later=second
```

The page compares two public APIs:

- `DefaultUrlSerializer.parse()` throws `TypeError: params.hasOwnProperty is not a function`.
- `Router.parseUrl()` catches the parser error, warns in the console, and returns `/`.

The **Run safe control** button proves that an ordinary query-key pair parses normally.

## Vercel deployment

1. Upload all project files to a GitHub repository.
2. Import the repository in Vercel.
3. Vercel reads `vercel.json`, runs `npm run build`, and publishes
   `dist/angular-router-query-repro/browser`.
4. Open the deployed root with `?hasOwnProperty=first&later=second` appended.

No environment variables or external services are required.

## Scope note

This application demonstrates the standard Angular Router scope. The Router catches the exception,
so the visible product behavior is fallback navigation to `/`, not arbitrary code execution. The
stronger initialization failure exists in hybrid AngularJS applications using
`LocationUpgradeModule`; that setup is intentionally excluded to keep this reproduction small.
