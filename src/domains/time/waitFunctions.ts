export async function waitUntil(detect: () => boolean): Promise<void> {
  return new Promise((resolve) => {
    const attempt = () =>
      requestAnimationFrame(() => {
        const ok = detect();
        if (ok) {
          resolve();
          return;
        }
        attempt();
      });

    attempt();
  });
}
