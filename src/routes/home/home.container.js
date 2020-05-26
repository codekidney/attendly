import React, {useState, useEffect} from 'react';
import { MeetingList, MeetingFilter, MeetingSortBy, Loading } from 'components';

const HomeContainer = () => {
    const [ready, setReady] = useState(false);
    const [meetings, setMeetings] = useState([]);

    const getInitialData = () => {
        if (localStorage.getItem("meetings") === null) {
            let meetingArr = []; 
            fetch(`https://kamilnowak.com/github/attendly/get/`)
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
                    setMeetings(meetingArr);
                    setReady(true);
                    return meetingArr;
                }); 
                
            } else {
                const meetings_LS = localStorage.getItem("meetings");
                setMeetings(JSON.parse( meetings_LS ));
                setReady(true);
        }
    }

    const deleteMeeting = (e) => {
        const id = e.target.value;
        const filtered = meetings.filter(item => item.id !== id);
        setMeetings(filtered);
        localStorage.setItem("meetings", JSON.stringify(filtered));
    }

    
    const disableFilter = () => {
        setMeetings( getInitialData() );
    }

    const onFilterDates = event => {
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

    const __getPropByString = (obj, propString) => {
        if (!propString)
            return obj;
    
        var prop, props = propString.split('.');
    
        for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
            prop = props[i];
    
            var candidate = obj[prop];
            if (candidate !== undefined) {
                obj = candidate;
            } else {
                break;
            }
        }
        return obj[props[i]];
    }

    const __sort = (arr, propStr) => {
        const sorted = [...arr].sort((i1, i2) => {
            const a = __getPropByString(i1, propStr);
            const b = __getPropByString(i2, propStr);
            return a > b ? 1 : a < b ? -1 : 0;
        });
        return sorted;
    }
    
    const onSortBy = (type) => {
        let sorted = [];
        switch (type) {
            case 'title-asc':
                sorted = __sort(meetings, 'title');
                break;
            case 'title-desc':
                sorted = __sort(meetings, 'title').reverse();
                break;
            case 'startDate-asc':
                sorted = __sort(meetings, 'startDate.date');
                break;
            case 'startDate-desc':
                sorted = __sort(meetings, 'startDate.date').reverse();
                break;
            case 'endDate-asc':
                sorted = __sort(meetings, 'endDate.date');
                break;
            case 'endDate-desc':
                sorted = __sort(meetings, 'endDate.date').reverse();
                break;
            default:
                console.log('Type error: ' + type + '.');  
        }
        setMeetings(sorted);
    }

    useEffect(() => {
        const data = getInitialData();
    }, []);

    return ready ? (
        <div className="Home">
            <h5 className="p-3 text-center">Lista spotkań:</h5>
            <MeetingSortBy handleSortBy={onSortBy}/>
            <MeetingFilter handleFilterDates={onFilterDates} handleDisableFilter={disableFilter} />
            <div className="pb-2">
                <h5>Lista:</h5>
                <MeetingList items={meetings} handleDeleteMeeting={deleteMeeting} handleSortBy={onSortBy}/>
            </div>
        </div>
    )
    : (
        <Loading />
    )
}

export {HomeContainer};