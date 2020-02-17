# Attendit

Attendit is a [SPA](https://en.wikipedia.org/wiki/Single-page_application) for exploring and booking events, at least for now.

## Why?

I use Attendit as a demo to learn fullstack development using best practices and latest technologies. I tried to choose things that I am less comfortable with, _like GraphQL over REST, mongoDB Atlas over Firebase, or even yarn over npm_, just for the sake of learning. I am trying my best to achieve best approaches, so I am always open for advices and suggestions.

<a href="https://www.mongodb.com/">
<img width="32" alt="mongoDB" src="https://unpkg.com/simple-icons@latest/icons/mongodb.svg" />
</a>

<a href="https://www.typescriptlang.org/">
<img width="32" alt="Typescript" src="https://unpkg.com/simple-icons@latest/icons/typescript.svg" />
</a>

<a href="https://sass-lang.com/">
<img width="32" alt="Sass" src="https://unpkg.com/simple-icons@latest/icons/sass.svg" />
</a>

<a href="https://classic.yarnpkg.com/">
<img width="32" alt="Yarn v1" src="https://unpkg.com/simple-icons@latest/icons/yarn.svg" />
</a>

<a href="https://nodejs.org/">
<img width="32" alt="Node.js" src="https://unpkg.com/simple-icons@latest/icons/node-dot-js.svg" />
</a>

<a href="https://graphql.org/">
<img width="32" alt="GraphQL" src="https://unpkg.com/simple-icons@latest/icons/graphql.svg" />
</a>

<a href="https://reactjs.org/">
<img width="32" alt="React" src="https://unpkg.com/simple-icons@latest/icons/react.svg" />
</a>

<a href="https://www.apollographql.com/">
<img width="32" alt="Apollo GraphQL" src="https://cdn.jsdelivr.net/gh/apollographql/space-kit/logos/mark.svg" />
</a>

<a href="https://jestjs.io/">
<img width="32" alt="Jest" src="https://unpkg.com/simple-icons@latest/icons/jest.svg" />
</a>

<a href="https://jwt.io/">
<img width="32" alt="JWT" src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/jsonwebtokens.svg" />
</a>


[_see more..._](https://github.com/YoussefRaafatNasry/attendit/network/dependencies)

## Start

This repository is structured as a [monorepo](https://en.wikipedia.org/wiki/Monorepo) using [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/), to start both `server` and `client`, use the following command, after populating the environment files using `.env.example` as a guide:

```shell
yarn install
yarn start
```

## Commits Tagging

```yml
[GLOBAL]: changes made to repository or to root workspace
[SERVER]: changes made to server module
[CLIENT]: changes made to client module
```

---

> **Acknowledgments:**  
> This project was initially inspired by [@academind](https://github.com/academind/)'s [tutorial](https://github.com/academind/yt-graphql-react-event-booking-api), _yet the code might be **totally different** due to using different tools, packages and approaches._
