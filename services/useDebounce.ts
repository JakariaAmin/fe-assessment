import GlobalConfig from "@/utils/globalConfig";

// Custom debounce function to delay api call.
const debounce = (func: Function, wait: number = GlobalConfig.debounceDuration) => {
  let timerId: NodeJS.Timeout | undefined;

  return (...args: any) => {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

export default debounce;
