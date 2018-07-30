![logo](leaf.png)
# Plant
CLI for quick, opinionated creation of typescript projects.

After finding myself going through the same process of creating and modifying boilerplates over and over again, I have
reached a conclusion that I'm wasting too much of my time on **bootstrapping** projects, rather than working on them:
Whether it's because of tools which require too much configuration (such as babel or webpack) or tools which "opinions"
differ from mine (such as create-react-app) which I then have to hack upon.

That's where `plant` comes into play - this is a tool that's like a macro runner more than anything else: it has a very
clear and extensible DSL that handles everything from basic i/o operations to domain-specific actions, such as `npm install`.

Feel free to contribute by either PRing, forking, altering and adding different macros and recipes.

## Install
Install globally using npm:

`$ npm install -g plant-cli`

## Usage
Create an empty project directory, and within it run the following command:

`$ plant [recipe]`

Where `[recipe]` is the name of the foundation from which you want to create your project. This is an
optional parameter, and if omitted, defaults to `vanilla` - which is the most basic project.

## Available Recipes
The following recipes are built in and ready to use out of the box:

- **vanilla**: Basic zero-conf typescript project, which initializes a git repo and uses jest for testing

- **express**: Express-only application which utilizes json as body parser

- **react-component**: React component library that is not a standalone project

- **react-express**: Fullstack React & Express application with typescript, jest and sass modules

- **react.-component**: React application with typescript, jest and sass modules

- **react**: React application with typescript, jest and sass modules


## Extending `plant`
`plant` DSL is composed of the following groups of entities:

- `utils`: basic, un-opinionated operations (e.g: readFile)
- `actions`: domain-specific atomic operations (e.g npmInstall)
- `fragments`: composition of actions that serve a specific purpose (e.g add express to project)
- `recipes`: composition of fragments which produce a working boilerplate project

Adding a util, an action or a fragment is straight forward - just look at the existing code and add your own in the same flavour.

Recipes, on the other hand, have some "magic" regarding their implementation:

`plant` recognizes everything in the `recipes` directory as a recipe, its name being its filename. As it addresses recipes
by name, recipe files should maintain the `RecipeType` interface (found in `recipe.ts`) where they export two functions:

1. `recipe(): Promise<void>` - the recipe routine that is called by the recipes runner and either resolves or aborts using the `terminate()` util.

2. `description(): string` - a description of the recipe, used to compose this README file.

Refer to one of the existing recipes for examples.

## Contribution
Contributions are welcome! If you want to submit a pull request, please do.

###### icon designed by good-ware from flaticon.com
