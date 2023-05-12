export const formatDateTime = (date) => {
    date = new Date(date)
    date.setHours(date.getHours() - 3)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

export const formatDate = (date) => {
    date = new Date(date)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString('ru-RU', options)
}

export const formatDateWithTime = (date) => {
    date = new Date(date)
    date.setHours(date.getHours() - 3)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    return date.toLocaleDateString('ru-RU', options)
}

