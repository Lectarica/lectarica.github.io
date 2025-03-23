document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date-input');
    const diaryContent = document.getElementById('diary-content');

    // 指定した日付（YYYY-MM-DD）の日記を読み込む関数
    function loadDiaryEntry(date) {
        const year = date.split('-')[0];
        const month = date.split('-')[1];
        const day = date.split('-')[2];
        const fileName = `diaries/${year}/${year}-${month}-${day}-diary.txt`;
        fetch(fileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error('記事がありません');
                }
                return response.text();
            })
            .then(text => {
                if (text.trim() === ""){
                    throw new Error('まだ見ぬ世界の話');
                }
                // 改行コードを<br>に置き換えて表示
                diaryContent.innerHTML = text.replace(/\n/g, '<br>');
            })
            .catch(error => {
                diaryContent.textContent = error.message;
            });
    }

    // 初期表示：昨日の日付を設定
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yyyy = yesterday.getFullYear();
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
    const dd = String(yesterday.getDate()).padStart(2, '0');
    const yesterdayStr = `${yyyy}-${mm}-${dd}`;
    dateInput.value = yesterdayStr;
    loadDiaryEntry(yesterdayStr);

    // 前日のボタン
    document.getElementById('prev-day').addEventListener('click', function() {
        const currentDate = new Date(dateInput.value);
        currentDate.setDate(currentDate.getDate() - 1);
        const yyyy = currentDate.getFullYear();
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const prevDateStr = `${yyyy}-${mm}-${dd}`;
        dateInput.value = prevDateStr;
        loadDiaryEntry(prevDateStr);
    });

    // 翌日のボタン
    document.getElementById('next-day').addEventListener('click', function() {
        const currentDate = new Date(dateInput.value);
        currentDate.setDate(currentDate.getDate() + 1);
        const yyyy = currentDate.getFullYear();
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const nextDateStr = `${yyyy}-${mm}-${dd}`;
        dateInput.value = nextDateStr;
        loadDiaryEntry(nextDateStr);
    });

    // 日付入力が変更された場合の処理
    dateInput.addEventListener('change', function() {
        loadDiaryEntry(dateInput.value);
    });
});
