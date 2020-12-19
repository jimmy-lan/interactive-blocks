# Examples: Fill in the Blanks

## Regular Fill in the Blanks

<!-- tabs:start -->

#### **JS**

```javascript
const regularFillBlanks = new FillBlanks({
  id: "fb1",
  question:
    "What is the ultimate answer to life, the universe, and everything?",
  acceptableAnswers: ["forty two", "forty-two", "42"],
});
new FillBlanksComponent(
  document.getElementById("regular-fb"),
  regularFillBlanks
).render();
```

#### **HTML**

```html
<div id="regular-fb"></div>
```

<!-- tabs:end -->

<div id="regular-fb"></div>

## Case Sensitive Fill in the Blanks

<!-- tabs:start -->

#### **JS**

```javascript
const caseSensitiveFillBlanks = new FillBlanks({
  id: "fb2",
  question:
    "What is the ultimate answer to life, the universe, and everything?",
  acceptableAnswers: ["forty two", "forty-two", "42"],
  // Note the following line
  caseSensitive: true,
});
new FillBlanksComponent(
  document.getElementById("case-sensitive-fb"),
  caseSensitiveFillBlanks
).render();
```

#### **HTML**

```html
<div id="case-sensitive-fb"></div>
```

<!-- tabs:end -->

<div id="case-sensitive-fb"></div>

## Hinting Number of Characters

<!-- tabs:start -->

#### **JS**

```javascript
const hintNumCharsFillBlanks = new FillBlanks({
  id: "fb3",
  question:
    "What is the ultimate answer to life, the universe, and everything?",
  acceptableAnswers: ["forty two", "forty-two"],
  // Note the following line
  hintNumChars: true,
});
new FillBlanksComponent(
  document.getElementById("hint-num-chars-fb"),
  hintNumCharsFillBlanks
).render();
```

#### **HTML**

```html
<div id="hint-num-chars-fb"></div>
```

<!-- tabs:end -->

<div id="hint-num-chars-fb"></div>

## Using External API

<!-- tabs:start -->

#### **JS**

```javascript
const externalApiFillBlanks = new FillBlanks({
  id: "fb4",
  question:
    "What is the ultimate answer to life, the universe, and everything?",
  checkAnswer: (userInput) => {
    // Simulate API requests
    return new Promise((resolve) => {
      setTimeout(() => {
        const correctAnswers = ["forty two", "forty-two"];
        // Note that this results in case-sensitive checking
        resolve(correctAnswers.includes(userInput.trim()));
      }, 3000);
    });
  },
  // We can still hint number of characters to the user.
  // Except this time, we will need to pass in the number of
  // characters manually
  hintNumChars: 9,
  // Why not add some hints as well?
  hint: `Have you read "The Hitchhiker's Guide to the Galaxy by Douglas Adams" before?`,
});
new FillBlanksComponent(
  document.getElementById("external-api-fb"),
  externalApiFillBlanks
).render();
```

#### **HTML**

```html
<div id="external-api-fb"></div>
```

<!-- tabs:end -->

<div id="external-api-fb"></div>

<script>
const { FillBlanks, FillBlanksComponent } = Blocks;
// Regular
const regularFillBlanks = new FillBlanks({
  id: "fb1",
  question:
    "What is the ultimate answer to life, the universe, and everything?",
  acceptableAnswers: ["forty two", "forty-two", "42"],
});
new FillBlanksComponent(
  document.getElementById("regular-fb"),
  regularFillBlanks
).render();
// Case sensitive
const caseSensitiveFillBlanks = new FillBlanks({
  id: "fb2",
  question:
    "What is the ultimate answer to life, the universe, and everything?",
  acceptableAnswers: ["forty two", "forty-two", "42"],
  // Note the following line
  caseSensitive: true
});
new FillBlanksComponent(
  document.getElementById("case-sensitive-fb"),
  caseSensitiveFillBlanks
).render();
// Hint num chars
const hintNumCharsFillBlanks = new FillBlanks({
  id: "fb3",
  question:
    "What is the ultimate answer to life, the universe, and everything?",
  acceptableAnswers: ["forty two", "forty-two"],
  hintNumChars: true,
});
new FillBlanksComponent(
  document.getElementById("hint-num-chars-fb"),
  hintNumCharsFillBlanks
).render();
// Hint num chars
const externalApiFillBlanks = new FillBlanks({
  id: "fb4",
  question:
    "What is the ultimate answer to life, the universe, and everything?",
  checkAnswer: (userInput) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const correctAnswers = ["forty two", "forty-two"];
        resolve(correctAnswers.includes(userInput.trim()));
      }, 3000);
    });
  },
  hintNumChars: 9,
  hint: `Have you read "The Hitchhiker's Guide to the Galaxy by Douglas Adams" before?`,
});
new FillBlanksComponent(
  document.getElementById("external-api-fb"),
  externalApiFillBlanks
).render();
</script>
