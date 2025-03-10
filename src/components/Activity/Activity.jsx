import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getTime } from "../../utils/date";
import missed from "../../../public/images/missed.png"
import incoming from "../../../public/images/incoming.png"
import outgoing from "../../../public/images/outgoing.png"
import "./styles.css";

const Activity = ({ data }) => {
    const dispatch = useDispatch()
    const titlePreFix = data.direction == "outbound" ? "To" : "From"
    const title = data.direction == "outbound" ? data.to : data.from;
    const icon = data.call_type == 'missed' ? missed : data.direction == 'inbound' ? incoming : outgoing

    const onClick = useCallback(() => {
        dispatch({ type: 'ACTIVITIES_SET_ACTIVE_ITEM', payload: data.id })
    });

    if (data.date)
        return <div className="date-container">
            {data.value}
        </div>
    return <div onClick={onClick} className='activity-box'>
        <div className="image-container">
            <img className="call-image" src={icon}/>
        </div>
        <div className="info-container ">
            <div className="">
                <span>{titlePreFix} </span>
                <strong>
                    {title}
                </strong>
            </div>
            <div className="time-container">
                {getTime(data.created_at)}
            </div>
        </div>
    </div>
};

export default Activity;