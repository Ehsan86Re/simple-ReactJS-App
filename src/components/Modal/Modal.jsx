import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { getDate } from '../../utils/date';

import axios from 'axios';

const Modal = () => {
    return createPortal(
        <ModalContainer />,
        document.getElementById('modal-root')
    );
}

const ModalContainer = () => {
    const dispatch = useDispatch();
    const activeItem = useSelector(state => state.activities.activeItem);

    const close = () => {
        dispatch({ type: 'ACTIVITIES_SET_ACTIVE_ITEM', payload: null });
    };
    const archive = () => {
        (async () => {
            try {
                let response = await axios.patch(`${API_URL}/activities/${activeItem.id}`, { "is_archived": !activeItem.is_archived })
                if (response.status == 200) {
                    dispatch({ type: activeItem.is_archived ? 'ACTIVITIES_UNARCHIVE_ITEM' : 'ACTIVITIES_ARCHIVE_ITEM', payload: activeItem.id });
                }
                close();
            } catch(e) {
                close();
            }
        })();
    };

    return !!activeItem && <div className='modal-container'>
        <div className='popup-contianer'>
            <div className='modal-header'>
                <div onClick={close} className='close-btn'>X</div>
                <div onClick={archive} className='archive-btn'>{activeItem.is_archived ? 'UnArchive' : 'Archive'}</div>
            </div>
            <div className={'popup-content'}>
                <ul>
                    <li>Call Type: <span>{activeItem.call_type}</span></li>
                    <li>Date: <span>{getDate(activeItem.created_at)}</span></li>
                    <li>Duration: <span>{activeItem.duration}</span></li>
                    <li>From: <span>{activeItem.from}</span></li>
                    <li>To: <span>{activeItem.to}</span></li>
                </ul>
            </div>
        </div>
    </div>
}

export default Modal;
