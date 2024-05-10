export function formatDate(date: Date): string {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = diffInMilliseconds / (1000 * 60);
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  if (diffInMinutes < 1) {
    return 'just now';
  } else if (diffInHours < 1) {
    return `${Math.floor(diffInMinutes)}m`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h`;
  } else if (diffInDays < 3) {
    return `${Math.floor(diffInDays)}d`;
  } else {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero based
    const year = date.getFullYear();
    return `${month < 10 ? '0' + month : month}/${
      day < 10 ? '0' + day : day
    }/${year}`;
  }
}
