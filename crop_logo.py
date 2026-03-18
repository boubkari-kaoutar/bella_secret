import sys
from PIL import Image

def crop_image(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        
        datas = img.getdata()
        
        min_x, min_y = img.width, img.height
        max_x, max_y = 0, 0
        
        for y in range(img.height):
            for x in range(img.width):
                r, g, b, a = datas[y * img.width + x]
                # Consider non-white and non-transparent
                if a > 10 and not (r > 248 and g > 248 and b > 248):
                    if x < min_x: min_x = x
                    if x > max_x: max_x = x
                    if y < min_y: min_y = y
                    if y > max_y: max_y = y
                    
        if min_x < max_x and min_y < max_y:
            pad_x = int((max_x - min_x) * 0.02)
            pad_y = int((max_y - min_y) * 0.02)
            
            crop_box = (
                max(0, min_x - pad_x),
                max(0, min_y - pad_y),
                min(img.width, max_x + pad_x),
                min(img.height, max_y + pad_y)
            )
            cropped_img = img.crop(crop_box)
            cropped_img.save(output_path)
            print("Successfully cropped image to: ", crop_box)
        else:
            print("Could not find boundaries to crop.")
    except Exception as e:
        print(f"Error: {e}")

crop_image("public/images/LOGO-1.png", "public/images/LOGO-1-cropped.png")
