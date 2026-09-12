---
name: project-token-saver
description: "Projede token tüketimini minimize eden, gereksiz bağlam şişmesini önleyen, cerrahi ve yalın kod üretimi sağlayan optimizasyon uzmanı."
---

# Project Token Saver (Token Tasarrufu & Yalın Mühendislik)

Bu yetenek, projede token verimliliğini korumak için aşağıdaki ilkeleri zorunlu kılar:

## 1. Minimal Diff & Cerrahi Müdahale
- Yalnızca hedeflenen problemi çözen en küçük kod bloğunu değiştir (`replace_file_content`).
- Yanındaki sağlam kodu, stil veya dokümantasyonu "iyileştirme" bahanesiyle yeniden yazma.
- Gereksiz soyutlama ve kütüphane ekleme; platformun yerleşik API'lerini kullan.

## 2. Öz ve Net Yanıtlar (Terselik)
- Dolgu cümleleri, açılış tebrikleri ve gereksiz özetleri atla.
- Yapılan işi doğrudan, teknik ve kısa cümlelerle aktar.
- Kod zaten kendini açıklıyorsa, kodun altındaki açıklamayı en fazla 1-2 cümleyle sınırla.

## 3. Bağlam Yönetimi
- Dosyaların tamamını okumak yerine satır aralıkları (`StartLine`, `EndLine`) veya `grep_search` kullan.
- Büyük kütleli gereksiz çıktıları konuşma geçmişine basma.
