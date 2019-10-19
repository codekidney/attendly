import React from 'react';
import { Button, Form, Col, InputGroup } from 'react-bootstrap';


const MeetingFilter = (props) => {
    return (
        <Form onChange={props.handleFilterDates} onSubmit={props.handleFilterDates}>
            <Form.Row>
                <Form.Group as={Col} sm="6">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">Od</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="date" name="startDate.date" defaultValue="2019-11-25"/>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} sm="6">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">Do</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="date" name="endDate.date"/>
                    </InputGroup>
                </Form.Group>
                <Col sm={3}>
                    <Button variant="primary" type="submit" >Zastosuj</Button>
                </Col>
                <Col sm={3}>
                    <Button variant="primary" onClick={props.handleDisableFilter}>Wyłącz</Button>
                </Col>
            </Form.Row>
        </Form>
    )
}

export {MeetingFilter};