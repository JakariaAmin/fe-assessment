This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Information

```bash
node: 20.11.1
npm 10.2.4

Used:
ES6
Redux-Observable epic
```

The assessment pdf suggested to use: https://developers.google.com/maps/documentation/places/webservice/autocomplete for autocomplete results, which is for server. For client the option is: https://developers.google.com/maps/documentation/javascript/places but it's not mentioned in assessment.
But due to google's policy and cors issue, the client can't (officially) call this api. It needs to be called a server.
So I implemented this api call in one of my personal apache server, set up a laravel backend calling this api from there to provide results.

## Getting Started

.env.local file containing google map key is separately shared.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Requirements

Assessment objective: For candidates to demonstrate coding ability with react & redux.

Requirement: To design a simple single page & use google place autocomplete to find places & show on the map. Compulsory to meet below:
1. Text box must be an autocomplete action & get result from this API 
   https://developers.google.com/maps/documentation/places/webservice/autocomplete
2. If you’re unable to use google autocomplete, please create mock data instead
3. Must use redux to store result & display all searches user has tried
4. Use any combination of below with redux:
   1. Redux Thunk
   2. Redux Promise
   3. Redux Saga
   4. Redux-Observable Epics
5. For UI, please use Ant Design to make simple & user friendly page based on your creativity -> https://ant.design/components/overview/
6. Code construct is a must. Use the best approach to manage folders, codes, naming & ensure scalability 

Usage of the following is advantageous
1. ES6
2. High order components
3. Redux-Observable epic


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
