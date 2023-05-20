import { Fragment, cloneElement } from "react";

const SPANNABLE_ELEMENT_TYPES = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
]);

const spanifyString = (string, className) => {
  const words = string.trim().split(/\s+/u);

  // The text of these spans should be static. If
  // we add some sort of dynamic text, we'll need
  // a different key strategy.
  /* eslint-disable react/no-array-index-key */
  return words.map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span className={className}>{word}</span>{" "}
    </Fragment>
  ));
  /* eslint-enable react/no-array-index-key */
};

const spanifyComponent = (component, className) => {
  if (typeof component === "string") {
    // String is all whitespace or empty
    if (!component.trim().length) {
      return component;
    }

    return spanifyString(component, className);
  }

  if (SPANNABLE_ELEMENT_TYPES.has(component.type)) {
    const { children } = component.props;

    if (typeof children === "string") {
      return cloneElement(
        component,
        undefined,
        spanifyString(children, className)
      );
    }

    return cloneElement(
      component,
      undefined,
      children.map((child) => spanifyComponent(child, className))
    );
  }

  return component;
};

const spanifyReactChildren = (WrappedComponent, className) => {
  const SpanifiedComponent = ({ children, ...props }) => {
    const newChildren = children
      .map((child) => spanifyComponent(child, className))
      .map((child, index) => cloneElement(child, { key: index }));

    return <WrappedComponent {...props}>{newChildren}</WrappedComponent>;
  };

  return SpanifiedComponent;
};

export default spanifyReactChildren;
