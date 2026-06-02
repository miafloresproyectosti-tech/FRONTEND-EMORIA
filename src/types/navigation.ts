export const TAB_VALUES = [
  "dashboard",
  "chat",
  "exercises",
  "emotionalHistory",
  "nearbyPsychologists",
  "settings",
  "profile",
] as const;

export type TabType = (typeof TAB_VALUES)[number];

export type SetActiveTab = (tab: TabType) => void;
