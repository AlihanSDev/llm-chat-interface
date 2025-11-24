# debug_server.py
import os
import sys

print("🔍 ДИАГНОСТИКА ПУТИ К МОДЕЛИ...")

# Путь к модели
model_path = r"C:\Users\пользователь\Downloads\PromptCraft-Judge-T5-Base-V1-20251116T171005Z-1-001\PromptCraft-Judge-T5-Base-V1\checkpoint-1000"

print(f"📁 Проверяем путь: {model_path}")

# Проверяем существование пути
if not os.path.exists(model_path):
    print("❌ Путь не существует!")
    # Покажем что есть в папке Downloads
    downloads_path = r"C:\Users\пользователь\Downloads"
    if os.path.exists(downloads_path):
        print("📂 Содержимое папки Downloads:")
        for item in os.listdir(downloads_path):
            if "PromptCraft" in item:
                print(f"  - {item}")
else:
    print("✅ Путь существует!")
    
    # Проверяем содержимое папки модели
    print("📋 Содержимое папки модели:")
    for item in os.listdir(model_path):
        full_path = os.path.join(model_path, item)
        size = os.path.getsize(full_path) if os.path.isfile(full_path) else "DIR"
        print(f"  - {item} ({size})")

# Проверяем необходимые файлы
required_files = ['config.json', 'pytorch_model.bin', 'model.safetensors']
print("\n🔎 Проверяем необходимые файлы:")
for file in required_files:
    file_path = os.path.join(model_path, file)
    if os.path.exists(file_path):
        print(f"  ✅ {file} - найден")
    else:
        print(f"  ❌ {file} - отсутствует")

print("\n💡 РЕКОМЕНДАЦИИ:")
if not os.path.exists(model_path):
    print("1. Проверьте правильность пути")
    print("2. Убедитесь, что архив распакован")
    print("3. Скопируйте модель в более простой путь (например: C:/models/promptcraft)")