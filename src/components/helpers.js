export const redirectToLogin = () => {
    sessionStorage.setItem('redirectURL', window.location.pathname);
    window.location.href = process.env.PUBLIC_URL + '/login';
  };
  
  export const formatNumber = (number) => {
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };
  
  export const isJSONValid = (jsonString) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  
  export const validateToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) redirectToLogin();
      const response = await fetch(process.env.REACT_APP_API_URL_VALIDAR_TOKEN, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.valid==false) redirectToLogin();
      return token;
    } catch (error) {
      console.error('Erro ao validar o token:', error);
      return false;
    }
  };
  