
export const onActivityEnd = (elementApi) => {
  // console.log(">>> activity.end elementApi.id:", elementApi.id);
  if (elementApi.id === "endSkip")
    console.log("!!! endSkip");
    // this.logger.log("!!! endSkip");

  if (elementApi.id === "endProcess")
    console.log("!!! endProcess");
    // this.logger.log("!!! endProcess");
};
