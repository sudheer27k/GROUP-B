// Function to check if an event with the same name exists on the same day while excluding the current event
export const isEventNameUniqueOnDate = (events, eventName, date, currentEvent) => {
    return events.some((event) => {
        // Check if currentEvent is defined
        if (currentEvent) {
            // Exclude the current event based on ID
            return event.id !== currentEvent.id && event.name === eventName && event.date === date;
        } else {
            // If currentEvent is not defined (e.g., when creating a new event), perform the check without excluding any events
            return event.name === eventName && event.date === date;
        }
    });
};

// Function to check if two events have overlapping start and end times on the same day while excluding the current event
export const doEventsOverlap = (events, startTime, endTime, date, currentEvent) => {
    return events.some((event) => {
        // Check if currentEvent is defined
        if (currentEvent) {
            // Exclude the current event based on ID
            return (
                event.id !== currentEvent.id &&
                event.date === date &&
                ((startTime >= event.start_time && startTime < event.end_time) ||
                    (endTime > event.start_time && endTime <= event.end_time))
            );
        } else {
            // If currentEvent is not defined (e.g., when creating a new event), perform the check without excluding any events
            return (
                event.date === date &&
                ((startTime >= event.start_time && startTime < event.end_time) ||
                    (endTime > event.start_time && endTime <= event.end_time))
            );
        }
    });
};

