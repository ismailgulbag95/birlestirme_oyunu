from PIL import Image
import os

img_path = r"C:\Users\ismai\.gemini\antigravity-ide\brain\e1bfc41a-1db5-4e56-8343-c3a13f597cbc\ash_item_icon_1789251514920.jpg"
img = Image.open(img_path).convert("RGBA")

# Fast transparency: convert white to transparent
datas = list(img.getdata())
newData = []
for r, g, b, a in datas:
    if r > 240 and g > 240 and b > 240:
        newData.append((255, 255, 255, 0))
    else:
        newData.append((r, g, b, a))

img.putdata(newData)
bbox = img.getbbox()
if bbox:
    cropped = img.crop(bbox)
    w, h = cropped.size
    s = max(w, h)
    square = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    square.paste(cropped, ((s - w) // 2, (s - h) // 2))
    final = square.resize((256, 256), Image.Resampling.LANCZOS)
    final.save("public/textures/items/ash.png", "PNG")
    final.save("public/textures/items/kul.png", "PNG")
    final.save("dist/textures/items/ash.png", "PNG")
    final.save("dist/textures/items/kul.png", "PNG")
    print("DONE_SAVED_ASH")
