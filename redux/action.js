export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user
})
export const addVocabulary = (english, vietnamese) => ({
    type: 'ADD_VOCABULARY',
    payload: { english, vietnamese },
});

export const deleteVocabulary = (id) => ({
    type: 'DELETE_VOCABULARY',
    payload: id,
})
