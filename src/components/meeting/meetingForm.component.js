import React, {useState} from 'react';
import { Form, InputGroup, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';

import 'moment/locale/pl';
import dateFnsParse from 'date-fns/parse';
import dateFnsFormat from 'date-fns/format';

const uniqId = () => {
    return Math.round(new Date().getTime() + (Math.random() * 100));
}

const MeetingForm = () => {
    const [validated, setValidated] = useState(false);
    const [startDate, setStartDate] = useState(false);
    const [endDate,   setEndDate]   = useState(false);
    const [startTime, setStartTime] = useState(false);
    const [endTime,   setEndTime]   = useState(false);
    const DATE_FORMAT = 'yyyy-MM-dd';
    const TIME_FORMAT = 'HH:mm';
    const LOCALE = 'pl';

    const handleSubmit = event => {
        const form = event.currentTarget;

        // Add time to date
        if(startDate && startTime) {
            const newStartDateTime = startDate.setHours( 
                startTime.getHours(),
                startTime.getMinutes(),
                startTime.getMilliseconds()
                );
            setStartDate( newStartDateTime );
        }
        if(endDate && endTime) {
            setEndDate( endDate.setHours( 
                endTime.getHours(),
                endTime.getMinutes(),
                endTime.getMilliseconds()
                ));
        }

        
        if (form.checkValidity() === false
            || startDate
            || endDate
            || ( startDate < endDate ) ) {
            
            event.preventDefault();
            event.stopPropagation();
        }

        // Create Obj Meetng

        let meeting = {
            id:          uniqId(),
            title:       form.elements.title.value,
            description: form.elements.description.value,
            startDate:   {
                date: dateFnsFormat(startDate, DATE_FORMAT, LOCALE),
                time: dateFnsFormat(startDate, TIME_FORMAT, LOCALE),
            },
            endDate:   {
                date: dateFnsFormat(endDate, DATE_FORMAT, LOCALE),
                time: dateFnsFormat(startDate, TIME_FORMAT, LOCALE),
            }
        }
        
        // Check if localstorage empty
        if (localStorage.getItem("meetings") === null) {
            const meetings = [];
            localStorage.setItem("meetings", JSON.stringify(meetings));
        }
        
        // Save data do localstorage
        const meetings_LS = localStorage.getItem("meetings");
        let meetings = JSON.parse( meetings_LS );
        meetings.push( meeting );
        localStorage.setItem("meetings", JSON.stringify(meetings));

        // redirect
        setValidated(true);
    };

    const parseDate = (str, format, locale) => {
        const parsed = dateFnsParse(str, format, new Date(), { locale });
        if (DateUtils.isDate(parsed)) {
            return parsed;
        }
        return undefined;
    }

    const formatDate = (date, format, locale) => {
        return dateFnsFormat(date, format, locale );
    }

    const handleStartDateClick = (day, { selected, disabled }) => {
        if (disabled) {
            return;
        }
        if (selected) {
            setStartDate( false );
            return;
        }
        setStartDate( day );
    };

    const handleEndDateClick = (day, { selected, disabled }, dayPickerInput) => {
        if (disabled) {
            return;
        }
        if (selected) {
            setEndDate( false );
            return;
        }
        setEndDate( day );
    };

    return validated ? (
        <Redirect to='/' />
    ) : (
        <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    required
                    minLength="5"
                    maxLength="120"
                    type="text" 
                    placeholder="Title" 
                />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    required
                    minLength="10"
                    as="textarea"
                    rows="3" 
                    placeholder="Description" 
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Data rozpoczęcia</Form.Label>
                <InputGroup>
                    <DayPickerInput
                        formatDate={formatDate}
                        format={DATE_FORMAT}
                        placeholder='Wybierz datę'
                        onDayChange={handleStartDateClick}
                        parseDate={parseDate}
                        dayPickerProps={{
                            locale: LOCALE,
                            localeUtils: MomentLocaleUtils,
                        }}
                    />
                    <TimePicker 
                        allowEmpty={false} 
                        showSecond={false} 
                        onChange={(value) => setStartTime(new Date(value))}
                        className="ml-sm-2 mt-2 mt-sm-0"
                        placeholder='Wybierz godzinę'
                        />
                    {!startDate || !startTime ? <Alert variant="warning" className="ml-md-2 mt-2 mt-md-0 p-2">Proszę podać datę i godzinę</Alert> : null }
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>Data zakończenia</Form.Label>
                <InputGroup>
                    <DayPickerInput
                        formatDate={formatDate}
                        format={DATE_FORMAT}
                        placeholder='Wybierz datę'
                        onDayChange={handleEndDateClick}
                        parseDate={parseDate}
                        dayPickerProps={{
                            locale: LOCALE,
                            localeUtils: MomentLocaleUtils,
                        }}
                    />
                    <TimePicker 
                        allowEmpty={false} 
                        showSecond={false} 
                        onChange={(value) => setEndTime(new Date(value))}
                        className="ml-sm-2 mt-2 mt-sm-0"
                        placeholder='Wybierz godzinę'
                        />
                    {!endDate || !endTime ? <Alert variant="warning" className="ml-md-2 mt-2 mt-md-0 p-2">Proszę podać datę i godzinę</Alert> : null }
                </InputGroup>
            </Form.Group>
            {startDate >= endDate ? <Alert variant="warning" className="p-2">Data zakończenia jest przed datą rozpoczęcia</Alert> : null}
            <Button variant="primary" type="submit">Dodaj</Button>
        </Form>
    )
}

export {MeetingForm};