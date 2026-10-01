export function formatEventDate(isoString: string | null): string {
  if (!isoString) return 'To be announced';
  
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'To be announced';

    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    }).format(date);
  } catch {
    return 'To be announced';
  }
}

export function formatDotDate(isoString: string | null): string {
  if (!isoString) return 'TBA';
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' })
    .format(new Date(isoString))
    .replace(/\//g, '.');
}

export function formatClock(isoString: string | null): string {
  if (!isoString) return '--:--';
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false })
    .format(new Date(isoString));
}
