# DLS Component Library

Accessible React component library: The goal was to recreate a reusable component library from recovered unit tests, with a focus on correctness, accessibility, and developer experience.

---

## Technology Choices

### Vite
I went with Vite mainly because it’s quick to set up and the dev server feels much faster compared to older setups like Create React App. Since this was a small project and I wanted to iterate quickly, Vite made that really easy.

### Vitest
Since the project is using Vite, Vitest felt like a straightforward choice. It works out of the box with the same config, so there’s less setup involved. It’s also very similar to Jest, which made it easy to work with.

### React Testing Library
I used React Testing Library because it focuses on testing how the component behaves from a user’s perspective. The provided tests already follow that approach (clicking buttons, checking visibility), which made it a good fit and kept the tests aligned with real usage.

### TypeScript
I used TypeScript because it makes the component API clearer and safer for consumers.

### Accordion state approach
For managing the accordion state, I used the `Children.map` and `cloneElement` pattern to pass `index`, `isExpanded`, and `onToggle` down to each `AccordionItem`.

I considered using React Context, but for this use case it felt a bit unnecessary. Since the component structure is simple and not deeply nested, this approach kept things easier to follow without adding extra layers.

---

## Accordion Component API

### `<Accordion>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | required | `AccordionItem` components |
| `shouldAllowMultipleExpanded` | `boolean` | `true` | Allow multiple panels open simultaneously |
| `defaultExpandedIndexes` | `number[]` | `[]` | Panels open on initial render |

### `<AccordionItem>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | required | Button label for the panel header |
| `children` | `ReactNode` | required | Panel content |
| `isDisabled` | `boolean` | `false` | Disables the panel toggle button |

> `index`, `isExpanded`, and `onToggle` are injected automatically by the parent `Accordion` — you don't need to pass these manually.

### Basic usage

```tsx
import { Accordion, AccordionItem } from './components/Accordion';

<Accordion>
  <AccordionItem title="What is this?">
    A reusable accordion component.
  </AccordionItem>
  <AccordionItem title="Can I expand multiple?">
    Yes, by default multiple panels can be open at once.
  </AccordionItem>
</Accordion>
```

### Single expansion mode

```tsx
<Accordion shouldAllowMultipleExpanded={false}>
  <AccordionItem title="Section one">Content one</AccordionItem>
  <AccordionItem title="Section two">Content two</AccordionItem>
</Accordion>
```

### With a panel open by default

```tsx
<Accordion defaultExpandedIndexes={[0]}>
  <AccordionItem title="Already open">This panel starts expanded.</AccordionItem>
  <AccordionItem title="Closed">This one starts closed.</AccordionItem>
</Accordion>
```

---

## Accessibility

The Accordion is built to meet WAI-ARIA authoring practice guidelines for the accordion pattern:

- Each trigger is a `<button>` inside a heading (`<h3>`)
- `aria-expanded` reflects the current state of each panel
- `aria-controls` on each button points to the corresponding panel `id`
- Each panel has `role="region"` and `aria-labelledby` pointing back to its button
- The `hidden` attribute is used rather than conditional rendering, so `aria-controls` always resolves to an element in the DOM
- Disabled panels use both `disabled` and `aria-disabled`

---

## Future Improvements

These are areas I would address given more time:

**Prettier**
Add a `.prettierrc` config and integrate it with ESLint via `eslint-config-prettier` to avoid rule conflicts. Formatting should be automatic and never something a developer has to think about.

**Stricter ESLint rules**
The current ESLint config is minimal. I'd add `eslint-plugin-jsx-a11y` for accessibility linting at the authoring stage, and `eslint-plugin-react-hooks` to enforce the rules of hooks.

**Husky + lint-staged**
Pre-commit hooks that run ESLint and Prettier only on staged files. Keeps the main branch clean without slowing down the full test suite on every commit.

---

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

### Run tests

```bash
npm run test:run
```

### Run tests in watch mode

```bash
npm run test
```


## Test Results
✓ src/components/Accordion/Accordion.test.tsx (7 tests)
✓ renders accordion with multiple panels
✓ shows content for the clicked panel and hides the rest
✓ hides content when an expanded panel is clicked again
✓ can expand multiple panels at the same time by default
✓ when shouldAllowMultipleExpanded is false
✓ only one panel is visible at a time
✓ accessibility
✓ each button has aria-controls pointing to its content region
✓ content regions have aria-labelledby pointing back to their header
Test Files  1 passed (1)
Tests       7 passed (7)
