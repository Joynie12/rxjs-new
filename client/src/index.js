import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError, switchMap } from 'rxjs/operators';

const fetchMessages = () => {
    return ajax.getJSON('http://localhost:3000/messages/unread').pipe(
        map(response => response.messages),
        catchError(() => [])
    );
};

const updateTable = (messages) => {
    const tbody = document.querySelector('#messages tbody');
    messages.forEach(message => {
        const row = document.createElement('tr');
        const date = new Date(message.received * 1000);
        const formattedDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

        row.innerHTML = `
            <td>${message.from}</td>
            <td>${message.subject.length > 15 ? message.subject.slice(0, 15) + '...' : message.subject}</td>
            <td>${formattedDate}</td>
        `;
        tbody.prepend(row);
    });
};

interval(5000).pipe(
    switchMap(fetchMessages)
).subscribe(updateTable);
