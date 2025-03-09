document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date-input');
    const diaryContent = document.getElementById('diary-content');
    // Calculate yesterday's date
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate()-1);
    const yyyy = yesterday.getFullYear();
    const mm = String(yesterday.getMonth()+1).padStart(2, '0');
    const dd = String(yesterday.getDate()).padStart(2, '0');
    const yesterdayStr = `${yyyy}-${mm}-${dd}`;

    // Set the date input to yesterday's date
    dateInput.value = yesterdayStr;

    // Trigger the loading of yesterday's diary entry
    const fileName = `diaries/${yesterdayStr}-diary.txt`;
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('Diary entry not found for this date.');
            }
            return response.text();
        })
        .then(text => {
            diaryContent.textContent = text;
            diaryContent.innerHTML = text.replace(/\n/g, '<br>');
        })
        .catch(error => {
            diaryContent.textContent = error.message;
        });

    dateInput.addEventListener('change', function() {
        const selectedDate = dateInput.value;
        const fileName = `diaries/${selectedDate}-diary.txt`;

        fetch(fileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Diary entry not found for this date.');
                }
                return response.text();
            })
            .then(text => {
                if (text.trim() === ""){
                    diaryContent.innnerHTML = "まだ見ぬ未来の話"
                }
                diaryContent.textContent = text;
                diaryContent.innerHTML = text.replace(/\n/g, '<br>');
            })
            .catch(error => {
                diaryContent.textContent = error.message;
            });
    });
});
