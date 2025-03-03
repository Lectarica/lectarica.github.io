document.addEventListener('DOMContentLoaded', function() {
    const diaryContent = document.getElementById('diary-content');
    const dateInput = document.getElementById('date-input');

    dateInput.addEventListener('change', function() {
        const selectedDate = dateInput.value;
        const fileName = `${selectedDate}-diary.txt`;

        fetch(fileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Diary entry not found for this date.');
                }
                return response.text();
            })
            .then(text => {
                diaryContent.textContent = text;
            })
            .catch(error => {
                diaryContent.textContent = error.message;
            });
    });
});
