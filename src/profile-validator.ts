type UserProfile = {
  id: number;
  username: string;
  settings?: {
    notifications?: boolean;
  };
};

const userWithoutSettings: UserProfile = {
  id: 1,
  username: "stephen",
};

const userWithSettingsNoNotifications: UserProfile = {
  id: 2,
  username: "grace",
  settings: {},
};

const userWithNotifications: UserProfile = {
  id: 3,
  username: "daniel",
  settings: { notifications: true },
};

function isNotified(user: UserProfile): boolean {
  return user.settings?.notifications ?? false;
}

console.log(userWithoutSettings.username, "no settings:", isNotified(userWithoutSettings));
console.log(userWithSettingsNoNotifications.username, "settings, no notifications:", isNotified(userWithSettingsNoNotifications));
console.log(userWithNotifications.username, "notifications on:", isNotified(userWithNotifications));