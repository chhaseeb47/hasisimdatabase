export interface SearchResult {
  success: boolean;
  data?: any;
  message?: string;
}

export const searchSimDetails = async (mobileNumber: string): Promise<SearchResult> => {
  try {
    const url = `https://famofcfallxd.serv00.net/apis/famdata.php?num=${encodeURIComponent(mobileNumber)}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        data: data
      };
    } else {
      return {
        success: false,
        message: data.message || 'Search failed'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred'
    };
  }
};

export const incrementCounter = () => {
  const currentCount = parseInt(localStorage.getItem('siteUsage') || '0');
  const newCount = currentCount + 1;
  localStorage.setItem('siteUsage', newCount.toString());
  return newCount;
};

export const getCounter = () => {
  return parseInt(localStorage.getItem('siteUsage') || '0');
};

export const getActiveUsers = () => {
  // Simulate active users between 1-50
  return Math.floor(Math.random() * 50) + 1;
};
