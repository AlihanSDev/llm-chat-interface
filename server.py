# ultra_simple_server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

app = Flask(__name__)
CORS(app)

print("🔧 УЛЬТРА-ПРОСТОЙ СЕРВЕР ДЛЯ T5")

# Сначала проверим базовые импорты
try:
    from transformers import T5Tokenizer, T5ForConditionalGeneration
    import torch
    print("✅ Базовые импорты успешны")
except ImportError as e:
    print(f"❌ Ошибка импорта: {e}")
    sys.exit(1)

# Путь к модели
model_path = r"C:\Users\пользователь\Downloads\PromptCraft-Judge-T5-Base-V1-20251116T171005Z-1-001\PromptCraft-Judge-T5-Base-V1\checkpoint-1000"

print(f"📁 Путь к модели: {model_path}")

# Проверим существование ключевых файлов
required_files = ['config.json', 'model.safetensors', 'tokenizer_config.json']
for file in required_files:
    file_path = os.path.join(model_path, file)
    if os.path.exists(file_path):
        print(f"✅ {file} - найден")
    else:
        print(f"❌ {file} - отсутствует")

print("\n🔄 Пробуем загрузить токенизатор...")

try:
    # Пробуем загрузить токенизатор разными способами
    print("Способ 1: Прямая загрузка...")
    tokenizer = T5Tokenizer.from_pretrained(model_path)
    print("✅ Токенизатор загружен!")
    
except Exception as e:
    print(f"❌ Ошибка: {e}")
    print("Пробуем альтернативный способ...")
    
    try:
        # Альтернативный способ
        from transformers import AutoTokenizer
        tokenizer = AutoTokenizer.from_pretrained(model_path)
        print("✅ Токенизатор загружен через AutoTokenizer!")
    except Exception as e2:
        print(f"❌ И этот способ не сработал: {e2}")
        print("Используем базовый токенизатор T5...")
        tokenizer = T5Tokenizer.from_pretrained("t5-base")
        print("✅ Используем базовый токенизатор T5")

print("\n🔄 Загружаем модель...")

try:
    model = T5ForConditionalGeneration.from_pretrained(model_path)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    model.eval()
    print(f"✅ Модель загружена на {device}!")
except Exception as e:
    print(f"❌ Ошибка загрузки модели: {e}")
    sys.exit(1)

@app.route('/api/improve-prompt', methods=['POST'])
def improve_prompt():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '').strip()
        
        if not prompt:
            return jsonify({"error": "Prompt is empty"}), 400
        
        print(f"📨 Получен промпт: {prompt}")
        
        # Простая генерация
        input_text = f"improve_prompt: {prompt}"
        input_ids = tokenizer.encode(input_text, return_tensors="pt")
        input_ids = input_ids.to(device)
        
        with torch.no_grad():
            output_ids = model.generate(
                input_ids,
                max_length=128,
                num_beams=3,
                early_stopping=True
            )
        
        advice = tokenizer.decode(output_ids[0], skip_special_tokens=True)
        
        return jsonify({
            "original": prompt,
            "improved": advice,
            "status": "success"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "model": "loaded"})

@app.route('/')
def home():
    return "🤖 PromptCraft API - Работает!"

if __name__ == '__main__':
    print("\n🎉 СЕРВЕР ЗАПУЩЕН: http://localhost:5000")
    app.run(port=5000, host='0.0.0.0')