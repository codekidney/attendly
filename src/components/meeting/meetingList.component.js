import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card, Button } from 'react-bootstrap';


const MeetingList = (props) => {
    
    return (
        <Accordion className="MeetingList">
            {props.items.map( (item, index) => {
            return (
                <Card className="Meeting" key={item.id}>
                    <Accordion.Toggle as={Card.Header} eventKey={index}>{item.startDate.date} | {item.title}</Accordion.Toggle>
                    <Accordion.Collapse eventKey={index}>
                        <Card.Body>
                            <div className="Meeting__Description pb-3">Opis: {item.description}</div>
                            <div className="Meeting__StartDate">Rozpocznie się: {item.startDate.date} o godz.: {item.startDate.time}</div>
                            <div className="Meeting__EndDate pb-3">Zakończy się: {item.endDate.date} o godz.: {item.endDate.time}</div>
                            <Button variant="primary" size="sm" value={item.id} onClick={props.handleDeleteMeeting}>Usuń wydarzenie</Button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
            })}
        </Accordion>
    )
}

MeetingList.propTypes = {
    items: PropTypes.array.isRequired,
};

MeetingList.defaultProps = {
    items: [],
};

export {MeetingList};