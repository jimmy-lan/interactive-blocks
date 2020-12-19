# Points Panel Component

## Alias

- PointsPanelComponent
- PointsPanelComponent extends [BlockComponent](base-classes/block-component.md)\<[PointsPanel](points-panel/points-panel-model.md),PointsPanelProps\>

## Parent Class

- [BlockComponent](/base-classes/block-component.md)\<T extends Question\<K\>, K extends QuestionProps\>

## Nested View Components

Points Panel Component internally renders [PointsLabelComponent](points-panel/points-label-component.md) and [PointsListComponent](points-panel/points-list-component.md) as child components with additional functionalities and styles.

## Settings

You can specify these settings by assigning to `pointsPanel.settings`.

| Setting          | default     | Type    | Description                                                                              |
| ---------------- | ----------- | ------- | ---------------------------------------------------------------------------------------- |
| listTitle        | "Questions" | String  | Title to pass onto [PointsListComponent](points-panel/points-list-component.md)          |
| showSuccessColor | true        | Boolean | Indicate whether to update panel color to the success color when user obtains all points |

## Accessors

You can access these properties from a question container

```javascript
// Current settings of points panel
pointsPanel.settings;
```

Some accessors overridden from [BlockComponent](/base-classes/block-component.md):

?> **Tips**: Inherited attributes or methods are not always outlined.
Please note that the inheritance information can typically be found at the top of the page.

```javascript
// Html structure of this points panel
pointsPanel.htmlStructure;

// An object mapping element name to a selector which can be used to
// select this element from the DOM
pointsPanel.selectors;
```

## Methods

See [BlockComponent](base-classes/block-component.md).
