type SchedulerWithPostTask = {
  postTask?: (
    callback: () => void,
    options?: { priority?: "background" | "user-visible" | "user-blocking" }
  ) => Promise<unknown>;
};

export function runBackgroundTask(task: () => void) {
  if (typeof window === "undefined") return;

  const schedulerApi = (window as Window & { scheduler?: SchedulerWithPostTask })
    .scheduler;
  if (schedulerApi?.postTask) {
    void schedulerApi.postTask(task, { priority: "background" });
    return;
  }

  window.setTimeout(task, 0);
}
