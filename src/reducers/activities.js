const initialState = {
    list: [],
    loading: true,
    activeItem: null
};

export default function invite_screen(state = initialState, action) {
    if (action.type == "ACTIVITIES_SET_LIST") {
        return { ...state, 'list': action.payload.data, loading: false }
    } else if (action.type == "ACTIVITIES_SET_ACTIVE_ITEM") {
        return { ...state, 'activeItem': state.list.find(item => item.id == action.payload) }
    } else if (action.type == "ACTIVITIES_RESET_ALL") {
        let new_list = [...state.list].map(item => {
            item.is_archived = false
            return item
        })
        return { ...state, list: new_list }
    } else if (action.type == "ACTIVITIES_ARCHIVE_ALL") {
        let new_list = [...state.list].map(item => {
            item.is_archived = true
            return item
        })
        return { ...state, list: new_list }
    } else if (action.type == "ACTIVITIES_ARCHIVE_ITEM") {
        let new_list = [...state.list].map(item => {
            if (item.id == action.payload) {
                item.is_archived = true
            }
            return item
        })
        return { ...state, list: new_list }
    } else if (action.type == "ACTIVITIES_UNARCHIVE_ITEM") {
        let new_list = [...state.list].map(item => {
            if (item.id == action.payload) {
                item.is_archived = false
            }
            return item
        })
        return { ...state, list: new_list }
    } else {
        return state;
    }
}
