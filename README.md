# Calculators
## Demo
https://unvares.github.io/calculators/

## Description
Do you want to calculate something? Just use this app to do it. \
The app is developed on React.js and contains artificially "congested" mock server. Congestion makes server to give away responses only once in 3 seconds.

By default there are the following calculators:
1) Triangle Surface
2) Square Surface
3) Rectangle Surface
4) Circle Diameter

But you can [add your own](#how-to-add-new-calculator) calculator as well.

## Quick Start
The project is created using Node.js and Webpack.
1) Download the project
2) Run `npm install`
3) Run `npm run dev`
4) Have fun _(link to the localhost will appear in the console)_

_P.S. If you want to create the build, run `npm run build`. It will appear in `dist/` folder in the root._

## How to add new calculator?
Visual data is stored in [data.json](https://github.com/Unvares/calculators/blob/master/server/data.json). \
Calculation functions are stored in [calcFuncrions.js](https://github.com/Unvares/calculators/blob/master/server/calcFunctions.js).

### Why separated?
Visual data is sent to the app on request but calculation data is needed only on the server.

### Do the following:
1) add an object to `data.json`:
```
{
  title: "Type the title as a string",
  inputs: ["each", "element", "is", "a", "name", "of", "an", "input", "field"],
  formula: "Type your formula here"
}
```
_P.S. Don't worry about letter case. The program automatically converts to the right one._

2) add the calculation function to the `calcFunctions.js`:
```
[the, same, order, as, in, inputs, object, in, datajson] => /* your calculations */;
```


**Important! Your calculator should have the same index in both files**.
