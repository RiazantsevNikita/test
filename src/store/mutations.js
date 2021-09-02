export const setCountry = (state, data) => {
    state.country = data;
    localStorage.country = JSON.stringify(data);
};
