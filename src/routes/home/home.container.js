import React, {useState, useEffect} from 'react';
import { MeetingList, MeetingFilter, Loading } from 'components';
import { Button } from 'react-bootstrap';

const HomeContainer = () => {
    const [ready, setReady] = useState(false);
    const [meetings, setMeetings] = useState([]);

    const getInitialData = () => {
        if (localStorage.getItem("meetings") === null) {
            let meetingArr = []; 
            fetch(`https://rkserv.hekko.pl/attendly/get/`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(function(item){
                        const newMeeting = {
                            id:       item.id,
                            title:    item.title,
                            description: item.description,
                            startDate : {
                                date: item.startDate.date,
                                time: item.startDate.time,
                            },
                            endDate : {
                                date: item.endDate.date,
                                time: item.endDate.time,
                            },
                        }
                        meetingArr.push(newMeeting);
                    });
                    localStorage.setItem("meetings", JSON.stringify(meetingArr));
                }); 
                
        }
        const meetings_LS = localStorage.getItem("meetings");
        return JSON.parse( meetings_LS )
    }

    const deleteMeeting = (e) => {
        const id = parseInt(e.target.value);
        console.log(`Delete item with id: ${id}`);
        const filtered = meetings.filter(item => item.id !== id);
        setMeetings(filtered);
        localStorage.setItem("meetings", JSON.stringify(filtered));
    }

    const sortByStartDate = () => {
        const sorted = [...meetings].sort((i1, i2) => {
            const a = i1.startDate.date;
            const b = i2.startDate.date;
            return a > b ? 1 : a < b ? -1 : 0;
        });
        setMeetings(sorted);
    }

    const disableFilter = () => {
        setMeetings( getInitialData() );
    }

    const filterDates = event => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        const startDate   = form.elements['startDate.date'].value;
        const endDate     = form.elements['endDate.date'].value;
        const initialData = getInitialData();
        
        if(startDate){
            setMeetings(initialData.filter(item => item.startDate.date >= startDate));
        }
        if(endDate){
            setMeetings(initialData.filter(item => item.endDate.date <= endDate));
        }
    }

    useEffect(() => {
        setMeetings( getInitialData() );
        setReady(true);
    }, []);

    return ready ? (
        <div className="Home">
            <h5 className="p-3 text-center">Lista spotkań:</h5>
            <div className="pb-2">
                <h5>Sortuj po:</h5>
                <Button variant="primary" size="sm" onClick={sortByStartDate}>Sortowanie po dacie</Button>
            </div>
            <div className="pb-2">
                <h5>Filtruj po dacie:</h5>
                <MeetingFilter handleFilterDates={filterDates} handleDisableFilter={disableFilter} />
            </div>
            <div className="pb-2">
                <h5>Lista:</h5>
                <MeetingList items={meetings} handleDeleteMeeting={deleteMeeting}/>
            </div>
            <div className="pb-2">
                <h5>Akcje:</h5>
                <Button variant="primary" href="/meeting/add">Dodaj wydarzenie</Button>
            </div>
        </div>
    )
    : (
        <Loading />
    )
}

export {HomeContainer};