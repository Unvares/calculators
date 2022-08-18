# Calculators
## Demo
https://unvares.github.io/calculators/

## Description
Do you want to calculate something? Just use this app to do it. \
The app is developed on React.js and contains artificially congested mock server. Congestion makes server to give responses away only once in 3 seconds.

There are 4 default calculators:
1) Triangle Surface
2) Square Surface
3) Rectangle Surface
4) Circle Diameter

However, you can [add your own](#how-to-add-new-calculator) calculator as well.

## Quick Start
The project uses Node.js and Webpack, so:
1) Download the project
2) Run `npm install`
3) Run `npm run dev`
4) Have fun

If you want to create a build, run `npm run build`. It will appear in `dist/` folder in the root.

## How to add new calculator?
Visual data is stored in [data.json](https://github.com/Unvares/calculators/blob/master/server/data.json). \
Calculation functions are stored in [calcFuncrions.js](https://github.com/Unvares/calculators/blob/master/server/calcFunctions.js).

### Step-by-step guide
1) add an object to `data.json`:
```
{
  title: "Type calculator title",
  inputs: ["here", "we", "write", "titles", "for", "input", "fields"],
  formula: "Type formula here"
}
```
And don't worry about the letter case. The program automatically converts to the right one.

2) add the calculation function to the `calcFunctions.js`:
```
[write, input, titles, in, the, same, order] => /* your calculations */;
```


**Important!** The object in data.json and the function in calcFunctions.js must have the same index in their arrays.

### Why visual and calculation data are separated?
Visual data is used by the app, whereas calculation data is used by the server. We avoid import of redundant data by separating them.
