import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Activity from '../Activity/Activity.jsx';
import "./styles.css"
import { addDatesToList } from '../../utils/date.js';
import axios from 'axios';

const Activities = ({ tab }) => {
    const dispatch = useDispatch()
    const { loading, list, error } = useSelector(state => state.activities)

    const newList = useMemo(() => {
        return addDatesToList(list.filter(activity => tab == 'inbox' ? !activity.is_archived : activity.is_archived));
    }, [list, tab]);

    const onButton = async () => {
        try {
            if (tab == 'archive') {
                let response = await axios.patch(`${API_URL}/reset`);
                if (response.status == 200) {
                    dispatch({ type: 'ACTIVITIES_RESET_ALL' });
                }
            } else {
                dispatch({ type: 'ACTIVITIES_ARCHIVE_ALL' });
            }
        } catch(e) {}
    };

    let conatiner
    if (loading)
        conatiner = <div className='loading-container'>Loading...</div>
    else if (error)
        conatiner = <div>{error}</div>
    else if (list)
        conatiner = <div>
            {newList.length > 0 && <div onClick={onButton} className='unarchive-all-btn'>
                <div>
                    {tab == 'archive' ? "Unarchive All" : "Archive All"}
                </div>
            </div>}
            {newList.map(activity => <li key={activity.id}>
                <Activity data={activity}/>
            </li>)}
        </div>

    return <ul className='activity-container position-absolute'>
        {conatiner}
    </ul>
}

export default Activities;
