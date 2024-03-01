export const timeAgo = (createdAt) => {
  const currentTime = new Date();
  const uploadedAt = new Date(createdAt);
  const timeDifference = currentTime - uploadedAt;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  let elapsedTime = '';

  if (weeks > 0) {
    elapsedTime = `${weeks}w`;
  } else if (days > 0) {
    elapsedTime = `${days}d`;
  } else if (hours > 0) {
    elapsedTime = `${hours}m`;
  } else if (minutes > 0) {
    elapsedTime = `${minutes}s`;
  }
  else {
    elapsedTime = `${seconds}s`;
  }

  return elapsedTime;
};