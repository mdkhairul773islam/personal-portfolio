from PIL import Image
from collections import Counter

def get_dominant_colors(image_path, num_colors=5):
    img = Image.open(image_path)
    img = img.convert('RGB')
    pixels = list(img.getdata())
    counter = Counter(pixels)
    dominant_colors = counter.most_common(num_colors)
    return dominant_colors

if __name__ == "__main__":
    colors = get_dominant_colors('/home/khairul/Desktop/tailwind-playlist/images/profile.jpg')
    for color, count in colors:
        print(f"RGB{color} - Count: {count}")