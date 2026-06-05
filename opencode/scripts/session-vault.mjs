export function selectVisibleSessions(index) {
  return [...(index.sessions || [])].sort((a, b) => String(b.updated_at ?? '').localeCompare(String(a.updated_at ?? '')));
}

export function classifySearch(sessions, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [...sessions];
  return sessions.filter(session =>
    `${session.title ?? ''} ${session.workspace ?? ''} ${session.status ?? ''}`.toLowerCase().includes(q),
  );
}
