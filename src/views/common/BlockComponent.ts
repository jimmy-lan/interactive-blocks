/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 * Description: An abstract representation of an interactive block component.
 */

import { BlockModel } from "../../models";
import {
  ComponentsMap,
  EventsMap,
  ModelChangeEventOptions,
} from "../../commonTypes";
import { Component } from "./Component";

export abstract class BlockComponent<T extends BlockModel<K>, K>
  implements Component {
  protected components: { [key: string]: Element } = {};
  /**
   * An object mapping name to component selector for key elements
   * in this BlockComponent.
   */
  get selectors(): Object {
    return {};
  }

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  // Life cycle methods
  componentDidRender(): void {}
  componentWillRender(): void {}

  /**
   * Return a string with html syntax that represents this view component.
   */
  abstract get htmlStructure(): string;

  /**
   * Bind model to this view component so that the view component rerender
   * itself whenever the model changes.
   */
  bindModel = (): void => {
    this.model.on("change", (changedProps, options) => {
      if (options) {
        const { shouldRerender } = options as ModelChangeEventOptions;
        if (!shouldRerender) {
          return;
        }
      }
      this.rerender(changedProps as Partial<K>);
    });
  };

  /**
   * Obtain a map of events in this view component.
   * Descriptor (i.e. p, object key) of event maps in view components must
   * follow the following syntax:
   * - Begin with a selector to an HTMLElement.
   * - Follow by a column (:).
   * - End by the event type to register. The event type to register is one of the DOM events.
   */
  eventsMap(): EventsMap {
    return {};
  }

  /**
   * Bind events to this view component using the eventsMap in this object.
   * @param fragment Document fragment corresponding to this view component.
   */
  bindEvents = (fragment: DocumentFragment): void => {
    const eventsMap = this.eventsMap();
    for (let descriptor in eventsMap) {
      // This check is to ensure that there is no unexpected
      // prototype change on the eventsMap object, which can lead
      // to hard-to-find issues.
      if (!eventsMap.hasOwnProperty(descriptor)) {
        throw new Error(
          "Unexpected prototype change in eventsMap. Please " +
            "always provide a callback function for each event descriptor!"
        );
      }

      // The descriptor is in the format <selector>:<eventType> for view
      // components.
      const [selector, eventType] = descriptor.split(":");

      // This check ensures that selector and eventType are not undefined.
      if (!selector || !eventType) {
        throw new Error(
          "Descriptor, or key of the eventsMap object, " +
            "must be in the format 'selector:eventType'!"
        );
      }

      fragment.querySelectorAll(selector).forEach((element: Element) => {
        element.addEventListener(eventType, eventsMap[descriptor]);
      });
    }
  };

  /**
   * A map of child components in the view component.
   * A ComponentsMap must follow the following format:
   * - Keys correspond to names of child components
   * - Values correspond to selectors of child components
   */
  componentsMap(): ComponentsMap {
    return {};
  }

  mapComponents = (fragment: DocumentFragment): void => {
    const componentsMap = this.componentsMap();

    for (let key in componentsMap) {
      // Ensure no unexpected prototype change
      if (!componentsMap.hasOwnProperty(key)) {
        throw new Error("Unexpected prototype change in componentsMap!");
      }

      // Translate selector to actual component and store it
      const selector = componentsMap[key];
      const component = fragment.querySelector(selector);
      if (!component) {
        throw new Error(
          `Cannot find component using selector ${selector} when working with key name ${key}.`
        );
      }
      this.components[key] = component;
    }
  };

  bindComponents(): void {}

  /**
   * Method triggered when the model changes.
   * @param changedProps
   */
  rerender = (changedProps: Partial<K>): void => {
    this.render();
  };

  /**
   * Render the component by appending it to the parent component.
   * @param disableClean Boolean value to indicate whether to clean all
   *    children elements of the parent before this component is
   *    appended. Defaults to false.
   */
  render = (disableClean: boolean = false): void => {
    // Clean up parent area
    if (!disableClean) {
      this.parent.innerHTML = "";
    }

    // Call life-cycle method
    this.componentWillRender();

    // Create template element to host html for this component
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.htmlStructure;

    this.bindEvents(templateElement.content);
    this.mapComponents(templateElement.content);
    this.bindComponents();

    // Call life-cycle method
    this.componentDidRender();

    // Append template element to parent
    this.parent.appendChild(templateElement.content);
  };
}
