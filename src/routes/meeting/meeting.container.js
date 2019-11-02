import React from 'react';
import { MeetingForm } from 'components';

const MeetingContainer = () => {
    return (
        <div>
            <h5 className="p-3 text-center">Dodaj spotkanie:</h5>
            <MeetingForm/>
        </div>    
    )
}

export {MeetingContainer}; 