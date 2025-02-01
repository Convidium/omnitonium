const fetchData = async (queryType, value) => {
    const response = await fetch(`/api/data?queryType=${queryType}&value=${value}`);
    const data = await response.json();
    return data;
};

export default fetchData;