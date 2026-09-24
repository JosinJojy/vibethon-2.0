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
