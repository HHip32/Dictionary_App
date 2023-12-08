const initState = {
    data: {
        id: '',
        username: '',
        password: '',
        english: [],
        vietnamese: []
    }

}


export const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                data: action.payload

            };
        case 'ADD_VOCABULARY':

            return {
                ...state,
                data: {
                    ...state.data,
                    english: [...state.data.english, action.payload.english],
                    vietnamese: [...state.data.vietnamese, action.payload.vietnamese]
                }

            };
        case 'DELETE_VOCABULARY':
            const updatedEnglish = state.data.english.filter(item => item.id !== action.payload);
            const updatedVietnamese = state.data.vietnamese.filter(item => item.id !== action.payload);
            return {
                ...state,
                data: {
                    ...state.data,
                    english: updatedEnglish,
                    vietnamese: updatedVietnamese
                }
            }
        default:
            return state;
    }
}