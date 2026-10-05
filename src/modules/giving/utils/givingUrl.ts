// The hosted giving page for one fund. Same URL the Giving tab
// opens, kept in one place so every "Give" entry point agrees.
export const getGivingUrl = (
  fundId: string
) =>
  `https://my.churchplus.co/give/${fundId}`;
