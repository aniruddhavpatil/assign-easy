import React from 'react';
import { Text } from '@airtable/blocks/ui';
const Course = () => {
    const course = {
        name: "The course that Jeff takes",
        dateTime: new Date(),
        instructor: "Jeff",
        room: {
            selectedRoom: "101",
            capacity: 40,
        }
    }
    return <div>
        <Text>Course Name: {course.name}</Text>
        <Text>Date and Time: {course.dateTime.toDateString()}</Text>
        <Text>Instructor Name: {course.instructor}</Text>
        <div>
            <Text>Room Details</Text>
            <Text>Selected Room: {course.selectedRoom}</Text>
            <Text>No. of seats: {toString(course.capacity)}</Text>
        </div>
    </div>;
}
export default Course;