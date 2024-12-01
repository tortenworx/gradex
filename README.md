<p align="center">
  <img src="apps/api/docs/images/Logo.svg" width="200" alt="GradeX logo" />
</p>
<p align="center">
A Web-based Report Card System for Students and Faculty Members
</p>

## Research Introduction
The online grading system is a crucial and modern tool for viewing students' grades in my schools and universities. The Web Based Report Card System simplifies the process of maintaining and accessing academic records for both teachers and students offering a solution. Students no longer need to go through steps like submitting requests, waiting in queues, or dealing with other hassle tasks as they can easily check their grades online whenever they want. Student portal services provide users with easy access to the information and resources needed for their studies (Hussain et al., 2018). Acting as a tool, the portal improves communication between students and their teachers about grades and streamlines tasks. It significantly reduces paperwork by allowing input of grades into the system and automating digital versions of Report Card or Form 138.

Traditional grading systems have always been a hassle for both students and teachers when it comes to processing grades. When records management is paper based, it becomes difficult for students and faculty staff to make record requests or process them in a timely manner (Scribbles, 2022). Outdated methods create stress for students as they face difficulties that could impact application deadlines or other urgent matters. Manually maintaining grade records is a process, prone to mistakes and inefficient adding complexity to the academic journey.

The online report card system streamlines the grading process reducing mistakes enhancing precision and speeding up grade distribution. It eliminates the frustration of students who require access to records. The shift to an automated system has helped faculty and administrative personnel devote more time to important educational activities rather than getting bogged down with processing grades and related work (Clarin, 2020). Additionally, the platform enables students to request copies of their grades in an organized way, which is beneficial for those applying to schools or needing records for official purposes. Through the digitization and automation of these services the portal ensures grading practices are consistent and transparent.

## Project Description
This is the main monorepo of the system which contains both the Nest.js backend and the Next.js frontend. Instructions on how to run and install are listed below

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app for the frontend
- `api`: a [Nest.js](https://nestjs.com/) REST API backend
- `@repo/ui`: a stub React component library meant to be used by `web`, currently unused due to typescript errors.
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
