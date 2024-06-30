
const TokenFromPersist = () => {
    const getToken = localStorage.getItem("persist:root")
    const jsonData = JSON.parse(getToken)
    const parsedAuthJson = JSON.parse(jsonData.auth);
    const token = parsedAuthJson.token;
    return token;
};

export default TokenFromPersist;
