import { User, PTORequest, PTOBalance } from './types';

const STORAGE_KEYS = {
  USER: 'pto_user',
  USERS_LIST: 'pto_all_users',
  REQUESTS: 'pto_requests',
  RECIPIENTS: 'pto_email_recipients',
  LAST_DIGEST: 'pto_last_digest_sent',
};

const DEFAULT_USERS: User[] = [
  {
    id: 'u1',
    name: 'Alex Rivera',
    email: 'alex.rivera@company.com',
    role: 'Employee',
    hireDate: '2022-03-15',
    jobTitle: 'Senior Engineer',
  },
  {
    id: 'u2',
    name: 'Eleanor Vance',
    email: 'eleanor@flccmail.com',
    role: 'Manager',
    hireDate: '2021-01-10',
    jobTitle: 'Operations Director',
  }
];

const DEFAULT_RECIPIENTS = ['eleanor@flccmail.com'];

const DEFAULT_REQUESTS: PTORequest[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: 'Alex Rivera',
    startDate: '2024-05-10',
    endDate: '2024-05-12',
    type: 'Full Day',
    hours: 16,
    status: 'Approved',
    reason: 'Family trip',
    createdAt: new Date().toISOString(),
  }
];

export class PersistenceManager {
  static getUser(): User {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    if (data) return JSON.parse(data);
    const user = DEFAULT_USERS[0];
    this.setUser(user);
    return user;
  }

  static setUser(user: User) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  static getAllUsers(): User[] {
    const data = localStorage.getItem(STORAGE_KEYS.USERS_LIST);
    if (!data) {
        localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
    }
    return JSON.parse(data);
  }

  static getRecipients(): string[] {
    const data = localStorage.getItem(STORAGE_KEYS.RECIPIENTS);
    return data ? JSON.parse(data) : DEFAULT_RECIPIENTS;
  }

  static saveRecipients(emails: string[]) {
    localStorage.setItem(STORAGE_KEYS.RECIPIENTS, JSON.stringify(emails));
  }

  static getLastDigestSent(): string | null {
    return localStorage.getItem(STORAGE_KEYS.LAST_DIGEST);
  }

  static setLastDigestSent(isoString: string) {
    localStorage.setItem(STORAGE_KEYS.LAST_DIGEST, isoString);
  }

  static updateUserRole(userId: string, role: 'Employee' | 'Manager') {
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index].role = role;
      localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(users));
      const currentUser = this.getUser();
      if (currentUser.id === userId) {
        this.setUser(users[index]);
      }
    }
  }

  static getRequests(): PTORequest[] {
    const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    return data ? JSON.parse(data) : DEFAULT_REQUESTS;
  }

  static saveRequest(req: PTORequest) {
    const requests = this.getRequests();
    requests.unshift(req);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  }

  static updateRequestStatus(id: string, status: 'Approved' | 'Denied', managerNote?: string, isFavor?: boolean) {
    const requests = this.getRequests();
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
      requests[index].status = status;
      if (managerNote !== undefined) requests[index].managerNote = managerNote;
      if (isFavor !== undefined) requests[index].isFavor = isFavor;
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    }
  }

  static calculateBalances(user: User, requests: PTORequest[]): PTOBalance {
    const hireDate = new Date(user.hireDate);
    const now = new Date();
    const weeksSinceHire = Math.floor((now.getTime() - hireDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
    let totalAccrued = weeksSinceHire * 1.54;
    const currentYear = now.getFullYear();
    const anniversaryThisYear = new Date(hireDate);
    anniversaryThisYear.setFullYear(currentYear);
    const hasPassedAnniversary = now > anniversaryThisYear;
    const used = requests
      .filter(r => r.userId === user.id && r.status === 'Approved')
      .reduce((sum, r) => sum + r.hours, 0);
    let available = totalAccrued - used;
    if (hasPassedAnniversary) {
      const weeksSinceAnniversary = Math.floor((now.getTime() - anniversaryThisYear.getTime()) / (1000 * 60 * 60 * 24 * 7));
      available = weeksSinceAnniversary * 1.54; 
      totalAccrued = used + available;
    }
    return {
      accrued: totalAccrued,
      used: used,
      available: available,
      lastResetYear: hasPassedAnniversary ? currentYear : currentYear - 1
    };
  }
}