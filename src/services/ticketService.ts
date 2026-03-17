import { Ticket, Comment } from "../types";

const STORAGE_KEY = 'police_it_tickets';

export const getTickets = (): Ticket[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Initial mock data
    const initial: Ticket[] = [
      {
        id: 'TKT-1001',
        officerName: 'Sgt. James Wilson',
        department: 'Central Precinct',
        contactEmail: 'j.wilson@police.gov',
        category: 'Network',
        priority: 'High',
        deviceType: 'Desktop',
        description: 'Main server connection dropping intermittently during dispatch.',
        status: 'Open',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        comments: [],
        history: [{ date: new Date().toISOString(), action: 'Ticket Created', user: 'System' }]
      },
      {
        id: 'TKT-1002',
        officerName: 'Officer Sarah Chen',
        department: 'Traffic Division',
        contactEmail: 's.chen@police.gov',
        category: 'Hardware',
        priority: 'Medium',
        deviceType: 'Laptop',
        description: 'Patrol car laptop screen flickering.',
        status: 'In Progress',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        assignedTo: 'IT Tech Miller',
        comments: [],
        history: [{ date: new Date().toISOString(), action: 'Assigned to Tech Miller', user: 'Admin' }]
      },
      {
        id: 'TKT-1003',
        officerName: 'Det. Robert Miller',
        department: 'Cyber Crimes',
        contactEmail: 'r.miller@police.gov',
        category: 'Access',
        priority: 'Critical',
        deviceType: 'Workstation',
        description: 'Cannot access evidence database with new credentials.',
        status: 'Escalated',
        createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
        comments: [],
        history: [{ date: new Date().toISOString(), action: 'Escalated to Level 2 Support', user: 'IT Tech Smith' }]
      },
      {
        id: 'TKT-1004',
        officerName: 'Officer Mike Ross',
        department: 'K9 Unit',
        contactEmail: 'm.ross@police.gov',
        category: 'Software',
        priority: 'Low',
        deviceType: 'Mobile',
        description: 'Reporting software needs update.',
        status: 'Closed',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        resolutionNotes: 'Software updated to v4.2.0 remotely.',
        comments: [],
        history: [{ date: new Date().toISOString(), action: 'Resolved and Closed', user: 'IT Tech Jones' }]
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to parse tickets from storage", e);
    return [];
  }
};

export const getTicketById = (id: string): Ticket | undefined => {
  return getTickets().find(t => t.id === id);
};

export const saveTicket = (ticket: Omit<Ticket, 'id' | 'createdAt' | 'status' | 'history' | 'comments'>): Ticket => {
  const tickets = getTickets();
  const newTicket: Ticket = {
    ...ticket,
    id: `TKT-${1000 + tickets.length + 1}`,
    status: 'Open',
    createdAt: new Date().toISOString(),
    comments: [],
    history: [{ date: new Date().toISOString(), action: 'Ticket Created', user: 'System' }]
  };
  const updated = [newTicket, ...tickets];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newTicket;
};

export const updateTicket = (id: string, updates: Partial<Ticket>): void => {
  const tickets = getTickets();
  const updated = tickets.map(t => {
    if (t.id === id) {
      let historyEntry = null;
      
      if (updates.status && updates.status !== t.status) {
        historyEntry = { date: new Date().toISOString(), action: `Status changed to ${updates.status}`, user: 'IT Officer' };
      } else if (updates.assignedTo && updates.assignedTo !== t.assignedTo) {
        historyEntry = { date: new Date().toISOString(), action: `Assigned to ${updates.assignedTo}`, user: 'IT Officer' };
      } else if (updates.rootCause) {
        historyEntry = { date: new Date().toISOString(), action: `Root cause identified: ${updates.rootCause}`, user: 'IT Officer' };
      }

      return { 
        ...t, 
        ...updates,
        history: historyEntry ? [...(t.history || []), historyEntry] : t.history
      };
    }
    return t;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const addComment = (ticketId: string, comment: Omit<Comment, 'id' | 'createdAt'>): void => {
  const tickets = getTickets();
  const updated = tickets.map(t => {
    if (t.id === ticketId) {
      const newComment: Comment = {
        ...comment,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };
      return {
        ...t,
        comments: [...(t.comments || []), newComment]
      };
    }
    return t;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const updateTicketStatus = (id: string, status: Ticket['status']): void => {
  updateTicket(id, { status });
};
