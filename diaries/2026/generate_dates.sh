#!/bin/bash
# 開始日と終了日を設定
start_date="2026-01-01"
end_date="2026-12-31"

# 現在の日付を開始日に設定
current_date="$start_date"

# 2023年の全日付でループ
while [ $(date -d "$current_date" +%s) -le $(date -d "$end_date" +%s) ]; do
    file_name="$(date -d "$current_date" +%Y-%m-%d)-diary.txt"
    touch "$file_name"
    echo "Created: $file_name"
    # 1日進める
    current_date=$(date -I -d "$current_date + 1 day")
done
