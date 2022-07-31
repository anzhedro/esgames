export interface UserInfo {
  name: string,
  avatar: number,
  lastRoom: string,
}

function loadUserInfo(): UserInfo | null {
  const info = localStorage.getItem('user');
  return info ? JSON.parse(info) : null;
}

function saveUserInfo(user: UserInfo): void {
  localStorage.setItem('user', JSON.stringify(user));
}

export { loadUserInfo, saveUserInfo };
