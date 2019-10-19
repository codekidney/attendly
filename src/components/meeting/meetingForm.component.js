import React, {useState} from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

const uniqId = () => {
    return Math.round(new Date().getTime() + (Math.random() * 100));
}

const MeetingForm = () => {
    const [valid, setValid] = useState(false);

    const handleSubmit = event => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        // format data
        let meeting = {
            id:          uniqId(),
            title:       form.elements.title.value,
            description: form.elements.description.value,
            startDate:   {
                date: form.elements['startDate.date'].value,
                time: form.elements['startDate.time'].value,
            },
            endDate:   {
                date: form.elements['endDate.date'].value,
                time: form.elements['endDate.time'].value,
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
        setValid(true);
    };

    return valid ? (
        <Redirect to='/' />
    ) : (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
                <Form.Label>Tytuł</Form.Label>
                <Form.Control type="text" placeholder="Tytuł" />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Opis</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="Opis" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Data i godzina od</Form.Label>
                <InputGroup>
                    <FormControl id="startDate.date" type="date" />
                    <FormControl id="startDate.time" type="time" />
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>Data i godzina do</Form.Label>
                <InputGroup>
                    <FormControl id="endDate.date" type="date" />
                    <FormControl id="endDate.time" type="time" />
                </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit">Dodaj</Button>
        </Form>
    )
}

export {MeetingForm};