import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';


const MeetingFilter = (props) => {
    return (
        <div className="d-inline-block ml-2">
            <span>Filtruj po dacie:</span>
            <Form onChange={props.handleFilterDates} onSubmit={props.handleFilterDates} className="d-inline-block ml-2">
                <Form.Group className="d-inline-block ml-2 mb-0 align-bottom">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">Od</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="date" name="startDate.date" defaultValue="2019-11-25"/>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="d-inline-block ml-2 mb-0 align-bottom">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">Do</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="date" name="endDate.date"/>
                    </InputGroup>
                </Form.Group>
                <Button variant="primary" className="ml-2" onClick={props.handleDisableFilter}>Wyłącz</Button>
            </Form>
        </div>
    )
}

export {MeetingFilter};