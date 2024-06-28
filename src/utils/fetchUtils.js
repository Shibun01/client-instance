export const fetchUtils = async (url, method = 'GET', body = null) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response;
  };
  