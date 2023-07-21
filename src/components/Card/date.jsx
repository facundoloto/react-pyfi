// export const timeAgo = (date) => {
//     const seconds = Math.floor((new Date() - date) / 1000);
  
//     let interval = Math.floor(seconds / 31536000);
//     if (interval > 1) {
//       return interval + ' years ago';
//     }
  
//     interval = Math.floor(seconds / 2592000);
//     if (interval > 1) {
//       return interval + ' months ago';
//     }
  
//     interval = Math.floor(seconds / 86400);
//     if (interval > 1) {
//       return interval + ' days ago';
//     }
  
//     interval = Math.floor(seconds / 3600);
//     if (interval > 1) {
//       return interval + ' hours ago';
//     }
  
//     interval = Math.floor(seconds / 60);
//     if (interval > 1) {
//       return interval + ' minutes ago';
//     }
  
//     if(seconds < 10) return 'just now';
  
//     return Math.floor(seconds) + ' seconds ago';
//   };

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