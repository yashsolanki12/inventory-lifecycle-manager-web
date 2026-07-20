import React from "react";
import { Link, useLocation } from "react-router";

const SafeLink = React.forwardRef(({ to, exclude = [], children, ...props }, ref) => {
  const { search } = useLocation();

  let targetTo = to;
  if (typeof to === "string" && (to.startsWith("/") || to.startsWith("app"))) {
    const [path, existingSearch] = to.split("?");
    const mergedParams = new URLSearchParams(search);

    if (existingSearch) {
      const toParams = new URLSearchParams(existingSearch);
      toParams.forEach((value, key) => {
        mergedParams.set(key, value);
      });
    }

    if (Array.isArray(exclude)) {
      exclude.forEach((key) => mergedParams.delete(key));
    }

    const mergedSearch = mergedParams.toString();
    targetTo = mergedSearch ? `${path}?${mergedSearch}` : path;
  }

  return (
    <Link ref={ref} to={targetTo} {...props}>
      {children}
    </Link>
  );
});

SafeLink.displayName = "SafeLink";

export default SafeLink;
