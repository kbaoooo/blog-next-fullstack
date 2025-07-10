const formatDate = (dateString: string, locale: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale , {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

export default formatDate;