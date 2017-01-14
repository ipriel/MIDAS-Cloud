# MIDAS-Cloud
Cloud service for Arduino-based smart mirror.

### Other Repositories
The code for the Arduino boards themselves can be found [here](https://github.com/ipriel/MIDAS-Arduino)

### Configuration
MIDAS-Cloud requires [Node.js](https://nodejs.org/) v6+ to run.

Install the dependencies, devDependencies, and global dependencies:
```sh
npm run init
```

### Running the server
1. Transpile changes in the source code:
```sh
webpack
```

2. Transpile changes in the source code and then run the server
```sh
npm run deploy
```

3. Run the server without transpiling the source code
```sh
npm start
```

### Bug warning
There is a bug in the awesome-typescript-loader package which leads to the exception

```sh
TypeError: Cannot read property 'exclude' of undefined
```
#### Fix

**Edit the following file:**
~/node_modules/awesome-typescript-loader/dist/instance.js

**Line ~142:** Replace the "applyDefaults" function with the following:

```sh
function applyDefaults(configFilePath, compilerConfig, loaderConfig) {
    _.defaults(compilerConfig.options, {
        sourceMap: true,
        verbose: false,
        skipDefaultLibCheck: true,
        suppressOutputPathCheck: true
    });

    if (loaderConfig.transpileOnly) {
        compilerConfig.options.isolatedModules = true;
    }

    _.defaults(compilerConfig.options, {
        sourceRoot: compilerConfig.options.sourceMap ? process.cwd() : undefined
    });

    _.defaults(loaderConfig, {
        sourceMap: true,
        verbose: false,
    });

    delete compilerConfig.options.outDir;
    delete compilerConfig.options.inlineSourceMap;
    delete compilerConfig.options.outFile;
    delete compilerConfig.options.out;
    delete compilerConfig.options.noEmit;
}
```