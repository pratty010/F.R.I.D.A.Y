import { test, expect } from 'bun:test';
import { classifySearch, selectVisibleSessions } from '../session-vault.mjs';

const FIXTURE = {
  sessions: [
    { id: 'ses_1', title: 'Fix installer', workspace: '/a', status: 'active', updated_at: '2026-06-05T10:00:00.000Z' },
    { id: 'ses_2', title: 'Brand review', workspace: '/b', status: 'archived', updated_at: '2026-06-04T10:00:00.000Z' },
  ],
};

test('selectVisibleSessions sorts recent first', () => {
  expect(selectVisibleSessions(FIXTURE)[0].id).toBe('ses_1');
});

test('classifySearch filters by title and workspace', () => {
  const result = classifySearch(FIXTURE.sessions, 'installer');
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('ses_1');
});
