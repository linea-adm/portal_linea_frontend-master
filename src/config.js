// Configura o objeto de configuração
var config = {
    url: process.env.REACT_APP_LDAP_HOST,
    baseDN: process.env.REACT_APP_LDAP_BASE_DN,
    username: process.env.REACT_APP_LDAP_USERNAME, 
    password: process.env.REACT_APP_LDAP_PASSWORD
};
