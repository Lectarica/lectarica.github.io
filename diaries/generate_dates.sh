#!/bin/bash

# 2025年の1月1日から12月31日までの日付をループで処理
for month in {01..12}; do
    for day in {01..31}; do
        # 日付の妥当性をチェック
        if date -d "2025-${month}-${day}" >/dev/null 2>&1; then
            filename="2025-${month}-${day}-dialy.txt"
            touch "$filename"
        fi
    done
done

echo "2025年の全日付のファイルを作成しました。"
