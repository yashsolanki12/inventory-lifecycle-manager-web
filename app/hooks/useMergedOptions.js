import React from "react";

const useMergedOptions = (options, value, multiple) => {
  return React.useMemo(() => {
    const optSet = new Set(options);
    const result = [...options];
    if (multiple && Array.isArray(value)) {
      value.forEach((v) => {
        if (!optSet.has(v)) result.unshift(v);
      });
    } else if (!multiple && value && !optSet.has(value)) {
      result.unshift(value);
    }
    return result;
  }, [options, value, multiple]);
};

export default useMergedOptions;
